const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const URL = 'https://manahcorporatepresentation.vercel.app/'
const OUTPUT_DIR = path.join(__dirname, 'screenshots')
const PDF_PATH = path.join(__dirname, 'Manah_Group_Presentation.pdf')

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

  // Wait for Reveal.js to initialize
  await page.waitForFunction('typeof Reveal !== "undefined" && Reveal.isReady()', { timeout: 30000 })

  // Unlock the access gate
  const gateVisible = await page.evaluate(() => {
    const gate = document.getElementById('access-gate')
    return gate && !gate.classList.contains('hidden')
  })

  if (gateVisible) {
    console.log('Unlocking access gate...')
    await page.type('#access-code-input', 'Manah505')
    await page.click('#access-code-submit')
    await page.waitForFunction(
      'document.getElementById("access-gate").classList.contains("hidden")',
      { timeout: 10000 }
    )
  }

  await new Promise(r => setTimeout(r, 3000))

  // Hide access gate, controls, and progress bar for clean captures
  await page.evaluate(() => {
    const gate = document.getElementById('access-gate')
    if (gate) gate.style.display = 'none'
    const controls = document.querySelector('.reveal .controls')
    if (controls) controls.style.display = 'none'
    const progress = document.querySelector('.reveal .progress')
    if (progress) progress.style.display = 'none'
    const slideNumber = document.querySelector('.reveal .slide-number')
    if (slideNumber) slideNumber.style.display = 'none'
  })

  // Get total slide count
  const totalSlides = await page.evaluate(() => {
    const slides = Reveal.getSlides()
    return slides.length
  })

  console.log(`Found ${totalSlides} slides`)

  // Navigate to first slide
  await page.evaluate(() => Reveal.slide(0))
  await new Promise(r => setTimeout(r, 1500))

  const screenshotPaths = []

  for (let i = 0; i < totalSlides; i++) {
    await page.evaluate((idx) => Reveal.slide(idx), i)
    await new Promise(r => setTimeout(r, 2000))

    const slideId = await page.evaluate(() => {
      const current = Reveal.getCurrentSlide()
      return current ? current.id : `slide-${Reveal.getIndices().h}`
    })

    const filename = `slide-${String(i + 1).padStart(2, '0')}-${slideId}.png`
    const filepath = path.join(OUTPUT_DIR, filename)

    await page.screenshot({ path: filepath, type: 'png' })
    screenshotPaths.push(filepath)
    console.log(`Captured: ${filename}`)
  }

  // Create PDF from screenshots using file:// URLs
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
