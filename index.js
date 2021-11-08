const puppeter = require('puppeteer')

const URL = process.env.URL || 'https://www.cajatrujillo.com.pe/ConstanciaNoAdeudo/login'

;(async () => {
  const browser = await puppeter.launch({ headless: true })
  const page = await browser.newPage()

  await page.coverage.startCSSCoverage()
  await page.goto(URL, {waitUntil: 'load'})
  const cssCoverage = await page.coverage.stopCSSCoverage()

  let criticalCSS = ''

  for(const entry of cssCoverage){
    for(const range of entry.ranges){
      criticalCSS += entry.text.slice(range.start, range.end) + '\n'
    }
  }

  console.log(criticalCSS)

  await page.close()
  await browser.close()
})()