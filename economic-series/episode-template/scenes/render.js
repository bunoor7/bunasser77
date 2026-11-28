// محرك مشاهد الحلقة 1 — HTML تُرسم بدالة الزمن، ثم ffmpeg. الهوية من ../../../الهوية
// node render.js [--from 0] [--to 18] [--frames 1,4.5] [--out ../render] [--name part]
const fs = require('fs'), path = require('path'), os = require('os');
const { spawn } = require('child_process');
const ID = path.resolve(__dirname, '../../../الهوية');
const puppeteer = require(['C:/Users/bunoo/Videos/Reels/studio/bunasser77/node_modules/puppeteer-core',
  path.join(os.homedir(), 'AppData/Roaming/npm/node_modules/puppeteer-core')].find(fs.existsSync));
const C = JSON.parse(fs.readFileSync(path.join(ID, 'theme.json'), 'utf8'));
const FONTS = path.join(os.homedir(), 'AppData/Local/Microsoft/Windows/Fonts');
const url = p => 'file:///' + p.replace(/\\/g, '/').split('/').map(encodeURIComponent).join('/').replace(/^file:\/\/\/([A-Za-z])%3A/, 'file:///$1:');
const A = {
  coin: url(path.join(ID, 'generated/01_coin_emblem_cut.png')),
  bg: url(path.join(ID, 'generated/03_bg_9x16.png')),
  fT: url(path.join(FONTS, 'Alexandria-VF.ttf')),
  note: url(path.join(__dirname, 'assets/bd20.jpg')),
  fS: url(path.join(FONTS, 'alfont_com_AlFont_com_Swissra-Normal-1.otf')),
};
const SP = ['sponsor_logo.png', 'sponsor.png', 'sponsor.jpg'].map(e => path.join(__dirname, 'assets', e)).find(fs.existsSync); A.sponsor = SP ? url(SP) : '';
const I = require('./icons');
const WIDE = process.argv.includes('--wide');
const W = WIDE ? 1920 : 1080, H = WIDE ? 1080 : 1920;
if (WIDE) A.bg = url(path.join(ID, 'generated/02_bg_16x9.png'));
const words = JSON.parse(fs.readFileSync(path.join(__dirname, '../audio/voice_words.json'), 'utf8')).words;
const scenes0 = fs.readdirSync(__dirname).filter(f => /^s\d+_.*\.js$/.test(f)).sort().map(f => require(path.join(__dirname, f)));
const scenes = scenes0;
const MEDIA = [].concat(...scenes.map(s => s.media || [])).filter(m => fs.existsSync(path.join(__dirname, 'media', m.file)));

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const FROM = +opt('from', 0), TO = +opt('to', 144.5), FPS = +opt('fps', 60);
const OUT = path.resolve(__dirname, opt('out', '../render')), NAME = opt('name', 'scenes'), FRAMES = opt('frames', '');
const ctx = { C, A, I, W, H, words, WIDE };

const html = `<!doctype html><html dir="rtl"><head><meta charset="utf-8"><style>
@font-face{font-family:T;src:url("${A.fT}");font-weight:100 900}
@font-face{font-family:S;src:url("${A.fS}")}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;background:${C.bg};color:${C.ink};font-family:S,T,sans-serif;position:relative}
.abs{position:absolute}.T{font-family:T}.gold{color:${C.acc}}
.center{left:0;right:0;text-align:center}
.board{position:absolute;left:50%;top:50%;width:86%;height:60%;margin-left:-43%;margin-top:-576px;border-radius:32px;box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden}
.board.light{background:${C.ink}}.board.light .edge{height:10px;background:linear-gradient(90deg,${C.acc},#F3D58A,${C.acc})}
.board.dark{background:rgba(22,40,68,.9);border:2px solid rgba(217,164,65,.55)}
#bgw{position:absolute;inset:0;overflow:hidden}
#bg{position:absolute;inset:-2%;background:url('${A.bg}') center/cover}
#blur{position:absolute;inset:-4%;background:url('${A.bg}') center/cover;filter:blur(7px) brightness(.62);opacity:0}
#logo{position:absolute;top:140px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:14px}
#logo img{height:70px;filter:drop-shadow(0 8px 18px rgba(0,0,0,.5))}
#logo div{font-family:T;font-weight:800;font-size:32px}
.mf{position:absolute;inset:0;opacity:0;overflow:hidden}
.mf .bk{position:absolute;inset:-4%;background:url('${A.bg}') center/cover;filter:blur(9px) brightness(.5)}
.mf .box{position:absolute;left:60px;right:60px;top:690px;height:540px;border-radius:24px;padding:10px;background:linear-gradient(135deg,#F3D58A,${C.acc} 45%,#9C6F1E);box-shadow:0 34px 80px rgba(0,0,0,.65)}
.mf .in{position:relative;width:100%;height:100%;border-radius:16px;overflow:hidden;background:#0F1B2D}
.mf video,.mf img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
${scenes.map(s => s.css ? s.css(ctx) : '').join('\n')}
${WIDE ? `#logo{top:46px}#logo img{height:60px}
.mf .box{left:0;right:0;top:0;height:100%;padding:0;border-radius:0;background:#0F1B2D;box-shadow:none}
.mf .in{border-radius:0}
${scenes.map(s => s.cssW ? s.cssW(ctx) : '').join('\n')}` : ''}
</style></head><body>
<div id="bgw"><div id="bg"></div><div id="blur"></div></div>
${scenes.map(s => s.html(ctx)).join('\n')}
${MEDIA.map((m, i) => `<div class="mf" id="mf${i}"><div class="bk"></div><div class="box"><div class="in">${/\.(png|jpe?g)$/i.test(m.file) ? `<img src="${url(path.join(__dirname, 'media', m.file))}"${m.fit ? ` style="object-fit:${m.fit}"` : ''}>` : `<video src="${url(path.join(__dirname, 'media', m.file))}" muted preload="auto" playsinline></video>`}</div></div></div>`).join('\n')}
${scenes.map(s => s.over ? s.over(ctx) : '').join('\n')}
<div id="logo"><img src="${A.coin}"><div>السلسلة الاقتصادية</div></div>
<script>
const C=${JSON.stringify(C)};
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)), seg=(t,a,b)=>cl((t-a)/(b-a));
const oCub=x=>1-Math.pow(1-x,3), oQuint=x=>1-Math.pow(1-x,5), ioCub=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const oBack=(x,s=1.6)=>1+(s+1)*Math.pow(x-1,3)+s*Math.pow(x-1,2);
const oElastic=x=>x===0?0:x===1?1:Math.pow(2,-10*x)*Math.sin((x*10-.75)*2*Math.PI/3)+1;
const $=id=>document.getElementById(id);
const pop=(t,a,d=.45)=>{const e=seg(t,a,a+d);return {o:seg(t,a,a+d*.5),s:.6+.4*oBack(e)};};
const MEDIA=${JSON.stringify(MEDIA)};
const SC=[${scenes.map(s => `{a:${s.span[0]},b:${s.span[1]},f:${s.js(ctx)}}`).join(',')}];
window.renderAt=function(t){
  $('bg').style.transform='scale('+(1.04+0.02*Math.sin(t/9))+') translateY('+(Math.sin(t/7)*6)+'px)';
  let blur=0, logo=1;
  for(const s of SC){ const on=t>=s.a-1.2&&t<s.b+1.2; const r=s.f(t,on); if(r){ if(r.blur!=null)blur=Math.max(blur,r.blur); if(r.logo!=null)logo=Math.min(logo,r.logo);} }
  // الإطار: دخول بقزحية من المركز (ما لم يكن قطعًا من لقطة قبله)، وخروج بتلاشٍ وتصغير
  let mfOn=0;
  MEDIA.forEach((m,i)=>{const el=$('mf'+i); const a=m.a,b=m.b; if(t<a-0.01||t>b+0.35){el.style.opacity=0;el.style.display='none';return;}
    el.style.display=''; const ein=m.cut?1:oQuint(seg(t,a,a+0.45)), eout=m.cutOut?1:1-seg(t,b,b+0.3);
    el.style.opacity=Math.min(m.cut?1:seg(t,a,a+0.15),eout);
    const bx=el.querySelector('.box'); const r=50-50*ein; bx.style.clipPath=m.cut?'none':'inset('+r+'% '+r+'% '+r+'% '+r+'% round 24px)';
    bx.style.transform='scale('+((m.cut?1:1.06-0.06*ein)*(m.cutOut?1:1-0.04*(1-eout)))+')';
    const k=seg(t,a,b);
    const v=el.querySelector('video,img'); v.style.transform='scale('+(1+Math.min(m.zoom||0.04,0.04)*k)+')';
    mfOn=Math.max(mfOn,el.style.opacity*1);});
  blur=Math.max(blur,mfOn);
  $('blur').style.opacity=blur; $('logo').style.opacity=logo;
};
window.prepAt=async function(t){
  const jobs=[]; MEDIA.forEach((m,i)=>{const v=$('mf'+i).querySelector('video,img'); if(v.tagName!=='VIDEO')return; if(t<m.a-0.01||t>m.b+0.35)return;
    const want=Math.min((m.in||0)+(t-m.a)*(m.rate||1), v.duration?v.duration-0.05:1e9);
    if(Math.abs(v.currentTime-want)<0.004)return;
    jobs.push(new Promise(res=>{const done=()=>{v.removeEventListener('seeked',done);res();}; v.addEventListener('seeked',done); v.currentTime=Math.max(0,want); setTimeout(res,3000);}));});
  await Promise.all(jobs);
};
window.renderAt(0);
</script></body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const hp = path.join(os.tmpdir(), 'eco_ep1.html'); fs.writeFileSync(hp, html, 'utf8');
  const exe = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
  const br = await puppeteer.launch({ executablePath: exe, headless: 'new', protocolTimeout: 0, args: ['--allow-file-access-from-files', '--disable-web-security', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] });
  const pg = await br.newPage(); await pg.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  pg.on('pageerror', e => console.error('PAGE', e.message));
  await pg.goto(url(hp), { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
  await pg.evaluate(() => Promise.all([...document.images].map(i => i.decode().catch(() => { }))));
  await pg.evaluate(() => Promise.all([...document.querySelectorAll('video')].map(v => v.readyState >= 1 ? 0 : new Promise(r => { v.onloadedmetadata = r; setTimeout(r, 5000); }))));
  if (FRAMES) {
    for (const s of FRAMES.split(',').map(Number)) { await pg.evaluate(t => prepAt(t), s); await pg.evaluate(t => renderAt(t), s); const f = path.join(OUT, `${NAME}_t${s.toFixed(2)}.png`); await pg.screenshot({ path: f }); console.log('OK ' + f); }
  } else {
    const out = path.join(OUT, `${NAME}.mp4`);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '15', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const n0 = Math.round(FROM * FPS), n1 = Math.round(TO * FPS);
    for (let i = n0; i < n1; i++) { await pg.evaluate(t => prepAt(t), i / FPS); await pg.evaluate(t => renderAt(t), i / FPS); const b = await pg.screenshot({ type: 'png' }); if (!ff.stdin.write(b)) await new Promise(r => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('OK ' + out);
  }
  await br.close();
})();
