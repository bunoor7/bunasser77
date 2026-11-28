// المشهد 3: الاختيار 18.06–38.35 (سبورة داكنة + لقطتان في الإطار)
const draw = s => s.replace(/<(path|rect|circle|ellipse)/g, '<$1 pathLength="1"');
module.exports = {
  span: [18.06, 38.5],
  cssW: () => `
#s3b{left:160px;right:160px;top:150px;height:830px}
.cd{top:190px;height:480px;width:400px}
#cdCar{right:330px}#cdPh{left:330px}
#s3q{top:60px}
#s3term{top:260px}
#s3term .w{display:inline-block;margin:0 16px;font-size:150px}
#s3chip{top:auto!important;bottom:100px}
`,
  media: [
    { file: '01-garage-still.png', a: 20.74, b: 22.42, zoom: 0.04, cutOut: true },
    { file: '02-phone-bill.mp4', a: 22.42, b: 24.0, in: 0.6, pos: [55, 50], cut: true },
  ],
  css: ({ C }) => `
#s3{position:absolute;inset:0;display:none}
#s3b{position:absolute;left:7%;right:7%;top:384px;height:1152px;border-radius:32px;background:rgba(22,40,68,.9);border:2px solid rgba(217,164,65,.55);box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden}
#s3note{position:absolute;left:50%;top:50%;width:760px;height:365px;margin:-182px 0 0 -380px;border-radius:14px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.55),0 0 0 3px rgba(217,164,65,.6)}
#s3note img{width:100%;height:100%}
.cd{position:absolute;top:250px;width:380px;height:520px;border-radius:26px;background:rgba(15,27,45,.75);border:2px solid rgba(217,164,65,.35);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px}
.cd .nm{font-size:44px;color:${C.ink}}
.cd .st{position:absolute;bottom:34px;left:0;right:0;text-align:center;font-family:T;font-weight:800;font-size:46px}
#cdCar{right:60px}#cdPh{left:60px}
#stamp{position:absolute;top:150px;left:50%;transform:translateX(-50%) rotate(-10deg);font-family:T;font-weight:900;font-size:64px;color:#9FB0C8;border:5px solid #9FB0C8;border-radius:14px;padding:4px 24px;white-space:nowrap}
#s3q{position:absolute;top:120px;left:0;right:0;text-align:center;font-family:T;font-weight:800;font-size:64px}
#s3term{position:absolute;top:300px;left:0;right:0;text-align:center}
#s3term .sm{font-size:48px;color:${C.mut};margin-bottom:40px}
#s3term .w{display:block;font-family:T;font-weight:900;font-size:140px;line-height:1.35;color:${C.acc};text-shadow:0 10px 40px rgba(0,0,0,.4)}
#s3flash{position:absolute;inset:0;background:#FAF8F5;opacity:0;pointer-events:none}
`,
  html: ({ I, A }) => `<div id="s3"><div id="s3b">
  <div id="s3note"><img src="${A.note}"></div>
  <div class="cd" id="cdCar">${I.car(220)}<div class="nm">تصليح السيارة</div><div class="st" id="stCar"></div><div id="stamp">واقفة</div></div>
  <div class="cd" id="cdPh">${I.phone(200)}<div class="nm">فاتورة التلفون</div><div class="st" id="stPh"></div></div>
  <div id="s3q">مهما كان قرارك</div>
  <div id="s3term"><div class="sm" id="s3sm">مفهوم اقتصادي اسمه</div><span class="w" id="tw1">تكلفة</span><span class="w" id="tw2">الفرصة</span><span class="w" id="tw3">البديلة</span></div>
</div><div id="s3flash"></div></div>`,
  over: ({ C }) => `<div id="s3chip" style="position:absolute;left:0;right:0;top:1290px;text-align:center;display:none"><span id="s3chipT" style="display:inline-block;font-family:T;font-weight:800;font-size:56px;color:${C.bg};background:${C.acc};padding:12px 40px 18px;border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,.45)"></span></div>`,
  js: () => `(t,on)=>{
  const s3=$('s3'), ch=$('s3chip');
  if(t<18.06||t>38.6){s3.style.display='none'; ch.style.display='none'; return null;} s3.style.display='block';
  // Pullback: السبورة تكبر من خلف البطاقة
  const pb=seg(t,18.06,18.6); $('s3b').style.transform='scale('+(0.88+0.12*oCub(pb))+')'; s3.style.opacity=seg(t,18.06,18.35);
  // الورقة: تعود ثم تخرج للأعلى عند «لو»
  const nIn=seg(t,18.3,18.9), nOut=seg(t,20.5,20.8);
  $('s3note').style.opacity=seg(t,18.3,18.5)*(1-nOut);
  $('s3note').style.transform='translateY('+(60*(1-oBack(nIn))-200*ioCub(nOut))+'px) rotate('+(-3+3*oCub(nIn))+'deg) scale('+(1+0.03*Math.sin(Math.PI*seg(t,19.08,19.6)))+')';
  // شارة فوق اللقطات
  let chip=''; if(t>=21.36&&t<22.42)chip='✔ تصليح السيارة'; else if(t>=23.14&&t<24.0)chip='✖ ما تقدر تدفع الفاتورة';
  ch.style.display=chip?'':'none'; if(chip){$('s3chipT').textContent=chip; const a=t<22.42?21.36:23.14; const e=seg(t,a,a+0.35); ch.style.transform='translateY('+(40*(1-oBack(e)))+'px)'; ch.style.opacity=seg(t,a,a+0.15);}
  // البطاقتان 24.04–33
  const cIn=seg(t,24.0,24.45), cOut=seg(t,33.0,33.4);
  ['cdCar','cdPh'].forEach((id,i)=>{const el=$(id); el.style.opacity=seg(t,24.0,24.2)*(1-cOut);});
  // دفعت الفاتورة: التلفون يضيء، والسيارة تبهت وختم «واقفة»
  const ph=seg(t,24.5,24.9), car=seg(t,25.5,25.9), rs=seg(t,27.52,27.9);
  const gain=seg(t,29.12,29.5), lose=seg(t,30.64,31.1);
  const phLit=Math.max(0,ph-rs), carDim=Math.max(0,car-rs);
  const up=oBack(gain), down=oCub(lose);
  $('cdPh').style.transform='translateY('+((1-oBack(cIn))*80-40*up)+'px) scale('+(1+0.05*phLit+0.06*up)+')';
  $('cdPh').style.boxShadow='0 0 '+(70*Math.max(phLit,up))+'px rgba(217,164,65,'+(0.6*Math.max(phLit,up))+')';
  $('cdPh').style.borderColor='rgba(217,164,65,'+(0.35+0.6*Math.max(phLit,up))+')';
  $('cdCar').style.transform='translateY('+((1-oBack(cIn))*80+60*down)+'px) scale('+(1-0.05*down)+')';
  $('cdCar').style.filter='grayscale('+Math.max(carDim,down)+') brightness('+(1-0.45*Math.max(carDim,down))+')';
  const st=seg(t,26.46,26.7); $('stamp').style.opacity=st*(1-rs); $('stamp').style.transform='translateX(-50%) rotate(-10deg) scale('+(1.6-0.6*oBack(st))+')';
  $('stPh').textContent=t>=29.12?'تستفيد':(t>=24.5&&t<27.52?'✔':''); $('stPh').style.color=C.acc; $('stPh').style.opacity=t>=29.12?seg(t,29.12,29.4):ph;
  $('stCar').textContent=t>=30.64?'تتنازل':''; $('stCar').style.color='#9FB0C8'; $('stCar').style.opacity=seg(t,30.64,30.9);
  const q=seg(t,27.52,27.9); $('s3q').style.opacity=q*(1-cOut); $('s3q').style.transform='translateY('+(30*(1-oCub(q)))+'px)';
  // المصطلح: «مفهوم اقتصادي اسمه» ثم ثلاث كلمات تصعد من تحت القناع
  $('s3term').style.opacity=t>=33.3?1:0; $('s3sm').style.opacity=seg(t,34.22,34.6);
  [['tw1',35.74],['tw2',36.7],['tw3',37.22]].forEach(([id,a])=>{const e=seg(t,a,a+0.5); const el=$(id); el.style.opacity=seg(t,a,a+0.2); el.style.transform='translateY('+(60*(1-oQuint(e)))+'px)'; el.style.filter='blur('+(8*(1-e))+'px)';});
  // beat-freeze-cut عند «لحظة»: ومضة بيضاء قصيرة وتجميد
  const fz=seg(t,38.25,38.33); $('s3flash').style.opacity=t<38.25?0:(t<38.33?0.85*fz:0.85*(1-seg(t,38.33,38.5)));
  s3.style.filter=t>=38.25?'grayscale(1) contrast(1.2)':'none';
  return {blur:1, logo:1};
}`,
};
