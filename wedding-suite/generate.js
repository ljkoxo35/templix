// Batch generate all 6 wedding cards + 6 previews as PNG
const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\EdgeCore\\136.0.3240.64\\msedge.exe';
const fs = require('fs');
const path = require('path');

const CARDS = ['invitation','save-the-date','rsvp','details','menu','place'];
const CARD_NAMES = ['01-invitation','02-save-the-date','03-rsvp','04-details','05-menu','06-place'];

(async () => {
  const b = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] });

  for (let i = 0; i < CARDS.length; i++) {
    // Card PNG
    let pg = await b.newPage();
    let svgPath = `file:///c:/Users/Administrator/Desktop/新建文件夹/wedding-suite/cards/${CARD_NAMES[i]}.svg`;
    let pngPath = `c:/Users/Administrator/Desktop/新建文件夹/wedding-suite/png/${CARD_NAMES[i]}.png`;
    await pg.setViewport({ width: 800, height: 1100, deviceScaleFactor: 2 });
    await pg.goto(svgPath, { waitUntil: 'networkidle0' });
    await pg.screenshot({ path: pngPath, type: 'png' });
    await pg.close();
    console.log('✓ ' + CARD_NAMES[i] + '.png');
  }

  for (let i = 0; i < CARDS.length; i++) {
    // Preview PNG
    let pg = await b.newPage();
    let svgPath = `file:///c:/Users/Administrator/Desktop/新建文件夹/wedding-suite/previews/${CARD_NAMES[i]}-preview.svg`;
    let pngPath = `c:/Users/Administrator/Desktop/新建文件夹/wedding-suite/png/${CARD_NAMES[i]}-preview.png`;
    await pg.setViewport({ width: 1500, height: 2000, deviceScaleFactor: 2 });
    await pg.goto(svgPath, { waitUntil: 'networkidle0' });
    await pg.screenshot({ path: pngPath, type: 'png', fullPage: true });
    await pg.close();
    console.log('✓ ' + CARD_NAMES[i] + '-preview.png');
  }

  await b.close();
  console.log('\nAll 12 PNGs done → wedding-suite/png/');
})();
