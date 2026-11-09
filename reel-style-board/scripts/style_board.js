#!/usr/bin/env node
// لوحة ستايلات مرقّمة: كل ستايل بصورة لنفس المشهد، عشان بو ناصر يختار بالرقم (مثل لوحة الخطوط).
//
//   node style_board.js --out board.png [--suggest 31,32,40] [--only] [--theme theme.json]
//
// --suggest  أرقام مقترحة لهالعمل: تنعلّم بإطار أحمر وكلمة «مقترح»، والأرقام ما تتغيّر.
// --only     اللوحة فيها المقترحة بس (بنفس أرقامها).
// يحتاج Node و Edge أو Chrome (للتصوير بلا واجهة). بلا مكتبات.
// الصور من مكتبة video-director (Sally Slater، MIT): assets/styles.
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const out = path.resolve(opt('--out', 'style_board.png'));
const suggest = new Set(String(opt('--suggest', '')).split(',').map(s => parseInt(s, 10)).filter(Boolean));
const only = args.includes('--only');

let theme = { bg: '#0B0B0F', ink: '#F5F7FA', acc: '#C0262D', mut: '#98A2B3' };
const tp = opt('--theme');
if (tp && fs.existsSync(tp)) theme = { ...theme, ...JSON.parse(fs.readFileSync(tp, 'utf8')) };

const ROOT = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'styles.json'), 'utf8'));
const fileUrl = p => 'file:///' + encodeURI(p.replace(/\\/g, '/').replace(/^\/+/, ''));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const all = data.styles.map((s, i) => ({ ...s, n: i + 1 }));
const shown = only && suggest.size ? all.filter(s => suggest.has(s.n)) : all;
if (!shown.length) { console.error('ما فيه ستايلات بهالأرقام'); process.exit(1); }

const COLS = 3, W = 1400;
let cards = '', lastGroup = '';
for (const s of shown) {
  if (s.group !== lastGroup) { cards += `<div class="g">${esc(s.group)}</div>`; lastGroup = s.group; }
  const img = path.join(ROOT, 'assets', 'styles', s.id + '.webp');
  cards += `<div class="c${suggest.has(s.n) ? ' sug' : ''}">
  <div class="im" style="background-image:url('${fileUrl(img)}')"><b>${s.n}</b>${suggest.has(s.n) ? '<i>مقترح</i>' : ''}</div>
  <div class="tx"><div class="ar">${esc(s.ar)} <span>${esc(s.en)}</span></div>
  <div class="ft">${esc(s.fit)}</div>
  <div class="md">${esc(data.made[s.made])}${s.people ? ' · فيه شخصيات' : ''}</div></div></div>`;
}
const perGroup = {};
for (const s of shown) perGroup[s.group] = (perGroup[s.group] || 0) + 1;
const rows = Object.values(perGroup).reduce((a, n) => a + Math.ceil(n / COLS), 0);
const H = 160 + rows * 372 + Object.keys(perGroup).length * 80;

const html = `<!doctype html><html dir="rtl"><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{background:${theme.bg};color:${theme.ink};font-family:"Segoe UI",Tahoma,sans-serif;padding:34px 30px;width:${W}px}
h1{font-size:38px;margin-bottom:6px}.sub{color:${theme.mut};font-size:20px;margin-bottom:10px}
.grid{display:grid;grid-template-columns:repeat(${COLS},1fr);gap:18px}
.g{grid-column:1/-1;font-size:26px;font-weight:700;color:${theme.acc};margin-top:18px;border-bottom:2px solid #ffffff1f;padding-bottom:6px}
.c{border:2px solid #ffffff1f;border-radius:16px;overflow:hidden;background:#ffffff08}
.c.sug{border-color:${theme.acc};box-shadow:0 0 0 2px ${theme.acc}}
.im{height:240px;background-size:cover;background-position:center;position:relative}
.im b{position:absolute;top:12px;right:12px;background:${theme.acc};color:#fff;font-size:30px;min-width:56px;height:56px;border-radius:28px;display:flex;align-items:center;justify-content:center;padding:0 10px}
.im i{position:absolute;top:18px;left:12px;background:${theme.ink};color:${theme.bg};font-style:normal;font-weight:700;font-size:18px;padding:4px 12px;border-radius:12px}
.tx{padding:12px 16px 14px}.ar{font-size:24px;font-weight:700}.ar span{font-size:16px;color:${theme.mut};font-weight:400;direction:ltr;unicode-bidi:isolate}
.ft{font-size:18px;margin-top:4px}.md{font-size:15px;color:${theme.mut};margin-top:4px}
</style></head><body>
<h1>لوحة الستايلات: اختر بالرقم</h1>
<div class="sub">نفس المشهد بكل ستايل · ${shown.length} ستايل${suggest.size ? ' · المقترح لهالعمل بإطار أحمر' : ''}</div>
<div class="grid">${cards}</div></body></html>`;

const tmp = path.join(os.tmpdir(), `style_board_${process.pid}.html`);
fs.writeFileSync(tmp, html, 'utf8');

const browsers = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].filter(Boolean);
const bin = browsers.find(b => fs.existsSync(b));
if (!bin) { console.error('ما لقيت Edge ولا Chrome. ملف HTML هني: ' + tmp); process.exit(2); }

if (fs.existsSync(out)) fs.unlinkSync(out);
execFileSync(bin, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
  `--user-data-dir=${path.join(os.tmpdir(), 'style_board_profile_' + process.pid)}`,
  `--window-size=${W},${H}`, '--virtual-time-budget=8000', `--screenshot=${out}`, fileUrl(tmp)], { stdio: 'ignore' });

const t0 = Date.now();
while (!fs.existsSync(out) && Date.now() - t0 < 20000) execFileSync(process.execPath, ['-e', 'setTimeout(()=>{},300)']);
if (!fs.existsSync(out)) { console.error('ما انكتبت الصورة. HTML هني: ' + tmp); process.exit(3); }
const list = shown.map(s => `${s.n}. ${s.ar} (${s.en})${suggest.has(s.n) ? ' ← مقترح' : ''}`).join('\n');
fs.writeFileSync(out.replace(/\.png$/i, '.txt'), list + '\n', 'utf8');
console.log(`OK ${out} (${shown.length} styles)`);
