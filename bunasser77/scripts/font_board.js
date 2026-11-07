#!/usr/bin/env node
// لوحة خطوط مرقّمة: نفس العنوان الرئيسي والعنوان الجانبي بكل خط، عشان بو ناصر يختار بالرقم.
// قاعدة «اختيار الخط قبل الكتابة» في bunasser77/SKILL.md.
//
//   node font_board.js --out board.png [--title "…"] [--sub "…"] [--local] [--theme theme.json]
//
// --local  يضيف خطوط جهاز بو ناصر (Windows\Fonts للمستخدم). للاستخدام على جهازه فقط، رخصها مب مضمونة.
// يحتاج Node و Edge أو Chrome (للتصوير بلا واجهة). بلا مكتبات.
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const out = path.resolve(opt('--out', 'font_board.png'));
const title = opt('--title', 'قرابة ثلاثة تريليونات دولار انمسحت');
const sub = opt('--sub', 'ليش أسهم الذكاء الاصطناعي صارت تسحب السوق تحت؟');
const useLocal = args.includes('--local');

let theme = { bg: '#0B0B0F', ink: '#F5F7FA', acc: '#C0262D', mut: '#98A2B3' };
const tp = opt('--theme');
if (tp && fs.existsSync(tp)) theme = { ...theme, ...JSON.parse(fs.readFileSync(tp, 'utf8')) };

const FONT_DIR = path.resolve(__dirname, '../../video-ad-editor/motion/fonts');
const manifest = JSON.parse(fs.readFileSync(path.join(FONT_DIR, 'manifest.json'), 'utf8')).fonts;
const SKIP = new Set(['Inter', 'Amiri Quran']); // لاتيني، ومصحف

const fileUrl = p => 'file:///' + encodeURI(p.replace(/\\/g, '/').replace(/^\/+/, ''));
const families = []; // {name, faces:[{url, weight}], heavy, light, local}
for (const [name, faces] of Object.entries(manifest)) {
  if (SKIP.has(name)) continue;
  const ws = faces.flatMap(f => String(f.weight || '400').split(' ').map(Number));
  families.push({
    name, local: false,
    faces: faces.map(f => ({ url: fileUrl(path.join(FONT_DIR, f.file)), weight: f.weight || '400' })),
    heavy: Math.min(Math.max(...ws), 900), light: Math.max(Math.min(...ws), 400),
  });
}

if (useLocal) {
  const dir = path.join(os.homedir(), 'AppData/Local/Microsoft/Windows/Fonts');
  if (fs.existsSync(dir)) {
    const groups = {};
    for (const f of fs.readdirSync(dir)) {
      if (!/\.(ttf|otf)$/i.test(f) || !/arab|arbfonts|kufi|naskh|khalaad|swissra|sada|kindah|hazim|samman|nasser|boutros|molsaq|zawiya|alfarooq|basim|ishraq|hasan|abdo|nusaibah|castile|sonbili|arbaeen|shafrah|skr/i.test(f)) continue;
      const fam = f.replace(/^ArbFONTS-/i, '').replace(/_?DownloadSoftware\.iR/i, '')
        .replace(/[-_. ]?(Bold|Regular|Light|Black|ExtraBold|ExtraLight|Medium|Thin|SemiBold|DemiBold|Heavy|Normal|Book|Ultra|Italic|Outline|Condensed)+/gi, '')
        .replace(/[-_.]+$/, '').replace(/\.(ttf|otf)$/i, '').replace(/[._]+/g, ' ').trim();
      (groups[fam] = groups[fam] || []).push(f);
    }
    for (const [fam, files] of Object.entries(groups)) {
      const pick = re => files.find(x => re.test(x));
      const heavy = pick(/black|heavy|ultra|extrabold/i) || pick(/bold/i) || files[0];
      const reg = pick(/regular|normal|book/i) || files.find(x => !/bold|black|heavy|ultra|light|thin|outline|italic/i.test(x)) || files[0];
      families.push({
        name: fam, local: true,
        faces: [{ url: fileUrl(path.join(dir, heavy)), weight: '800' }, { url: fileUrl(path.join(dir, reg)), weight: '400' }],
        heavy: 800, light: 400,
      });
    }
  }
}

const W = 1400, COLS = 2, CARD_H = 250, HEAD = 190;
const rows = Math.ceil(families.length / COLS);
const H = HEAD + rows * (CARD_H + 18) + 40;

const faceCss = families.map((f, i) => f.faces.map(fc =>
  `@font-face{font-family:"F${i}";src:url("${fc.url}");font-weight:${fc.weight};}`).join('\n')).join('\n');
const cards = families.map((f, i) => `
  <div class="card">
    <div class="num">${i + 1}</div>
    <div class="body">
      <div class="t" style="font-family:'F${i}';font-weight:${f.heavy}">${title}</div>
      <div class="s" style="font-family:'F${i}';font-weight:${f.light}">${sub}</div>
      <div class="n">${f.name}${f.local ? ' · على جهازك' : ' · مجاني بالبلقن'}</div>
    </div>
  </div>`).join('');

const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
${faceCss}
*{box-sizing:border-box;margin:0}
body{width:${W}px;height:${H}px;background:${theme.bg};color:${theme.ink};font-family:Tahoma,sans-serif;padding:36px}
h1{font:800 46px Tahoma;margin-bottom:10px}
.hint{color:${theme.mut};font:400 24px Tahoma;margin-bottom:34px}
.grid{display:grid;grid-template-columns:repeat(${COLS},1fr);gap:18px}
.card{height:${CARD_H}px;border:2px solid #ffffff1f;border-radius:18px;display:flex;align-items:center;gap:22px;padding:20px 26px;background:#ffffff08;overflow:hidden}
.num{flex:none;width:78px;height:78px;border-radius:50%;background:${theme.acc};color:#fff;font:800 40px Tahoma;display:flex;align-items:center;justify-content:center}
.body{flex:1;min-width:0}
.t{font-size:50px;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:clip}
.s{font-size:28px;line-height:1.5;color:${theme.ink}d9;margin-top:6px;white-space:nowrap;overflow:hidden}
.n{font:400 18px Tahoma;color:${theme.mut};margin-top:10px;direction:ltr;text-align:right}
</style></head><body>
<h1>لوحة الخطوط: رقم للعنوان الرئيسي ورقم للجانبي</h1>
<div class="hint">السطر الكبير = العنوان الرئيسي بأثقل وزن · السطر الصغير = العنوان الجانبي · ${families.length} خط</div>
<div class="grid">${cards}</div>
<script>
document.fonts.ready.then(()=>{for(const el of document.querySelectorAll('.t,.s')){let fs=parseFloat(getComputedStyle(el).fontSize);while(el.scrollWidth>el.clientWidth+1&&fs>14){fs-=1;el.style.fontSize=fs+'px';}}});
</script>
</body></html>`;

const tmp = path.join(os.tmpdir(), `font_board_${process.pid}.html`);
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
  `--user-data-dir=${path.join(os.tmpdir(), 'font_board_profile_' + process.pid)}`,
  `--window-size=${W},${H}`, '--virtual-time-budget=8000', `--screenshot=${out}`, fileUrl(tmp)], { stdio: 'ignore' });

// المتصفح أحياناً يرجع قبل ما يكتب الصورة: ننتظرها لين 20 ثانية
const t0 = Date.now();
while (!fs.existsSync(out) && Date.now() - t0 < 20000) execFileSync(process.execPath, ['-e', 'setTimeout(()=>{},300)']);
if (!fs.existsSync(out)) { console.error('ما انكتبت الصورة. HTML هني: ' + tmp); process.exit(3); }
const list = families.map((f, i) => `${i + 1}. ${f.name}${f.local ? ' (جهازه)' : ''}`).join('\n');
fs.writeFileSync(out.replace(/\.png$/i, '.txt'), list + '\n', 'utf8');
console.log(`OK ${out} (${families.length} fonts)`);
