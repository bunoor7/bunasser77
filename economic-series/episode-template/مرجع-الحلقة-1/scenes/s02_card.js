// المشهد 2: المقدمة الجاهزة 8.7–13.7 (تُركَّب فوقه بـffmpeg) ثم بطاقة «الحلقة 01» حتى 18.06
module.exports = {
  span: [8.28, 18.6],
  cssW: () => `
#s2card{left:300px;right:300px;top:215px}
#s2shade{background:radial-gradient(ellipse 60% 55% at 50% 50%,rgba(11,20,34,.6),rgba(11,20,34,0))}
`,
  css: ({ C }) => `
#s2navy{position:absolute;inset:0;background:${C.bg}}
#s2{position:absolute;inset:0}
#s2shade{position:absolute;inset:0;background:radial-gradient(ellipse 80% 40% at 50% 46%,rgba(11,20,34,.6),rgba(11,20,34,0))}
#s2card{position:absolute;left:70px;right:70px;top:600px;text-align:center;transform-origin:50% 40%}
#chipRow{display:inline-flex;align-items:center;gap:20px;margin-bottom:46px}
#chip{font-family:T;font-weight:700;font-size:38px;color:${C.bg};background:${C.acc};padding:10px 28px 12px;border-radius:8px;display:flex;gap:12px;align-items:center}
#cnt{display:inline-block;width:52px;height:46px;overflow:hidden;position:relative;vertical-align:middle}
#cnt div{position:absolute;left:0;right:0;line-height:46px}
#axis{font-size:40px;color:${C.acc}}
#s2t{font-family:T;font-weight:800;font-size:124px;line-height:1.42}
#s2t div{display:block}
#s2rule{height:6px;width:440px;margin:40px auto 34px;border-radius:3px;background:linear-gradient(90deg,transparent,${C.acc} 25%,#F3D58A 60%,${C.acc});transform-origin:100% 50%}
#s2sub{font-size:46px;color:${C.mut}}
`,
  html: () => `<div id="s2navy"></div><div id="s2"><div id="s2shade"></div><div id="s2card">
  <div id="chipRow"><div id="chip">الحلقة <span id="cnt" class="T"><div id="c0">00</div><div id="c1">01</div></span></div><div id="axis">محور الحلقة</div></div>
  <div id="s2t"><div id="s2l1">شنو يعني</div><div id="s2l2" class="gold">اقتصاد؟</div></div>
  <div id="s2rule"></div>
  <div id="s2sub">مدخل إلى علم الاقتصاد</div>
</div></div>`,
  js: () => `(t,on)=>{
  // كحلي تحت المقدمة الجاهزة (تُركَّب فوقه)، ثم البطاقة
  $('s2navy').style.opacity=(t>=8.8&&t<13.7)?1:(t>=13.7?1-seg(t,13.7,14.0):0);
  const s2=$('s2'); if(t<13.7||t>18.6){s2.style.display='none'; return t>=8.4&&t<13.8?{logo:0}:null;} s2.style.display='';
  const e=seg(t,13.7,14.15);
  // ختم: 1.15→1
  const pb=seg(t,18.06,18.5);
  $('s2card').style.transform='scale('+((1.15-0.15*oBack(e,1.4))*(1-0.25*ioCub(pb)))+') translateY('+(-80*ioCub(pb))+'px)';
  s2.style.opacity=seg(t,13.7,13.9)*(1-seg(t,18.15,18.5));
  // سطر العنوان ينكشف بقناع من اليمين عند «الاقتصاد»
  [['s2l1',13.75],['s2l2',13.9]].forEach(([id,a])=>{const k=seg(t,a,a+0.55); $(id).style.clipPath=k>=1?'none':'inset(-40px 0 -60px '+(100-100*oQuint(k))+'%)'; $(id).style.transform='translateY('+(20*(1-oCub(k)))+'px)';});
  // خط ذهبي يرتسم عند «بسيطة»
  const r=seg(t,15.68,16.2); $('s2rule').style.transform='scaleX('+oCub(r)+')'; $('s2rule').style.opacity=r>0?1:0;
  $('s2sub').style.opacity=seg(t,15.9,16.3);
  // العداد 00→01 عند «أول حلقاتها»
  const c=seg(t,17.06,17.4); $('c0').style.transform='translateY('+(-100*oBack(c,1.2))+'%)'; $('c1').style.transform='translateY('+(100-100*oBack(c,1.2))+'%)';
  return {logo:seg(t,13.8,14.2)};
}`,
};
