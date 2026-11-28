// المشهد 5: المشكلة الاقتصادية 59.29–81.87 (سبورة داكنة + مونتاج سريع للموارد)
module.exports = {
  span: [59.2, 82.2],
  cssW: () => `
#s5b{left:160px;right:160px;top:150px;height:830px}
#s5q{top:50px}#s5q br{display:none}
#scaleW{top:170px}
#s5title{top:650px}
#res{top:190px;left:140px;right:140px}
#lim{top:430px}
#s5end{top:640px}
`,
  media: [
    { file: '00-note.jpg', a: 74.11, b: 75.53, fit: 'contain', zoom: 0.03, cutOut: true },
    { file: '04-time.mp4', a: 75.53, b: 76.07, in: 3.0, cut: true, cutOut: true },
    { file: '05-land-still.png', a: 76.07, b: 76.83, zoom: 0.03, cut: true, cutOut: true },
    { file: '06-raw-materials.mp4', a: 76.83, b: 77.75, in: 2.0, cut: true },
  ],
  css: ({ C }) => `
#s5{position:absolute;inset:0;display:none}
#s5b{position:absolute;left:7%;right:7%;top:384px;height:1152px;border-radius:32px;background:rgba(22,40,68,.9);border:2px solid rgba(217,164,65,.55);box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden}
#s5q{position:absolute;top:70px;left:30px;right:30px;text-align:center;font-family:T;font-weight:800;font-size:62px;line-height:1.35}
#scaleW{position:absolute;top:300px;left:50%;width:820px;height:520px;margin-left:-410px}
#beam{position:absolute;left:60px;right:60px;top:90px;height:12px;border-radius:6px;background:${C.acc};transform-origin:50% 50%}
#post{position:absolute;left:50%;top:90px;width:12px;height:330px;margin-left:-6px;background:${C.acc};border-radius:6px}
#base{position:absolute;left:50%;top:410px;width:220px;height:14px;margin-left:-110px;background:${C.acc};border-radius:7px}
.pan{position:absolute;top:0;width:300px;height:250px}
.pan .dish{position:absolute;bottom:0;left:0;right:0;height:26px;border-radius:0 0 150px 150px;background:linear-gradient(#F3D58A,${C.acc})}
.pan .lbl{position:absolute;bottom:-62px;left:0;right:0;text-align:center;font-size:40px;color:${C.mut}}
.pan .items{position:absolute;bottom:30px;left:0;right:0;display:flex;flex-wrap:wrap-reverse;justify-content:center;gap:4px}
#panR{right:0}#panL{left:0}
#s5title{position:absolute;top:880px;left:0;right:0;text-align:center;font-family:T;font-weight:900;font-size:76px;color:${C.acc}}
#res{position:absolute;top:300px;left:30px;right:30px;display:flex;justify-content:space-around}
#res .r{display:flex;flex-direction:column;align-items:center;gap:14px;font-size:38px;color:${C.ink}}
#lim{position:absolute;top:640px;left:50%;transform:translateX(-50%) rotate(-6deg);font-family:T;font-weight:900;font-size:96px;color:${C.acc};border:6px solid ${C.acc};border-radius:20px;padding:0 40px 14px}
#s5end{position:absolute;top:900px;left:40px;right:40px;text-align:center;font-family:T;font-weight:800;font-size:58px;line-height:1.4}
`,
  html: ({ I }) => {
    const needs = ['house', 'car', 'phone', 'school', 'bag', 'office', 'house', 'car'].map((k, i) => `<span class="nd" data-i="${i}" style="display:inline-block">${I[k](64)}</span>`).join('');
    return `<div id="s5"><div id="s5b">
  <div id="s5q">زين، ليش من الأساس <br>اضطرينا نختار؟</div>
  <div id="scaleW"><div id="post"></div><div id="base"></div><div id="beam"></div>
    <div class="pan" id="panR"><div class="items">${needs}</div><div class="dish"></div><div class="lbl">حاجاتنا</div></div>
    <div class="pan" id="panL"><div class="items">${I.coins(80)}</div><div class="dish"></div><div class="lbl">اللي عندنا</div></div></div>
  <div id="s5title">المشكلة الاقتصادية</div>
  <div id="res"><div class="r" id="r1">${I.coins(130)}الفلوس</div><div class="r" id="r2">${I.clock(130)}الوقت</div><div class="r" id="r3">${I.land(130)}الأراضي</div><div class="r" id="r4">${I.materials(130)}المواد الخام</div></div>
  <div id="lim">محدودة</div>
  <div id="s5end">ولازم نقرر <span style="color:#D9A441">شلون نستفيد منها</span></div>
</div></div>`;
  },
  js: () => `(t,on)=>{
  const s5=$('s5'); if(t<59.29||t>82.2){s5.style.display='none'; return null;} s5.style.display='block';
  // دخول: البقعة تتسع (dot-wipe من المشهد 4)
  const en=seg(t,59.29,59.75); s5.style.clipPath=en<1?'circle('+(150*oCub(en))+'% at 50% 50%)':'none';
  const q=seg(t,60.27,60.7); $('s5q').style.opacity=q*(1-seg(t,72.4,72.7)); $('s5q').style.transform='translateY('+(30*(1-oCub(q)))+'px)';
  // الميزان: يظهر عند «لأن»، ويميل نحو الحاجات عند «أكثر»
  const sw=seg(t,62.73,63.2), tilt=oElastic(seg(t,64.09,65.2));
  const scW=$('scaleW'); scW.style.opacity=sw*(1-seg(t,72.4,72.7)); scW.style.transform='scale('+(0.85+0.15*oBack(sw))+')';
  const ang=-9*tilt; $('beam').style.transform='rotate('+ang+'deg)';
  const dy=Math.sin(ang*Math.PI/180)*280;
  $('panR').style.transform='translateY('+(-dy)+'px)'; $('panL').style.transform='translateY('+(dy)+'px)';
  // الحاجات تتكاثر عند «حاجاتنا» ثم «ورغباتنا كثيرة»
  document.querySelectorAll('#s5 .nd').forEach(n=>{const i=+n.dataset.i; const a=i<3?63.39+i*0.15:67.33+(i-3)*0.3; const e=seg(t,a,a+0.35); n.style.opacity=seg(t,a,a+0.15); n.style.transform='scale('+(0.4+0.6*oBack(e))+')';});
  const tt=seg(t,66.19,66.7); $('s5title').style.opacity=tt*(1-seg(t,72.4,72.7)); $('s5title').style.transform='scale('+(1.3-0.3*oBack(tt))+')';
  // «لكن الموارد … محدودة»: كفة الموارد تتوهج
  const glow=seg(t,70.05,70.4)*(1-seg(t,72.4,72.7)); $('panL').style.filter='drop-shadow(0 0 '+(30*glow)+'px rgba(243,213,138,.9))';
  // بعد المونتاج: الموارد الأربعة ثم ختم «محدودة»
  const rs=t>=77.75; ['r1','r2','r3','r4'].forEach((id,i)=>{const a=77.75+i*0.12; const e=seg(t,a,a+0.4); $(id).style.opacity=rs?seg(t,a,a+0.2):0; $(id).style.transform='translateY('+(40*(1-oBack(e)))+'px)';});
  const lm=seg(t,79.07,79.3); $('lim').style.opacity=lm; $('lim').style.transform='translateX(-50%) rotate(-6deg) scale('+(1.7-0.7*oBack(lm,2))+')';
  const ed=seg(t,79.59,80.0); $('s5end').style.opacity=ed; $('s5end').style.transform='translateY('+(30*(1-oCub(ed)))+'px)';
  // خروج: match-cut — السبورة تنزلق لليمين
  const ex=seg(t,81.7,82.1); $('s5b').style.transform='translateX('+(-110*ioCub(ex))+'%)';
  return {blur:1, logo:1};
}`,
};
