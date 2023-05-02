const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://aryelportfolio.netlify.app/');
  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('img');
    const elements = [...nodeList];
    const imgList = elements.map(({src}) => ({
      src
    }));
    return imgList;
  })
  fs.writeFile('imagens.json', JSON.stringify(imgList, null, 2), err => {
    if(err) throw new Error('something went wrong');
    console.log('well done!');
  });
  await browser.close();
})();