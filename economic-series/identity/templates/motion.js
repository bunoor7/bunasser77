// مقدمة وخاتمة «السلسلة الاقتصادية» المتحركتان — بالهوية نفسها (theme.json + generated/)
// node motion.js <intro|outro> [--fmt 9x16|16x9] [--out <مجلد>] [--next "الأنظمة الاقتصادية"] [--fps 60] [--frames 0,1.5,3]
//   --frames: يصدّر فريمات PNG عند هذه الثواني بدل الفيديو (للمعاينة)
// الحركة كلها دالة في الزمن t، فكل فريم يُرسم بدقة ثم يُجمع بـffmpeg (بلا صوت؛ الصوت في المونتاج).
const fs = require('fs'), path = require('path'), os = require('os');
const { spawn } = require('child_process');
const puppeteer = require([path.resolve(__dirname, '../../../node_modules/puppeteer-core'), 'C:/Users/bunoo/Videos/Reels/studio/bunasser77/node_modules/puppeteer-core',
  path.join(os.homedir(), 'AppData/Roaming/npm/node_modules/puppeteer-core')].find(fs.existsSync));
const ROOT = path.resolve(__dirname, '..');
const C = JSON.parse(fs.readFileSync(path.join(ROOT, 'theme.json'), 'utf8'));
const FONTS = path.join(os.homedir(), 'AppData/Local/Microsoft/Windows/Fonts');
const url = p => 'file:///' + p.replace(/\\/g, '/').split('/').map(encodeURIComponent).join('/').replace(/^file:\/\/\/([A-Za-z])%3A/, 'file:///$1:');
const A = {
  coin: url(path.join(ROOT, 'generated/01_coin_emblem_cut.png')),
  bg169: url(path.join(ROOT, 'generated/02_bg_16x9.png')),
  bg916: url(path.join(ROOT, 'generated/03_bg_9x16.png')),
  fTitle: url([path.join(FONTS, 'Alexandria-VF.ttf'), path.resolve(__dirname, '../../../video-ad-editor/motion/fonts/Alexandria-VF.ttf')].find(fs.existsSync) || path.join(FONTS, 'Alexandria-VF.ttf')),
  fSub: url(path.join(FONTS, 'alfont_com_AlFont_com_Swissra-Normal-1.otf')),
};

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const kind = args[0] || 'intro';
const fmt = opt('fmt', '9x16');
const fps = +opt('fps', 60);
const next = opt('next', '');
const outDir = path.resolve(opt('out', path.join(ROOT, 'out')));
const framesAt = opt('frames', '');
const V = fmt === '9x16';
const W = V ? 1080 : 1920, H = V ? 1920 : 1080;
const DUR = 5.0;

// تخطيط بالصيغتين: مكان العملة ونص الاسم (العمودي مطابق لـlogo_9x16 الثابت)
const L = V
  ? { coinH: 400, coinX: 540, coinY: 500, nameTop: 756, nameFs: 112, row: 'col', ruleW: 560, subFs: 42 }
  : { coinH: 380, coinX: 1470, coinY: 540, nameTop: 0, nameFs: 118, row: 'row', ruleW: 520, subFs: 40 };

const html = `<!doctype html><html dir="rtl"><head><meta charset="utf-8"><style>
@font-face{font-family:T;src:url("${A.fTitle}");font-weight:100 900}
@font-face{font-family:S;src:url("${A.fSub}")}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;background:${C.bg};color:${C.ink};font-family:S,T,sans-serif;position:relative}
#bgw{position:absolute;inset:0;overflow:hidden}
#bg{position:absolute;inset:0;background:url('${V ? A.bg916 : A.bg169}') center/cover}
#shade{position:absolute;inset:0}
#stage{position:absolute;inset:0;perspective:1600px}
#coinw{position:absolute;width:${L.coinH * 997 / 1043}px;height:${L.coinH}px;left:${L.coinX}px;top:${L.coinY}px;margin-left:-${L.coinH * 997 / 1043 / 2}px;margin-top:-${L.coinH / 2}px;transform-style:preserve-3d}
#coin,#glint,#sheen{position:absolute;inset:0;width:100%;height:100%}
#coin{filter:drop-shadow(0 18px 40px rgba(0,0,0,.55)) drop-shadow(0 0 60px rgba(217,164,65,.18))}
#glint,#sheen{-webkit-mask:url('${A.coin}') center/100% 100% no-repeat;mask:url('${A.coin}') center/100% 100% no-repeat;mix-blend-mode:screen}
#burst{position:absolute;width:0;height:0}
.ray{position:absolute;left:0;top:0;height:3px;transform-origin:0 50%;border-radius:2px;background:linear-gradient(90deg,#FFF6D8,${C.acc} 40%,rgba(217,164,65,0))}
#halo{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(255,240,200,.95),rgba(243,213,138,.45) 30%,rgba(217,164,65,0) 70%)}
#txt{position:absolute;${V ? `left:0;right:0;top:${L.nameTop}px;text-align:center;display:flex;flex-direction:column;align-items:center`
    : `right:${1920 - L.coinX + L.coinH * 997 / 1043 / 2 + 56}px;top:50%;transform:translateY(-50%)`}}
.name{font-family:T;font-weight:800;line-height:1.15;font-size:${L.nameFs}px}
.w{display:inline-block;will-change:transform,opacity,filter}
.clip{overflow:hidden;padding:0 10px 18px;margin-bottom:-18px}
#rule{height:4px;border-radius:2px;width:${L.ruleW}px;margin:34px 0 28px;background:linear-gradient(90deg,transparent,${C.acc} 30%,#F3D58A 60%,${C.acc})}
#sub{font-size:${L.subFs}px;color:${C.mut}}
#chip{display:inline-flex;align-items:center;gap:16px;margin-top:${V ? 64 : 44}px;font-family:T;font-weight:700;font-size:${V ? 40 : 34}px;color:${C.bg};background:linear-gradient(180deg,#F3D58A,${C.acc});padding:14px 34px 18px;border-radius:12px;box-shadow:0 14px 34px rgba(0,0,0,.35)}
#next{margin-top:${V ? 34 : 26}px;font-size:${V ? 44 : 38}px;color:${C.ink}}
#next b{font-family:T;font-weight:700;color:${C.acc}}
#fade{position:absolute;inset:0;background:${C.bg};pointer-events:none}
</style></head><body>
<div id="bgw"><div id="bg"></div></div><div id="shade"></div>
<div id="stage"><div id="coinw"><img id="coin" src="${A.coin}"><div id="glint"></div><div id="sheen"></div></div></div>
<div id="burst"><div id="halo"></div>${Array.from({ length: 9 }, () => '<div class="ray"></div>').join('')}</div>
<div id="txt">
  <div class="name"><div class="clip"><span class="w" id="w1">السلسلة</span></div>${V ? '' : ''}<div class="clip"><span class="w" id="w2">الاقتصادية</span></div></div>
  <div id="rule"></div>
  ${kind === 'intro' ? `<div id="sub">نشرح الاقتصاد والمال بلغة بسيطة</div>`
    : `<div id="chip">حلقة جديدة كل أسبوع</div>${next ? `<div id="next">الحلقة الياية: <b>${next}</b></div>` : ''}`}
</div>
<div id="fade"></div>
<script>
const KIND='${kind}', V=${V}, CH=${L.coinH}, CW=${L.coinH * 997 / 1043}, CX=${L.coinX}, CY=${L.coinY};
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const seg=(t,a,b)=>cl((t-a)/(b-a));
const oCub=x=>1-Math.pow(1-x,3), oQuint=x=>1-Math.pow(1-x,5), ioCub=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const oBack=(x,s=1.5)=>1+(s+1)*Math.pow(x-1,3)+s*Math.pow(x-1,2);
const $=id=>document.getElementById(id);
// مسار السهم داخل صورة العملة (نسب من عرضها وارتفاعها): من اللؤلؤة إلى رأس السهم
const P0=[.23,.71], P1=[.62,.66], P2=[.99,.11];
const bez=u=>[(1-u)*(1-u)*P0[0]+2*(1-u)*u*P1[0]+u*u*P2[0],(1-u)*(1-u)*P0[1]+2*(1-u)*u*P1[1]+u*u*P2[1]];
const rays=[...document.querySelectorAll('.ray')];
window.renderAt=function(t){
  const intro=KIND==='intro';
  // الخلفية: اقتراب بطيء طوال المقطع
  $('bg').style.transform='scale('+(1.10-0.10*ioCub(seg(t,0,5)))+')';
  $('shade').style.background=intro
    ? 'radial-gradient(ellipse 90% 55% at 50% '+(V?'40%':'50%')+',rgba(11,20,34,0),rgba(11,20,34,'+(0.55-0.25*seg(t,0,1.2))+'))'
    : 'radial-gradient(ellipse 90% 55% at 50% 45%,rgba(11,20,34,.15),rgba(11,20,34,.5))';
  if(!V) $('shade').style.background+=',linear-gradient(270deg,rgba(11,20,34,.78) 0%,rgba(11,20,34,.45) 50%,rgba(11,20,34,0) 72%)';
  // العملة
  let sc,ry,ty,op;
  if(intro){
    const e=seg(t,0.15,1.75);
    sc=0.35+0.65*oBack(oCub(e),1.1); ry=(1-oQuint(e))*720; op=seg(t,0.15,0.45); ty=0;
  } else {
    const e=seg(t,0.1,1.5);
    sc=0.6+0.4*oCub(e); ry=(1-oQuint(e))*540; op=seg(t,0.1,0.4); ty=-(1-oBack(e,1.2))*(V?520:380);
  }
  // دفعة صعود صغيرة مع وصول البريق لرأس السهم (المقدمة)
  const lift=intro?Math.sin(Math.PI*seg(t,2.05,2.75))*-18:0;
  const edge=Math.abs(Math.cos(ry*Math.PI/180));
  $('coinw').style.transform='translateY('+(ty+lift)+'px) rotateY('+ry+'deg) scale('+sc+')';
  $('coinw').style.opacity=op;
  $('coin').style.filter='drop-shadow(0 18px 40px rgba(0,0,0,.55)) drop-shadow(0 0 60px rgba(217,164,65,.18)) brightness('+(0.55+0.45*edge)+')';
  // البريق على السهم: نقطة ضوء تركض من اللؤلؤة إلى الرأس
  const g=intro?seg(t,1.55,2.35):-1;
  if(g>0&&g<1){
    const u=ioCub(g), p=bez(u), q=bez(Math.max(0,u-0.18));
    $('glint').style.opacity=Math.sin(Math.PI*Math.min(1,g*1.15));
    $('glint').style.background='radial-gradient(circle at '+p[0]*100+'% '+p[1]*100+'%,rgba(255,250,232,1) 0,rgba(255,230,160,.9) 7%,rgba(217,164,65,0) 17%),'
      +'radial-gradient(circle at '+q[0]*100+'% '+q[1]*100+'%,rgba(255,226,150,.6) 0,rgba(217,164,65,0) 15%)';
  } else $('glint').style.opacity=0;
  // لمعان قطري يمر على العملة كلها
  const s=intro?seg(t,3.2,4.0):seg(t,1.6,2.5);
  $('sheen').style.opacity=s>0&&s<1?0.9:0;
  const sx=-40+180*ioCub(s);
  $('sheen').style.background='linear-gradient(115deg,rgba(255,255,255,0) '+(sx-14)+'%,rgba(255,244,214,.55) '+sx+'%,rgba(255,255,255,0) '+(sx+14)+'%)';
  // ومضة كسر الإطار عند رأس السهم
  const b=intro?seg(t,2.25,2.95):-1;
  const bx=CX-CW/2+.975*CW, by=CY-CH/2+.135*CH+lift;
  const bw=$('burst'); bw.style.left=bx+'px'; bw.style.top=by+'px';
  const hs=(V?260:240)*oCub(Math.max(0,b)); const ho=b>0?Math.pow(1-b,1.4):0;
  $('halo').style.cssText+='width:'+hs+'px;height:'+hs+'px;left:'+(-hs/2)+'px;top:'+(-hs/2)+'px;opacity:'+ho;
  rays.forEach((r,i)=>{const a=-80+i*20+(i%2?6:-4); const len=(i%2?70:120)*oCub(Math.max(0,b));
    r.style.width=len+'px'; r.style.transform='rotate('+a+'deg) translateX('+(30+60*oCub(Math.max(0,b)))+'px)'; r.style.opacity=b>0?(1-b):0;});
  // الاسم: كلمة كلمة، صعود من تحت القناع مع إزالة الضبابية
  const n0=intro?2.2:1.0;
  [['w1',n0],['w2',n0+0.22]].forEach(([id,st])=>{const e=seg(t,st,st+0.7), y=(1-oQuint(e))*110;
    const el=$(id); el.style.transform='translateY('+y+'%)'; el.style.opacity=seg(t,st,st+0.3); el.style.filter='blur('+(1-e)*10+'px)';});
  const r=seg(t,n0+0.55,n0+1.15); $('rule').style.transform='scaleX('+oCub(r)+')'; $('rule').style.opacity=r>0?1:0;
  if(intro){const e=seg(t,n0+0.85,n0+1.45); $('sub').style.opacity=e; $('sub').style.transform='translateY('+(1-oCub(e))*24+'px)';}
  else{const e=seg(t,1.95,2.5); $('chip').style.opacity=e; $('chip').style.transform='translateY('+(1-oBack(e))*30+'px) scale('+(0.9+0.1*oBack(e))+')';
    const nx=document.getElementById('next'); if(nx){const f=seg(t,2.35,2.9); nx.style.opacity=f; nx.style.transform='translateY('+(1-oCub(f))*20+'px)';}}
  // دخول وخروج
  $('fade').style.opacity=intro?(1-oCub(seg(t,0,0.5))):Math.max(1-oCub(seg(t,0,0.4)),ioCub(seg(t,4.3,5.0)));
};
window.renderAt(0);
</script></body></html>`;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const htmlPath = path.join(os.tmpdir(), `eco_${kind}_${fmt}.html`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  const exe = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(fs.existsSync);
  const br = await puppeteer.launch({ executablePath: exe, headless: 'new', args: ['--allow-file-access-from-files', '--disable-web-security', '--hide-scrollbars', '--force-device-scale-factor=1'] });
  const pg = await br.newPage();
  await pg.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await pg.goto(url(htmlPath), { waitUntil: 'load' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.evaluate(() => Promise.all([...document.images].map(i => i.decode().catch(() => { }))));
  const name = `${kind}_${fmt}`;
  if (framesAt) {
    for (const s of framesAt.split(',').map(Number)) {
      await pg.evaluate(t => window.renderAt(t), s);
      const f = path.join(outDir, `${name}_t${s.toFixed(2)}.png`);
      await pg.screenshot({ path: f }); console.log('OK ' + f);
    }
  } else {
    const out = path.join(outDir, `${name}.mp4`);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const N = Math.round(DUR * fps);
    for (let i = 0; i < N; i++) {
      await pg.evaluate(t => window.renderAt(t), i / fps);
      const buf = await pg.screenshot({ type: 'png' });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    console.log('OK ' + out);
  }
  await br.close();
})();
