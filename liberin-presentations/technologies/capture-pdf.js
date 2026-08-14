const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const URL = 'https://chinmaygarg.github.io/Manah-presentation-liberin/'
const ACCESS_CODE = '505506'
const OUTPUT_DIR = path.join(__dirname, 'screenshots')
const PDF_PATH = path.join(__dirname, 'Liberin_Technologies_Presentation.pdf')

async function capture() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 })

  console.log('Loading presentation...')
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })

  // Unlock the access gate
  await page.waitForSelector('#pw-input', { timeout: 10000 })
  console.log('Unlocking access gate...')
  await page.type('#pw-input', ACCESS_CODE)
  await page.click('#pw-btn')
  await page.waitForFunction('!document.getElementById("pw-gate")', { timeout: 10000 })

  // Settle
  await new Promise(r => setTimeout(r, 1500))

  // Hide nav UI for clean captures
  await page.evaluate(() => {
    const sel = ['.nav', '#nav-dots', '#counter', '#prev-btn', '#next-btn', '.progress', '#progress', '.click-zone', '#cz-left', '#cz-right']
    sel.forEach(s => document.querySelectorAll(s).forEach(el => { el.style.display = 'none' }))
  })

  const totalSlides = await page.evaluate(() => document.querySelectorAll('.slide').length)
  console.log(`Found ${totalSlides} slides`)

  const screenshotPaths = []

  for (let i = 0; i < totalSlides; i++) {
    // Manually drive the deck: only slide[i] gets .active, replay reveal animations
    await page.evaluate((idx) => {
      const slides = document.querySelectorAll('.slide')
      slides.forEach((s, j) => {
        s.classList.toggle('active', j === idx)
        s.style.transform = ''
      })
      // Restart reveal animations on the active slide
      const active = slides[idx]
      active.querySelectorAll('.rv').forEach(el => {
        el.style.animation = 'none'
        // eslint-disable-next-line no-unused-expressions
        el.offsetHeight
        el.style.animation = ''
      })
    }, i)

    // Wait for slide transition + reveal animations + count-up to settle
    await new Promise(r => setTimeout(r, 2500))

    const filename = `slide-${String(i + 1).padStart(2, '0')}.png`
    const filepath = path.join(OUTPUT_DIR, filename)
    await page.screenshot({ path: filepath, type: 'png' })
    screenshotPaths.push(filepath)
    console.log(`Captured: ${filename}`)
  }

  console.log('\nGenerating PDF...')

  const pdfPage = await browser.newPage()
  await pdfPage.setViewport({ width: 1920, height: 1080 })

  const htmlPath = path.join(OUTPUT_DIR, '_pdf.html')
  const htmlContent = `<!DOCTYPE html>
<html><head><style>
* { margin: 0; padding: 0; }
@page { size: 1920px 1080px; margin: 0; }
body { margin: 0; }
.slide-page { width: 1920px; height: 1080px; page-break-after: always; overflow: hidden; }
.slide-page:last-child { page-break-after: auto; }
.slide-page img { width: 100%; height: 100%; object-fit: contain; display: block; }
</style></head><body>
${screenshotPaths.map((fp) => `<div class="slide-page"><img src="file://${fp}"></div>`).join('\n')}
</body></html>`

  fs.writeFileSync(htmlPath, htmlContent)
  await pdfPage.goto(`file://${htmlPath}`, { waitUntil: 'load', timeout: 60000 })

  await pdfPage.pdf({
    path: PDF_PATH,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  fs.unlinkSync(htmlPath)

  console.log(`\nPDF saved: ${PDF_PATH}`)
  console.log(`Screenshots saved: ${OUTPUT_DIR}/`)

  await browser.close()
}

capture().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
