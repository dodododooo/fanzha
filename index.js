const puppeteer = require('puppeteer');

async function start () {
  const browser = await puppeteer.launch({ headless: false, devtools: false });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(90000);
  await page.goto(
    'https://totalk.jingge.chat/standalone.html?appId=d9ea7999616d44ffb58c1d8ead6c6c45',
    { waitUntil: 'domcontentloaded' }
  );

  // await page.waitForNavigation();

  await page.evaluate(() => {
    localStorage.clear();
  });
  
  await page.setViewport({ width: 928, height: 1041 });
  
  let input = await page.waitForSelector('#inputArea');

  await page.waitForTimeout(1000);

  await input.click();

  await page.click('#inputArea');

  // await page.evaluate(() => {
  //   document.querySelector('#inputArea').click();
  // });
  
  await page.type(
    '#inputArea',
    '根据刑法的规定，犯诈骗罪的，处三年以下有期徒刑、拘役或者管制，并处或者单处罚金；数额巨大或者有其他严重情节的，处三年以上十年以下有期徒刑，并处罚金；数额特别巨大或者有其他特别严重情节的，处十年以上有期徒刑或者无期徒刑，并处罚金或者没收财产。',
    { delay: 0 }
  );
  
  await page.waitForSelector('#btnSend');
  await page.evaluate(() => {
    document.querySelector('#btnSend').click();
  });
  
  await browser.close();

}


start();