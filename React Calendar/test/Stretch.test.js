const puppeteer = require('puppeteer');

function firstDate(relative) {
  let date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth()+relative);
  return date.getDay();
}
function lastDate() {
  let date = new Date();
  const last = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  return last;
}
function thisMonthYear() {
  const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let date = new Date();
  return (m[date.getMonth()]+' '+date.getFullYear());
}
function todayDate() {
  let date = new Date();
  return date.getDate();

}

let browser;

beforeEach(async (done) => {
  browser = await puppeteer.launch({
    //headless: false,
    //devtools: true
  });
  done();
});

afterEach(async (done) => {
  await browser.close();
  done();
});

test('Display', async () => {
  let page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const title = await page.title();
  const hello = await page.$("#display");
  const tag = await (await hello.getProperty('tagName')).jsonValue();
  expect(tag).toBe('DIV');
  const msg = await (await hello.getProperty('textContent')).jsonValue();
  expect(msg).toBe(thisMonthYear());
});

test('Today', async () => {
  let page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const title = await page.title();
  const hello = await page.$("#today");
  const tag = await (await hello.getProperty('tagName')).jsonValue();
  expect(tag).toBe('DIV');
  const msg = await (await hello.getProperty('textContent')).jsonValue();
  expect(parseInt(msg)).toBe(todayDate());
});

test('First day of the Month', async () => {
  let page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const title = await page.title();
  const hello = await page.$("#d"+firstDate(0));
  const tag = await (await hello.getProperty('tagName')).jsonValue();
  expect(tag).toBe('DIV');
  const msg = await (await hello.getProperty('textContent')).jsonValue();
  expect(parseInt(msg)).toBe(1);
});

test('Blank Before the First Day', async () => {
  let page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const title = await page.title();
  let newMsg = '';
  for(let i = 0; i < firstDate(0); i++) {
    const hello = await page.$("#d"+i);
    const msg = await (await hello.getProperty('textContent')).jsonValue();
    newMsg += msg;
  }
  expect(newMsg).toBe('');
});

test('Blank Before the Last Day', async () => {
  let page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const title = await page.title();
  let newMsg = '';
  for(let i = lastDate(); i < 42; i++) {
    const hello = await page.$("#d"+i);
    const msg = await (await hello.getProperty('textContent')).jsonValue();
    newMsg += msg;
  }
  expect(newMsg).toBe('');
});

// After clicking next once, there should be no element with the id 'today'
test('Next Month Today', async () => {
  let page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const title = await page.title();
  await page.click("#next");
  const check = await page.$("#today");
  let temp = false;
  if(check) {
    temp = true;
  }
  expect(temp).toBe(false);
});

// After clicking next once, then prev once, there should be an element with id 'today'
test('Not Today', async () => {
  let page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const title = await page.title();
  await page.click("#next");
  await page.click("#prev");
  const check = await page.$("#today");
  let temp = false;
  if(check) {
    temp = true;
  }
  expect(temp).toBe(true);
});

// After clicking next once, then prev twice, there should be no element with id 'today'
test('Not Today', async () => {
  let page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const title = await page.title();
  await page.click("#next");
  await page.click("#prev");
  await page.click("#prev");
  const check = await page.$("#today");
  let temp = false;
  if(check) {
    temp = true;
  }
  expect(temp).toBe(false);
});

test('Next Month', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const title = await page.title();
  const num = Math.max(1,Math.floor(Math.random()*28));
  for (let i = 0; i < num; i++) {
    await page.click('#next');
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(500);
  const elem = await page.$("#d"+(firstDate(num)+num-1));
  const cont = await (await elem.getProperty('textContent')).jsonValue();
  expect(cont).toBe(''+num);
});
