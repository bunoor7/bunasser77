// المشهد 8: من يقرر؟ 118.82–136.3 ثم بطاقة الرعاية 136.3–139.5 (خاتمة السلسلة تُركَّب فوقه من 139.5)
module.exports = {
  span: [118.8, 144.5],
  cssW: () => `
#s8q{top:330px}
#venn{top:270px}
#s8a{top:330px}
#tz{top:230px}
#spT{top:120px}
#spB{left:360px;top:250px;width:1200px;height:640px}
#spB .in{flex-direction:row;gap:80px}
#spB .lg{width:440px;height:440px}
#s8chip{top:auto!important;bottom:100px}
`,
  media: [
    { file: '11-market.mp4', a: 122.06, b: 123.84, in: 2.0, pos: [55, 45], cutOut: true },
    { file: '12-government.png', a: 123.84, b: 125.64, pos: [50, 50], zoom: 0.1, cut: true },
  ],
  css: ({ C }) => `
#s8{position:absolute;inset:0;display:none}
#s8q{position:absolute;top:560px;left:40px;right:40px;text-align:center;font-family:T;font-weight:900;font-size:84px;line-height:1.4}
#venn{position:absolute;top:520px;left:50%;width:900px;height:520px;margin-left:-450px}
.vc{position:absolute;top:0;width:500px;height:500px;border-radius:50%;border:5px solid ${C.acc};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;font-family:T;font-weight:800;font-size:50px}
#vR{right:0;background:rgba(217,164,65,.12)}#vL{left:0;background:rgba(37,99,235,.14);border-color:${C.blue}}
#vMid{position:absolute;top:220px;left:50%;transform:translateX(-50%);font-family:T;font-weight:900;font-size:56px;color:#fff;background:${C.acc};color:${C.bg};padding:6px 26px 12px;border-radius:14px}
#s8a{position:absolute;top:500px;left:40px;right:40px;text-align:center}
#s8a .s{font-size:54px;color:${C.mut}}
#s8a .b{font-family:T;font-weight:900;font-size:104px;color:${C.acc};margin-top:20px}
#tz{position:absolute;top:520px;left:60px;right:60px;text-align:center}
#tzChip{display:inline-flex;gap:12px;align-items:center;font-family:T;font-weight:700;font-size:40px;color:${C.bg};background:${C.acc};padding:10px 30px 14px;border-radius:10px}
#tzCnt{display:inline-block;width:56px;height:48px;overflow:hidden;position:relative;vertical-align:middle}
#tzCnt div{position:absolute;left:0;right:0;line-height:48px}
#tzT{font-family:T;font-weight:900;font-size:118px;line-height:1.35;margin-top:40px}
#tzS{font-size:50px;color:${C.mut};margin-top:24px}
#spT{position:absolute;top:400px;left:0;right:0;text-align:center;font-family:T;font-weight:900;font-size:72px;color:${C.acc}}
#spB{position:absolute;left:240px;top:540px;width:600px;height:1066px;border-radius:24px;padding:10px;background:linear-gradient(135deg,#F3D58A,${C.acc} 45%,#9C6F1E);box-shadow:0 34px 80px rgba(0,0,0,.65)}
#spB .in{width:100%;height:100%;border-radius:16px;overflow:hidden;background:radial-gradient(circle at 50% 35%,#1C3355,#0F1B2D 70%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:60px}
#spB .lg{width:430px;height:430px;border-radius:50%;box-shadow:0 0 0 6px rgba(217,164,65,.25),0 30px 70px rgba(0,0,0,.6)}
#spB .ph{font-family:T;font-weight:800;font-size:48px;color:#9AA6B8}
#spH{display:flex;flex-direction:column;align-items:center;gap:22px}
#spH .spIc{display:flex;gap:28px}
#spH .spIc>div{width:86px;height:86px;border-radius:22px;border:3px solid ${C.acc};display:flex;align-items:center;justify-content:center}
#spH .spHd{direction:ltr;font-family:T;font-weight:700;font-size:46px;color:#fff}
`,
  html: ({ I, A }) => `<div id="s8">
  <div id="s8q">لكن من اللي يتخذ<br><span style="color:#D9A441">هالقرارات؟</span></div>
  <div id="venn"><div class="vc" id="vR">${I.market(150)}السوق</div><div class="vc" id="vL">${I.state(150, '#5B8CFF')}الدولة</div><div id="vMid">مشترك؟</div></div>
  <div id="s8a"><div class="s">الإجابة تختلف باختلاف</div><div class="b">النظام الاقتصادي</div></div>
  <div id="tz"><div id="tzChip">الحلقة <span id="tzCnt" class="T"><div id="tc1">01</div><div id="tc2">02</div></span></div>
    <div id="tzT">الأنظمة<br><span style="color:#D9A441">الاقتصادية</span></div><div id="tzS">وشنو الفرق بينها</div></div>
  <div id="spT">هذه الحلقة برعاية</div><div id="spB"><div class="in">${A.sponsor ? `<img class="lg" src="${A.sponsor}">` : `<div class="ph">شعار الراعي</div>`}<div id="spH"><div class="spIc"><div><svg width="50" height="50" viewBox="0 0 24 24" fill="#fff"><path d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9a6.3 6.3 0 1 0 5.3 6.2V8.6a7.4 7.4 0 0 0 4.3 1.4V6.7a4.3 4.3 0 0 1-4.3-4.7z"/></svg></div><div><svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1.1" fill="#fff" stroke="none"/></svg></div></div><div class="spHd">@ghareeb_express</div></div></div></div>
</div>`,
  over: ({ C }) => `<div id="s8chip" style="position:absolute;left:0;right:0;top:1290px;text-align:center;display:none"><span id="s8chipT" style="display:inline-block;font-family:T;font-weight:800;font-size:60px;color:${C.bg};background:${C.acc};padding:12px 44px 18px;border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,.45)"></span></div>`,
  js: () => `(t,on)=>{
  const s8=$('s8'), ch=$('s8chip'); if(t<118.82||t>139.7){s8.style.display='none'; ch.style.display='none'; return t>=139.7?{blur:0,logo:0}:null;} s8.style.display='block';
  const en=seg(t,118.82,119.2); s8.style.clipPath=en<1?'circle('+(150*oCub(en))+'% at 50% 50%)':'none';
  const q=seg(t,119.58,120.0); $('s8q').style.opacity=q*(1-seg(t,121.9,122.06)); $('s8q').style.transform='scale('+(0.9+0.1*oBack(q))+')';
  // الشارات فوق السوق والدولة
  let c=''; if(t>=122.4&&t<123.84)c='السوق؟'; else if(t>=124.32&&t<125.64)c='الدولة؟';
  ch.style.display=c?'':'none'; if(c){$('s8chipT').textContent=c; const a=c==='السوق؟'?122.4:124.32; const e=seg(t,a,a+0.35); ch.style.transform='translateY('+(40*(1-oBack(e)))+'px)'; ch.style.opacity=seg(t,a,a+0.15);}
  // دائرتان تتقاطعان عند «مشترك»
  const v=seg(t,125.64,126.1), m=oCub(seg(t,126.3,126.9)), vo=1-seg(t,127.6,127.9);
  $('venn').style.opacity=v*vo;
  $('vR').style.transform='translateX('+(-0+(-0)*m)+'px) translateX('+(1-m)*120+'px)'; $('vL').style.transform='translateX('+(-(1-m)*120)+'px)';
  $('vR').style.right=(m*0)+'px'; $('vMid').style.opacity=seg(t,126.76,127.0); $('vMid').style.transform='translateX(-50%) scale('+(0.6+0.4*oBack(seg(t,126.76,127.1)))+')';
  // «تختلف باختلاف النظام الاقتصادي»
  const a1=seg(t,127.76,128.1), a2=seg(t,130.52,130.9);
  $('s8a').style.opacity=a1*(1-seg(t,131.2,131.4)); $('s8a').querySelector('.b').style.clipPath=a2>=1?'none':'inset(-30px 0 -50px '+(100-100*oQuint(a2))+'%)';
  // التشويقة: الحلقة 01→02 ثم «الأنظمة الاقتصادية»
  const tz=seg(t,131.4,131.8); $('tz').style.opacity=tz*(1-seg(t,136.0,136.2)); $('tz').style.transform='translateY('+(40*(1-oCub(tz)))+'px)';
  const cc=seg(t,132.04,132.4); $('tc1').style.transform='translateY('+(-100*oBack(cc,1.2))+'%)'; $('tc2').style.transform='translateY('+(100-100*oBack(cc,1.2))+'%)';
  const tt=seg(t,133.74,134.3); $('tzT').style.opacity=tt; $('tzT').style.transform='scale('+(1.15-0.15*oBack(tt))+')';
  $('tzS').style.opacity=seg(t,134.86,135.2);
  // بطاقة الرعاية: العنوان ثم الصندوق الطولي بقزحية من المركز
  const sp=seg(t,136.3,136.7), sb=oQuint(seg(t,136.45,136.95)), so=1-seg(t,139.2,139.5);
  $('spT').style.opacity=sp*so; $('spT').style.transform='translateY('+(30*(1-oCub(sp)))+'px)';
  const r=50-50*sb; const hh=seg(t,136.8,137.1); $('spH').style.opacity=hh; $('spH').style.transform='translateY('+(30*(1-oCub(hh)))+'px)'; $('spB').style.clipPath=sb>=1?'none':'inset('+r+'% '+r+'% '+r+'% '+r+'% round 24px)'; $('spB').style.opacity=(sb>0?1:0)*so; $('spB').style.transform='scale('+(1.06-0.06*sb)+')';
  return {blur:1, logo:1-seg(t,139.2,139.5)};
}`,
};
