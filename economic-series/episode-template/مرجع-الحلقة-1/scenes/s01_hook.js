// المشهد 1: الهوك 0–8.3 (خطة motion_plan.md)
const draw = s => s.replace(/<(path|rect|circle|ellipse)/g, '<$1 pathLength="1"');
module.exports = {
  span: [0, 8.8],
  cssW: () => `
#s1title{top:120px;font-size:92px}
#s1grp{top:250px;height:600px}
#icCar{right:420px;top:230px}#icPhone{left:420px;top:230px}
#arrR{right:660px!important;top:250px}#arrL{left:660px!important;top:250px}
#flow{display:none}
#ask{top:800px;font-size:140px}
`,
  css: ({ C }) => `
#s1{position:absolute;inset:0}
#s1title{position:absolute;top:290px;left:0;right:0;text-align:center;font-family:T;font-weight:800;font-size:96px;line-height:1.3}
#s1title span{color:${C.acc}}
#s1grp{position:absolute;left:0;right:0;top:600px;height:700px;transform-origin:50% 15%}
.ic{position:absolute;width:240px;height:240px}
.ic .ghost{position:absolute;inset:0;opacity:.3}
.ic .ink{position:absolute;inset:0}
.ic .ink path,.ic .ink rect,.ic .ink circle,.ic .ink ellipse{stroke-dasharray:1 1}
.ic .lab{position:absolute;top:252px;left:-40px;right:-40px;text-align:center;font-size:40px;color:${C.mut}}
#icCar{right:110px;top:410px}#icPhone{left:110px;top:410px}
#wrench{position:absolute;right:10px;top:-20px;width:100px;height:100px;transform-origin:50% 50%}
#billw{position:absolute;left:150px;top:40px;width:105px;height:105px;overflow:hidden}
#bill{position:absolute;inset:0}
#note{position:absolute;left:50%;top:0;width:620px;height:298px;margin-left:-310px;border-radius:14px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.55),0 0 0 3px rgba(217,164,65,.55)}
#note img{width:100%;height:100%;display:block}
#flow{position:absolute;inset:0;overflow:visible}
#ask{position:absolute;top:1330px;left:0;right:0;text-align:center;font-family:T;font-weight:900;font-size:150px;line-height:1.2;text-shadow:0 8px 34px rgba(5,10,20,.9)}
#ask span{display:inline-block}
#lk,#fl,#wp,#band{position:absolute;inset:0;pointer-events:none;opacity:0}
#lk,#fl,#band{mix-blend-mode:screen}
#wp{background:#0F1B2D}
.arr{position:absolute;top:330px;font-size:80px;color:${C.acc};font-family:T;font-weight:900}
`,
  html: ({ I, A }) => `<div id="s1">
  <div id="s1title">شنو يعني <span>اقتصاد؟</span></div>
  <div id="s1grp">
    <div class="ic" id="icCar"><div class="ghost">${I.car(240)}</div><div class="ink" id="carInk">${draw(I.car(240))}</div>
      <div id="wrench">${I.wrench(100, '#F3D58A', 6)}</div><div class="lab">تصليح السيارة</div></div>
    <div class="ic" id="icPhone"><div class="ghost">${I.phone(240)}</div><div class="ink" id="phInk">${draw(I.phone(240))}</div>
      <div id="billw"><div id="bill">${I.bill(105, '#F3D58A', 6)}</div></div><div class="lab">فاتورة التلفون</div></div>
    <svg id="flow" viewBox="0 0 1080 620"><path id="flowP" d="M300 300 Q220 360 250 450" fill="none" stroke="#F3D58A" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 16" pathLength="300"/></svg>
    <div class="arr" id="arrR" style="right:250px">↘</div><div class="arr" id="arrL" style="left:250px">↙</div>
    <div id="note"><img src="${A.note}"></div>
  </div>
  <div id="ask"><span id="ask1">شتسوي</span><span id="askQ">؟</span></div>
  <div id="lk"></div><div id="fl"></div><div id="wp"></div><div id="band"></div>
</div>`,
  js: () => `(t,on)=>{
  const s1=$('s1'); if(!on){s1.style.display='none';return;} s1.style.display='';
  // دفع بطيء على المجموعة 1.00→1.10، ثم Zoom-through عند 8.28
  // انتقال: تسرّب ضوء ذهبي (light-leak من hyperframes-registry) + مسحة لمعان (shimmer-sweep) من اليمين لليسار
  $('s1grp').style.transform='scale('+(1+0.10*seg(t,0,8.28))+')';
  s1.style.transform='none'; s1.style.opacity=1;
  const P=seg(t,8.24,8.8), pe=P<.5?2*P*P:1-Math.pow(-2*P+2,2)/2;
  // light-leak: مصدر خارج الإطار أعلى اليمين، شدة exp(-d*1.8)*p*4 ولون دافئ بذهبي السلسلة
  const lk=Math.min(1,pe*4);
  $('lk').style.opacity=P>0&&P<1?lk*(1-seg(t,8.62,8.8)):0;
  $('lk').style.background='radial-gradient(circle at 112% -8%,rgba(255,244,214,1) 0%,rgba(243,213,138,.95) 14%,rgba(217,164,65,.65) 32%,rgba(185,133,38,.25) 55%,rgba(0,0,0,0) 78%)';
  $('fl').style.opacity=P>0&&P<1?lk*0.55*(1-seg(t,8.6,8.8)):0;
  $('fl').style.background='linear-gradient(163deg,rgba(0,0,0,0) 30%,rgba(255,236,190,.0) 41%,rgba(255,236,190,.85) 43.5%,rgba(255,236,190,0) 46%,rgba(0,0,0,0) 60%)';
  // shimmer-sweep: الموضع من 115% إلى -15%، والكحلي يغطي يمين المسحة
  const pos=115-130*pe;
  $('wp').style.opacity=P>0?1:0;
  const m='linear-gradient(100deg,rgba(0,0,0,0) '+(pos-7)+'%,#000 '+(pos+7)+'%)';
  $('wp').style.webkitMaskImage=m; $('wp').style.maskImage=m;
  $('band').style.opacity=P>0&&P<1?1:0;
  $('band').style.background='linear-gradient(100deg,rgba(0,0,0,0) '+(pos-9)+'%,rgba(217,164,65,.55) '+(pos-3)+'%,rgba(255,246,222,.95) '+pos+'%,rgba(243,213,138,.6) '+(pos+3)+'%,rgba(0,0,0,0) '+(pos+8)+'%)';
  // 20 تنبض
  const p=seg(t,0.28,0.75); const np=1+0.06*Math.sin(Math.PI*p);
  // رسم الأيقونات
  const dc=1-oCub(seg(t,1.12,1.9)), dp=1-oCub(seg(t,3.78,4.5));
  document.querySelectorAll('#carInk *').forEach(e=>e.style.strokeDashoffset=dc);
  document.querySelectorAll('#phInk *').forEach(e=>e.style.strokeDashoffset=dp);
  // مفتاح الربط: دورة وشدّ واستقرار
  const w=seg(t,2.5,3.3); $('wrench').style.opacity=seg(t,2.4,2.6);
  $('wrench').style.transform='rotate('+(-360*(1-oBack(w,1.2)))+'deg) scale('+(0.6+0.4*oBack(seg(t,2.4,2.8)))+')';
  // الفاتورة تنزلق من الجوال
  const b=seg(t,3.06,3.6); $('bill').style.transform='translateY('+(100*(1-oBack(b,1.3)))+'%)';
  // خط الدفع المنقط من الورقة إلى الفاتورة
  const f=seg(t,4.72,5.4); $('flowP').style.opacity=f>0?1-seg(t,6.3,6.6)*0.6:0;
  $('flowP').style.strokeDashoffset=-60*t; $('flowP').style.clipPath='inset(0 0 0 0)';
  $('flowP').setAttribute('stroke-dasharray', (2)+' 16'); $('flowP').style.strokeOpacity=oCub(f);
  // هزة الورقة عند «يكفي» ثم سهمان عند «الاثنين»
  const sh=seg(t,6.44,6.89); $('note').style.transform='translateX('+(Math.sin(sh*Math.PI*7)*10*(1-sh))+'px) scale('+np+')';
  const a=seg(t,6.8,7.1), af=a>0?(1-seg(t,7.3,7.6)):0;
  ['arrR','arrL'].forEach((id,i)=>{$(id).style.opacity=af*oCub(a); $(id).style.transform='translateX('+((i?1:-1)*20*oCub(a))+'px)';});
  const dim=1-0.4*seg(t,6.8,7.1); $('icCar').style.opacity=dim; $('icPhone').style.opacity=dim; document.querySelectorAll('#s1 .lab').forEach(e=>e.style.opacity=1-seg(t,7.1,7.3));
  // شتسوي؟
  const k=seg(t,7.28,7.7); $('ask1').style.opacity=seg(t,7.28,7.45); $('ask1').style.transform='scale('+(0.7+0.3*oBack(k))+')';
  const q=seg(t,7.84,8.15); $('askQ').style.opacity=q>0?1:0; $('askQ').style.transform='translateY('+(-60*(1-oBack(q,2)))+'px) scale('+(1.2-0.2*oCub(q))+')';
  return {logo:1-seg(t,8.45,8.7)};
}`,
};
