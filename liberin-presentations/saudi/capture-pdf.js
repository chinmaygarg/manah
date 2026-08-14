#!/usr/bin/env node
/**
 * Liberin Saudi Deck — PDF exporter.
 *
 * Starts a local static server for this directory, drives the deck with
 * Puppeteer (one full-screen 1920x1080 screenshot per slide, chrome hidden),
 * then stitches the screenshots into a single PDF.
 *
 * Reusable: works for any reveal.js deck built on this same file layout —
 * no slide count/ids are hardcoded, they're read live from the DOM.
 *
 * Usage:
 *   node capture-pdf.js                  # screenshots/ + Liberin_Saudi_Deck.pdf
 *   node capture-pdf.js --out my.pdf     # custom PDF filename
 *   node capture-pdf.js --port 8892      # custom local server port
 *   node capture-pdf.js --keep-shots     # don't delete the intermediate PNGs
 */

const fs = require('fs')
const path = require('path')
const http = require('http')
const puppeteer = require('puppeteer')

const HERE = __dirname
const args = process.argv.slice(2)
const getArg = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback
}

const PORT = parseInt(getArg('port', '8892'), 10)
const OUT_PDF = path.resolve(HERE, getArg('out', 'Liberin_Saudi_Deck.pdf'))
const SHOTS_DIR = path.join(HERE, 'screenshots')
const KEEP_SHOTS = args.includes('--keep-shots')
const CANVAS_WIDTH = 1920
const CANVAS_HEIGHT = 1080

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.json': 'application/json',
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(HERE, decodeURIComponent(req.url.split('?')[0]))
      if (filePath.endsWith('/')) filePath = path.join(filePath, 'index.html')
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end('Not found')
          return
        }
        const ext = path.extname(filePath)
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
        res.end(data)
      })
    })
    server.listen(PORT, () => resolve(server))
  })
}

async function capture() {
  if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true })

  console.log('Starting local server...')
  const server = await startServer()
  const url = `http://localhost:${PORT}/index.html`

  console.log('Launching browser...')
  const systemChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: fs.existsSync(systemChrome) ? systemChrome : undefined,
  })
  const page = await browser.newPage()
  await page.setViewport({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, deviceScaleFactor: 2 })

  console.log('Loading deck...')
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('.reveal .slides > section', { timeout: 15000 })

  // Hide the access-code gate directly rather than going through
  // unlockPresentation() — that function also calls
  // window.__triggerCoverAnimation(), which fires the cover slide's GSAP
  // timeline a first time. Our own per-slide loop below fires it again for
  // slide 0, and the second gsap.fromTo() overwrites/resets the first
  // tween's targets back to their opacity:0 "from" state; if that reset
  // lands after this slide's force-complete sweep already ran, the cover
  // slide gets captured invisible. Hiding the gate directly avoids the
  // double-trigger so the cover animation only ever fires once, from the
  // loop, exactly like every other slide.
  await page.evaluate(() => {
    const gate = document.getElementById('access-gate')
    if (gate) gate.classList.add('hidden')
  })
  await new Promise((r) => setTimeout(r, 300))

  // Hide chrome that shouldn't appear in a still capture: fullscreen toggle,
  // reveal's built-in controls/progress bar/slide-number.
  await page.addStyleTag({
    content: `
      #fullscreen-btn, #theme-toggle-btn, .reveal .controls, .reveal .progress,
      .reveal .slide-number, #access-gate {
        display: none !important;
      }
    `,
  })

  // Kill reveal's slide transition entirely — per-section data-transition
  // attributes (e.g. "slide", "fade") override the global config, so a
  // fixed-length wait after Reveal.slide() can still land mid-animation
  // (previous slide sliding out, next one sliding in). Stripping the
  // attributes + forcing transition:'none' makes every jump instant.
  await page.evaluate(() => {
    document.querySelectorAll('.reveal .slides > section[data-transition]').forEach((s) => {
      s.removeAttribute('data-transition')
    })
    Reveal.configure({ transition: 'none', backgroundTransition: 'none' })
  })

  // Disable Apache ECharts' own animation system entirely. charts.js
  // (slide-market, slide-investor) animates lines/bars in over 1.2-1.4s via
  // ECharts' internal rAF loop, which is completely separate from GSAP — our
  // GSAP force-complete sweep below never touches it, and a fixed post-slide
  // wait can't outrun it reliably. Disabling animation makes setOption()
  // render the fully-drawn chart synchronously.
  await page.evaluate(() => {
    if (window.echarts && echarts.init) {
      const originalInit = echarts.init.bind(echarts)
      echarts.init = function (dom, theme, opts) {
        const chart = originalInit(dom, theme, opts)
        const originalSetOption = chart.setOption.bind(chart)
        chart.setOption = function (option, ...args) {
          return originalSetOption(Object.assign({}, option, { animation: false }), ...args)
        }
        return chart
      }
    }
  })

  const totalSlides = await page.evaluate(() => document.querySelectorAll('.reveal .slides > section').length)
  console.log(`Found ${totalSlides} slides`)

  const shotPaths = []

  for (let i = 0; i < totalSlides; i++) {
    // Jump to the slide, let its real entrance animation fire (main.js
    // triggers it on a delay off the 'slidechanged' event), then force
    // every GSAP tween to its completed end state instead of racing a
    // fixed wait. Some bespoke timelines (e.g. the cover slide) queue
    // follow-up work via tl.call() — which itself spawns brand-new
    // tweens (counters) as a *side effect* of fast-forwarding — so a
    // single sweep can finish iterating before those new tweens exist.
    // Sweeping a few times drains that cascade. As a final safety net,
    // directly set every counter/bar/ring from its own data attribute —
    // a static export should always match the source values exactly,
    // regardless of animation-engine timing quirks.
    const slideId = await page.evaluate((idx) => {
      Reveal.slide(idx)
      const section = Reveal.getSlides()[idx]
      if (window.runSlideAnimation && section.id) {
        window.runSlideAnimation(section.id)
      }
      if (window.initChartForSlide && section.id) {
        window.initChartForSlide(section.id)
      }
      if (window.gsap) {
        for (let pass = 0; pass < 4; pass++) {
          const tweens = gsap.globalTimeline.getChildren(true, true, true)
          if (tweens.length === 0) break
          tweens.forEach((tween) => {
            tween.progress(1)
            tween.kill()
          })
        }
      }
      section.querySelectorAll('.count[data-value]').forEach((el) => {
        const v = parseFloat(el.getAttribute('data-value'))
        const decimals = parseInt(el.getAttribute('data-decimals'), 10) || 0
        const prefix = el.getAttribute('data-prefix') || ''
        const suffix = el.getAttribute('data-suffix') || ''
        const out = decimals > 0 ? v.toFixed(decimals) : (v >= 1000 ? Math.round(v).toLocaleString('en-US') : String(Math.round(v)))
        el.textContent = prefix + out + suffix
      })
      section.querySelectorAll('.bar-fill[data-pct]').forEach((el) => {
        el.style.width = el.getAttribute('data-pct') + '%'
      })
      section.querySelectorAll('.ring-fill[data-pct]').forEach((el) => {
        const pct = parseFloat(el.getAttribute('data-pct')) || 0
        const r = parseFloat(el.getAttribute('r')) || 30
        const c = 2 * Math.PI * r
        el.style.strokeDasharray = String(c)
        el.style.strokeDashoffset = String(c * (1 - pct / 100))
      })
      return section.id
    }, i)

    await new Promise((r) => setTimeout(r, 150))

    const filename = `slide-${String(i + 1).padStart(2, '0')}${slideId ? '-' + slideId : ''}.png`
    const filepath = path.join(SHOTS_DIR, filename)
    await page.screenshot({ path: filepath, type: 'png' })
    shotPaths.push(filepath)
    console.log(`  Captured: ${filename}`)
  }

  console.log('Building PDF...')
  const pdfPage = await browser.newPage()
  await pdfPage.setViewport({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT })

  const wrapperPath = path.join(SHOTS_DIR, '_pdf.html')
  const wrapperHtml = `<!DOCTYPE html>
<html><head><style>
* { margin: 0; padding: 0; }
@page { size: ${CANVAS_WIDTH}px ${CANVAS_HEIGHT}px; margin: 0; }
body { margin: 0; }
.slide-page { width: ${CANVAS_WIDTH}px; height: ${CANVAS_HEIGHT}px; page-break-after: always; overflow: hidden; }
.slide-page:last-child { page-break-after: auto; }
.slide-page img { width: 100%; height: 100%; object-fit: contain; display: block; }
</style></head><body>
${shotPaths.map((fp) => `<div class="slide-page"><img src="file://${fp}"></div>`).join('\n')}
</body></html>`
  fs.writeFileSync(wrapperPath, wrapperHtml)
  await pdfPage.goto(`file://${wrapperPath}`, { waitUntil: 'load', timeout: 60000 })

  await pdfPage.pdf({
    path: OUT_PDF,
    width: `${CANVAS_WIDTH}px`,
    height: `${CANVAS_HEIGHT}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  fs.unlinkSync(wrapperPath)
  await browser.close()
  server.close()

  if (!KEEP_SHOTS) {
    shotPaths.forEach((p) => fs.unlinkSync(p))
    console.log('Removed intermediate screenshots (pass --keep-shots to retain them).')
  }

  console.log(`\nPDF saved: ${OUT_PDF}`)
}

capture().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
