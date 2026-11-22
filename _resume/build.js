// Renders _resume/resume.html to the résumé PDF in the repo root.
// Usage (from the repo root): node _resume/build.js
const path = require('path')
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('file://' + path.join(__dirname, 'resume.html'), {
    waitUntil: 'networkidle',
  })
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({
    path: path.join(__dirname, '..', 'resume - mohammad hassan amer - 2026.pdf'),
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
  })
  await browser.close()
})()
