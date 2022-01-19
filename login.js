const puppeteer = require('puppeteer');

async function start() {
  const browser = await puppeteer.launch({ headless: false, devtools: false });

  for (let i = 0; i < 10000; i++) {
    const page = await browser.newPage();
    await page.goto('http://xx1.luoyon.cn/reg.asp', {
      waitUntil: 'domcontentloaded',
    });

    await page.setViewport({ width: 1366, height: 768 });

    let str = randomString(8);

    let userName = await page.waitForSelector('#userName');
    await page.waitForTimeout(500);
    await userName.click();
    await page.type('#userName', str);

    let userPass = await page.waitForSelector('#userPass');
    await page.waitForTimeout(500);
    await userPass.click();
    await page.type('#userPass', str);

    let userPasschk = await page.waitForSelector('#userPasschk');
    await page.waitForTimeout(500);
    await userPasschk.click();
    await page.type('#userPasschk', str);;

    let regBtn = await page.waitForSelector('#regBtn');
    await page.waitForTimeout(500);
    await regBtn.click();

    await page.waitForTimeout(1000);
    await page.close();
  }

  await browser.close();
}

function randomString(len) {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (var i = len; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)];
  }
  return result;
}

start();



