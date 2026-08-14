const fs = require('fs')
const path = require('path')

const DIST = path.join(__dirname, 'dist')
const WEBSITE_PUBLIC = path.join(__dirname, '..', '..', 'website', 'public')

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Warning: ${src} does not exist, skipping`)
    return
  }

  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry))
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(src, dest)
  }
}

function processHtml(content) {
  // Rewrite ../website/public/ references to /assets/
  return content.replace(/\.\.\/website\/public\//g, '/assets/')
}

function processJs(content) {
  return content.replace(/\.\.\/website\/public\//g, '/assets/')
}

// Clean dist
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true })
}
fs.mkdirSync(DIST, { recursive: true })

// Copy and process index.html
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
fs.writeFileSync(path.join(DIST, 'index.html'), processHtml(html))

// Copy robots.txt
const robotsSrc = path.join(__dirname, 'robots.txt')
if (fs.existsSync(robotsSrc)) {
  fs.copyFileSync(robotsSrc, path.join(DIST, 'robots.txt'))
}

// Copy CSS
copyRecursive(path.join(__dirname, 'css'), path.join(DIST, 'css'))

// Copy and process JS
fs.mkdirSync(path.join(DIST, 'js'), { recursive: true })
for (const file of fs.readdirSync(path.join(__dirname, 'js'))) {
  const src = path.join(__dirname, 'js', file)
  const dest = path.join(DIST, 'js', file)
  if (file.endsWith('.js')) {
    const content = fs.readFileSync(src, 'utf8')
    fs.writeFileSync(dest, processJs(content))
  } else {
    fs.copyFileSync(src, dest)
  }
}

// Copy presentation-local images if any
if (fs.existsSync(path.join(__dirname, 'images'))) {
  copyRecursive(path.join(__dirname, 'images'), path.join(DIST, 'images'))
}

// Copy website public assets (images, favicon, etc.)
const assetDirs = ['images', 'favicon.ico']
for (const asset of assetDirs) {
  const src = path.join(WEBSITE_PUBLIC, asset)
  const dest = path.join(DIST, 'assets', asset)
  if (fs.existsSync(src)) {
    copyRecursive(src, dest)
    console.log(`Copied: ${asset}`)
  }
}

console.log('Build complete → dist/')
