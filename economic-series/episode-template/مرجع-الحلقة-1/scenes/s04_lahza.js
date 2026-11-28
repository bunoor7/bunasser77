// المشهد 4: «لحظة! شنو يعني؟» 38.35–59.29 (سبورة فاتحة، والموسيقى مقطوعة)
const draw = s => s.replace(/<(path|rect|circle|ellipse)/g, '<$1 pathLength="1"');
module.exports = {
  span: [38.3, 59.6],
  cssW: () => `
#s4b{left:160px;right:160px;top:150px;height:830px}
#lz{top:50px}
#s4t{top:170px}#s4t .a,#s4t .b{display:inline-block;margin:0 12px}#s4t .a{font-size:56px}
.col{top:300px;height:400px;width:540px;padding-top:28px;gap:12px}
#colR{right:180px}#colL{left:180px}
#s4car svg{width:150px;height:150px}
#colL>svg{width:100px;height:100px}
#lostLab{bottom:14px}
#eqT{bottom:28px}
#s4chips{top:auto!important;bottom:100px}
`,
  media: [
    { file: '03-morning-drive.mp4', a: 44.27, b: 47.85, in: 0.5, pos: [35, 62] },
  ],
  css: ({ C }) => `
#s4{position:absolute;inset:0;display:none}
#s4b{position:absolute;left:7%;right:7%;top:384px;height:1152px;border-radius:32px;background:${C.ink};box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden;color:${C.bg}}
#s4b .edge{height:10px;background:linear-gradient(90deg,${C.acc},#F3D58A,${C.acc})}
#lz{position:absolute;top:70px;left:50%;transform:translateX(-50%);font-family:T;font-weight:900;font-size:62px;color:#fff;background:${C.blue};padding:8px 36px 16px;border-radius:14px;box-shadow:0 14px 30px rgba(37,99,235,.35)}
#s4t{position:absolute;top:200px;left:30px;right:30px;text-align:center}
#s4t .a{font-size:46px;color:#5B6B82}
#s4t .b{font-family:T;font-weight:900;font-size:72px;line-height:1.3;color:${C.bg}}
.col{position:absolute;top:455px;width:400px;height:500px;border-radius:24px;display:flex;flex-direction:column;align-items:center;padding-top:40px;gap:18px}
#colR{right:40px;background:#EFEAE1}
#colL{left:40px;background:#EFEAE1;border:4px dashed transparent}
.col .h{font-family:T;font-weight:800;font-size:40px;text-align:center;line-height:1.3}
.col .tags{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.col .tg{font-size:36px;background:${C.bg};color:${C.ink};padding:6px 20px 12px;border-radius:12px}
#lostLab{position:absolute;bottom:22px;left:0;right:0;text-align:center;font-family:T;font-weight:800;font-size:38px;color:#B7791F}
#eqT{position:absolute;bottom:55px;left:0;right:0;text-align:center;font-family:T;font-weight:900;font-size:58px;color:${C.bg}}
#eqT span{color:#B7791F}
#sig{display:flex;gap:10px;align-items:flex-end;height:70px}
#sig i{display:block;width:22px;border-radius:6px;background:${C.bg}}
`,
  html: ({ I }) => `<div id="s4"><div id="s4b"><div class="edge"></div>
  <div id="lz">لحظة!</div>
  <div id="s4t"><div class="a" id="s4ta">شنو يعني</div><div class="b" id="s4tb">تكلفة الفرصة البديلة؟</div></div>
  <div class="col" id="colR"><div class="h">قررت تصلّح السيارة</div><div id="s4car">${draw(I.car(200, '#0F1B2D', 5))}</div>
    <div class="tags"><span class="tg" id="tg1">الدوام</span><span class="tg" id="tg2">المشاوير</span></div></div>
  <div class="col" id="colL"><div class="h">لو دفعت الفاتورة</div>${I.phone(120, '#0F1B2D', 5)}
    <div id="sig"><i style="height:18px"></i><i style="height:34px"></i><i style="height:52px"></i><i style="height:70px"></i></div>
    <div class="h" id="onT" style="font-size:36px">الخط يتم شغّال ✔</div><div id="lostLab">الفايدة اللي طوّفتها</div></div>
  <div id="eqT">= <span>تكلفة الفرصة البديلة</span></div>
</div></div>`,
  over: ({ C }) => `<div id="s4chips" style="position:absolute;left:0;right:0;top:1290px;display:none;justify-content:center;gap:24px">
  <span id="s4c1" style="font-family:T;font-weight:800;font-size:54px;color:${C.bg};background:${C.acc};padding:10px 36px 16px;border-radius:16px">الدوام</span>
  <span id="s4c2" style="font-family:T;font-weight:800;font-size:54px;color:${C.bg};background:${C.acc};padding:10px 36px 16px;border-radius:16px">المشاوير</span></div>`,
  js: () => `(t,on)=>{
  const s4=$('s4'), chs=$('s4chips');
  if(t<38.33||t>59.6){s4.style.display='none'; chs.style.display='none'; return null;} s4.style.display='block';
  // السبورة الفاتحة تنبثق، وشارة «لحظة!» تُصفع
  const bi=seg(t,38.33,38.75); $('s4b').style.transform='scale('+(0.9+0.1*oBack(bi,1.3))+')'; s4.style.opacity=seg(t,38.33,38.45);
  const lz=seg(t,38.35,38.6); $('lz').style.transform='translateX(-50%) scale('+(1.8-0.8*oBack(lz,2))+') rotate('+(-6+6*oCub(lz))+'deg)'; $('lz').style.opacity=seg(t,38.35,38.42);
  $('s4ta').style.opacity=seg(t,38.85,39.1);
  const tb=seg(t,39.83,40.4); $('s4tb').style.clipPath=tb>=1?'none':'inset(-30px 0 -50px '+(100-100*oQuint(tb))+'%)';
  // المثال: عمود السيارة (اليمين) ثم عمود الفاتورة (اليسار)
  const r=seg(t,41.69,42.1); $('colR').style.opacity=r; $('colR').style.transform='translateY('+(50*(1-oBack(r)))+'px)';
  const dc=1-oCub(seg(t,43.27,44.0)); document.querySelectorAll('#s4car *').forEach(e=>{e.style.strokeDasharray='1 1';e.style.strokeDashoffset=dc;});
  [['tg1',46.27],['tg2',47.29]].forEach(([id,a])=>{const e=seg(t,a,a+0.35); $(id).style.opacity=seg(t,a,a+0.15); $(id).style.transform='scale('+(0.6+0.4*oBack(e))+')';});
  // شارات فوق لقطة الشارع
  chs.style.display=(t>=44.27&&t<47.85)?'flex':'none';
  [['s4c1',46.27],['s4c2',47.29]].forEach(([id,a])=>{const e=seg(t,a,a+0.35); $(id).style.opacity=seg(t,a,a+0.15); $(id).style.transform='translateY('+(40*(1-oBack(e)))+'px)';});
  const l=seg(t,47.87,48.3); $('colL').style.opacity=l; $('colL').style.transform='translateY('+(50*(1-oBack(l)))+'px)';
  document.querySelectorAll('#sig i').forEach((b,i)=>{b.style.opacity=0.2+0.8*seg(t,52.41+i*0.12,52.55+i*0.12);});
  $('onT').style.opacity=seg(t,53.25,53.5);
  // «هالفايدة اللي طوّفتها»: العمود يصير شبحًا بإطار متقطع
  const g=seg(t,54.01,54.6);
  $('colL').style.background='rgba(239,234,225,'+(1-0.75*g)+')'; $('colL').style.borderColor='rgba(183,121,31,'+g+')';
  [...$('colL').children].forEach(c=>{if(c.id!=='lostLab')c.style.opacity=(c.id==='onT'?seg(t,53.25,53.5):1)*(1-0.6*g);});
  $('lostLab').style.opacity=seg(t,54.99,55.3);
  // «هي تكلفة الفرصة البديلة»: معادلة وختم على «البديلة»
  const eq=seg(t,57.23,57.6), stp=seg(t,58.81,59.0);
  $('eqT').style.opacity=eq; $('eqT').style.transform='translateY('+(30*(1-oCub(eq)))+'px) scale('+(1+0.12*Math.sin(Math.PI*stp))+')';
  // خروج: بقعة تتسع (dot-wipe) إلى المشهد 5
  const ex=seg(t,59.29,59.6); s4.style.clipPath=ex>0?'circle('+(150*(1-ex))+'% at 50% 50%)':'none';
  return {blur:1, logo:1};
}`,
};
