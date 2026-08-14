const fs = require('fs')
const path = require('path')

const DIST = path.join(__dirname, 'dist')

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return
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

if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true })
}
fs.mkdirSync(DIST, { recursive: true })

fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(DIST, 'index.html'))

const robotsSrc = path.join(__dirname, 'robots.txt')
if (fs.existsSync(robotsSrc)) {
  fs.copyFileSync(robotsSrc, path.join(DIST, 'robots.txt'))
}

copyRecursive(path.join(__dirname, 'css'), path.join(DIST, 'css'))
copyRecursive(path.join(__dirname, 'js'), path.join(DIST, 'js'))
copyRecursive(path.join(__dirname, 'images'), path.join(DIST, 'images'))

console.log('Build complete → dist/')
