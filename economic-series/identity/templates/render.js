// قوالب هوية «السلسلة الاقتصادية» — تُبنى بالكود فوق العناصر المولّدة
// node render.js [اسم القالب...] [--out <مجلد>]  →  PNG لكل قالب (الافتراضي ../out)
// Swissra (الخط الجانبي) على جهاز بو ناصر فقط؛ في غيابه يُستعمل Alexandria بدله.
const fs = require('fs'), path = require('path'), os = require('os');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const theme = JSON.parse(fs.readFileSync(path.join(ROOT, 'theme.json'), 'utf8'));
const FONTS = path.join(os.homedir(), 'AppData/Local/Microsoft/Windows/Fonts');
const url = p => 'file:///' + p.replace(/\\/g, '/').split('/').map(encodeURIComponent).join('/').replace(/^file:\/\/\/([A-Za-z])%3A/, 'file:///$1:');
const A = {
  coin: url(path.join(ROOT, 'generated/01_coin_emblem_cut.png')),
  bg169: url(path.join(ROOT, 'generated/02_bg_16x9.png')),
  bg916: url(path.join(ROOT, 'generated/03_bg_9x16.png')),
  // Alexandria: من جهازه، وإلا النسخة المجانية داخل البلقن (video-ad-editor/motion/fonts)
  fTitle: url([path.join(FONTS, 'Alexandria-VF.ttf'), path.resolve(__dirname, '../../../video-ad-editor/motion/fonts/Alexandria-VF.ttf')].find(fs.existsSync) || path.join(FONTS, 'Alexandria-VF.ttf')),
  fSub: url(path.join(FONTS, 'alfont_com_AlFont_com_Swissra-Normal-1.otf')),
};
const C = theme;

const base = (W, H, body, extraCss = '') => `<!doctype html><html dir="rtl"><head><meta charset="utf-8"><style>
@font-face{font-family:T;src:url("${A.fTitle}");font-weight:100 900}
@font-face{font-family:S;src:url("${A.fSub}")}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;background:${C.bg};color:${C.ink};font-family:S,T,sans-serif;position:relative}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.coin{filter:drop-shadow(0 18px 40px rgba(0,0,0,.55)) drop-shadow(0 0 60px rgba(217,164,65,.18))}
.name{font-family:T;font-weight:800;letter-spacing:0;line-height:1.15;color:${C.ink}}
.gold{color:${C.acc}}
.rule{height:4px;border-radius:2px;background:linear-gradient(90deg,transparent,${C.acc} 30%,#F3D58A 60%,${C.acc})}
${extraCss}</style></head><body>${body}</body></html>`;

const T = {
  // 1) الشعار الكامل — يوتيوب
  'logo_16x9': [1920, 1080, `
    <div class="bg" style="background-image:url('${A.bg169}')"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(270deg,rgba(15,27,45,.55) 0%,rgba(15,27,45,0) 60%)"></div>
    <div style="position:absolute;right:150px;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:56px">
      <img class="coin" src="${A.coin}" style="height:380px">
      <div>
        <div class="name" style="font-size:118px">السلسلة<br>الاقتصادية</div>
        <div class="rule" style="width:520px;margin:30px 0 26px"></div>
        <div style="font-size:40px;color:${C.mut}">نشرح الاقتصاد والمال بلغة بسيطة</div>
      </div>
    </div>`],

  // 2) بطاقة «محور الحلقة» — يوتيوب
  'episode_16x9': [1920, 1080, `
    <div class="bg" style="background-image:url('${A.bg169}')"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(270deg,rgba(11,20,34,.80) 0%,rgba(11,20,34,.35) 55%,rgba(11,20,34,0) 75%)"></div>
    <div style="position:absolute;top:64px;right:90px;display:flex;align-items:center;gap:18px">
      <img class="coin" src="${A.coin}" style="height:86px">
      <div class="name" style="font-size:38px">السلسلة الاقتصادية</div>
    </div>
    <div style="position:absolute;right:90px;top:330px;width:1050px">
      <div style="display:flex;align-items:center;gap:22px;margin-bottom:34px">
        <div style="font-family:T;font-weight:700;font-size:30px;color:${C.bg};background:${C.acc};padding:10px 26px 12px;border-radius:6px">الحلقة 01</div>
        <div style="font-size:34px;color:${C.acc}">محور الحلقة</div>
      </div>
      <div style="display:flex;gap:34px">
        <div style="width:10px;border-radius:5px;background:linear-gradient(${C.acc},#F3D58A,${C.acc})"></div>
        <div class="name" style="font-size:104px;line-height:1.42">لماذا يرتفع<br>الدَّين العام؟</div>
      </div>
      <div style="font-size:40px;color:${C.mut};margin:34px 44px 0 0">وكيف يصل أثره إلى جيبك</div>
    </div>`],

  // 3) الشعار الكامل — ريل
  'logo_9x16': [1080, 1920, `
    <div class="bg" style="background-image:url('${A.bg916}')"></div>
    <div style="position:absolute;left:0;right:0;top:300px;display:flex;flex-direction:column;align-items:center;text-align:center">
      <img class="coin" src="${A.coin}" style="height:400px">
      <div class="name" style="font-size:112px;margin-top:56px">السلسلة<br>الاقتصادية</div>
      <div class="rule" style="width:560px;margin:34px 0 28px"></div>
      <div style="font-size:42px;color:${C.mut}">نشرح الاقتصاد والمال بلغة بسيطة</div>
    </div>`],

  // 4) بطاقة «محور الحلقة» — ريل (المهم داخل المربع الأوسط 1080×1080)
  'episode_9x16': [1080, 1920, `
    <div class="bg" style="background-image:url('${A.bg916}')"></div>
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse 80% 40% at 50% 46%,rgba(11,20,34,.55),rgba(11,20,34,0))"></div>
    <div style="position:absolute;top:150px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:16px">
      <img class="coin" src="${A.coin}" style="height:80px">
      <div class="name" style="font-size:36px">السلسلة الاقتصادية</div>
    </div>
    <div style="position:absolute;left:70px;right:70px;top:560px;text-align:center">
      <div style="display:inline-flex;align-items:center;gap:20px;margin-bottom:46px">
        <div style="font-family:T;font-weight:700;font-size:34px;color:${C.bg};background:${C.acc};padding:10px 28px 12px;border-radius:6px">الحلقة 01</div>
        <div style="font-size:38px;color:${C.acc}">محور الحلقة</div>
      </div>
      <div class="name" style="font-size:118px;line-height:1.42">لماذا يرتفع<br>الدَّين العام؟</div>
      <div class="rule" style="width:420px;margin:44px auto 34px"></div>
      <div style="font-size:44px;color:${C.mut}">وكيف يصل أثره إلى جيبك</div>
    </div>`],
};

const bin = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(fs.existsSync);
const argv = process.argv.slice(2); const oi = argv.indexOf('--out');
const outDir = oi >= 0 ? path.resolve(argv[oi + 1]) : path.join(ROOT, 'out'); fs.mkdirSync(outDir, { recursive: true });
// ── السبورة: الخلفية الثابتة مغبّشة، وفوقها لوح أصغر (~78%) بلون آخر للشرح ──
const blurBg = (img) => `<div style="position:absolute;inset:0;overflow:hidden"><div class="bg" style="background-image:url('${img}');filter:blur(7px) brightness(.62);transform:scale(1.08)"></div></div>`;
const miniLogo = (h, fs, color = C.ink) => `<div style="display:flex;align-items:center;gap:${h * .2}px"><img class="coin" src="${A.coin}" style="height:${h}px"><div class="name" style="font-size:${fs}px;color:${color}">السلسلة الاقتصادية</div></div>`;
const tag = (txt, fs) => `<div style="display:inline-flex;align-items:center;gap:14px"><div style="font-family:T;font-weight:800;font-size:${fs}px;color:#fff;background:${C.blue};padding:6px 22px 10px;border-radius:10px">لحظة!</div><div style="font-size:${fs * .95}px;color:${C.bg}">${txt}</div></div>`;
const bars = (vals, w, h, labels) => { const m = Math.max(...vals); return `<div style="display:flex;align-items:flex-end;gap:${w * .045}px;height:${h}px;direction:ltr">${vals.map((v, i) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%"><div style="font-family:T;font-weight:700;font-size:${h * .075}px;color:${i === vals.length - 1 ? C.acc : C.ink};margin-bottom:10px">${v}</div><div style="width:100%;height:${v / m * 78}%;border-radius:8px 8px 0 0;background:${i === vals.length - 1 ? `linear-gradient(${'#F3D58A'},${C.acc})` : `linear-gradient(#3B7BFF,${C.blue})`}"></div><div style="font-family:T;font-weight:500;font-size:${h * .065}px;color:${C.mut};margin-top:12px">${labels[i]}</div></div>`).join('')}</div>`; };
Object.assign(T, {
  // 5) سبورة فاتحة للكلام والتعريفات — يوتيوب
  'board_light_16x9': [1920, 1080, `${blurBg(A.bg169)}
    <div style="position:absolute;top:56px;right:120px">${miniLogo(64, 30)}</div>
    <div style="position:absolute;left:50%;top:54%;transform:translate(-50%,-50%);width:78%;height:76%;background:${C.ink};border-radius:28px;box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden">
      <div style="height:8px;background:linear-gradient(90deg,${C.acc},#F3D58A,${C.acc})"></div>
      <div style="padding:64px 90px;height:calc(100% - 8px);display:flex;flex-direction:column;justify-content:center">
        ${tag('شنو يعني «الدَّين العام»؟', 44)}
        <div class="name" style="color:${C.bg};font-size:68px;line-height:1.55;margin-top:48px">مجموع ما تقترضه الحكومة<br>لتغطية الفرق بين <span style="color:${C.blue}">ما تصرفه</span> و<span style="color:#B7791F">ما تجنيه</span></div>
        <div style="font-size:36px;color:#5B6B82;margin-top:38px">مثل بطاقة ائتمان كبيرة… لكن باسم الدولة</div>
      </div>
    </div>`],

  // 6) سبورة داكنة للصور والفيديو والرسوم — يوتيوب
  'board_media_16x9': [1920, 1080, `${blurBg(A.bg169)}
    <div style="position:absolute;top:56px;right:120px">${miniLogo(64, 30)}</div>
    <div style="position:absolute;left:50%;top:54%;transform:translate(-50%,-50%);width:78%;height:76%;background:rgba(22,40,68,.88);border:2px solid rgba(217,164,65,.55);border-radius:28px;box-shadow:0 40px 90px rgba(0,0,0,.5);padding:56px 80px">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <div class="name" style="font-size:54px">تطور الدَّين العام</div>
        <div style="font-size:28px;color:${C.mut}">أرقام توضيحية · مثال</div>
      </div>
      <div style="margin-top:40px">${bars([42, 51, 63, 78, 94], 1200, 560, ['2021', '2022', '2023', '2024', '2025'])}</div>
    </div>`],

  // 7) سبورة فاتحة — ريل (اللوح داخل مناطق الأمان)
  'board_light_9x16': [1080, 1920, `${blurBg(A.bg916)}
    <div style="position:absolute;top:140px;left:0;right:0;display:flex;justify-content:center">${miniLogo(70, 32)}</div>
    <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:86%;height:60%;background:${C.ink};border-radius:32px;box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden">
      <div style="height:10px;background:linear-gradient(90deg,${C.acc},#F3D58A,${C.acc})"></div>
      <div style="padding:70px 64px;text-align:center;height:calc(100% - 10px);display:flex;flex-direction:column;justify-content:center;align-items:center">
        ${tag('شنو يعني؟', 44)}
        <div class="name" style="color:${C.bg};font-size:84px;line-height:1.4;margin:56px 0 40px">الدَّين العام</div>
        <div style="font-size:46px;line-height:1.7;color:#33445C">مجموع ما تقترضه الحكومة لتغطية الفرق بين <span style="color:${C.blue}">ما تصرفه</span> و<span style="color:#B7791F">ما تجنيه</span></div>
        <div style="width:120px;height:4px;background:${C.acc};margin:56px auto 50px;border-radius:2px"></div>
        <div style="display:flex;align-items:center;justify-content:center;gap:26px;background:#EFEAE1;border-radius:22px;padding:34px 30px">
          <div style="width:96px;height:64px;border-radius:12px;background:linear-gradient(135deg,${C.bg},#22385C);position:relative;flex:none"><div style="position:absolute;top:14px;left:12px;width:22px;height:16px;border-radius:4px;background:${C.acc}"></div></div>
          <div style="font-size:42px;color:${C.bg};text-align:right">مثل بطاقة ائتمان كبيرة<br><span style="color:#5B6B82">لكن باسم الدولة</span></div>
        </div>
      </div>
    </div>`],

  // 8) سبورة داكنة للصور والفيديو — ريل
  'board_media_9x16': [1080, 1920, `${blurBg(A.bg916)}
    <div style="position:absolute;top:140px;left:0;right:0;display:flex;justify-content:center">${miniLogo(70, 32)}</div>
    <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:86%;height:60%;background:rgba(22,40,68,.88);border:2px solid rgba(217,164,65,.55);border-radius:32px;box-shadow:0 40px 90px rgba(0,0,0,.5);padding:64px 56px">
      <div class="name" style="font-size:60px;text-align:center">تطور الدَّين العام</div>
      <div style="font-size:30px;color:${C.mut};text-align:center;margin-top:10px">أرقام توضيحية · مثال</div>
      <div style="margin-top:60px">${bars([42, 51, 63, 78, 94], 820, 780, ['2021', '2022', '2023', '2024', '2025'])}</div>
    </div>`],
});

const only = (() => { const a = process.argv.slice(2); const i = a.indexOf('--out'); if (i >= 0) a.splice(i, 2); return a; })();
for (const [name, [W, H, body]] of Object.entries(T)) {
  if (only.length && !only.includes(name)) continue;
  const html = path.join(os.tmpdir(), `eco_${name}.html`);
  fs.writeFileSync(html, base(W, H, body), 'utf8');
  const out = path.join(outDir, name + '.png');
  if (fs.existsSync(out)) fs.unlinkSync(out);
  execFileSync(bin, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--force-device-scale-factor=1',
    `--user-data-dir=${path.join(os.tmpdir(), 'eco_profile')}`, `--window-size=${W},${H}`, '--virtual-time-budget=8000', `--screenshot=${out}`, url(html)], { stdio: 'ignore' });
  for (let i = 0; i < 40 && !fs.existsSync(out); i++) execFileSync(process.execPath, ['-e', 'setTimeout(()=>{},500)']);
  console.log(fs.existsSync(out) ? 'OK ' + out : 'FAIL ' + name);
}
