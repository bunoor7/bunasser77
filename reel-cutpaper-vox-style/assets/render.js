// يلتقط 12 وضعية في الثانية عبر window.seek ثم يجمعها ffmpeg إلى MP4 بـ60 فريم
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(__dirname, 'index.html'));
  await p.waitForFunction('window.ready === true');
  const el = await p.$('#c');
  for (let k = 0; k < 120; k++) {
    await p.evaluate(s => window.seek(s), k / 12);
    await el.screenshot({ path: path.join(__dirname, 'frames', `f${String(k).padStart(3, '0')}.png`) });
  }
  await b.close();
})();
