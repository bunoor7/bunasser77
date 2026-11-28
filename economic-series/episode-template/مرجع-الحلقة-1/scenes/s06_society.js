// المشهد 6: من الفرد إلى المجتمع 81.87–101.21
module.exports = {
  span: [81.7, 101.6],
  cssW: () => `
#s6b{left:160px;right:160px;top:150px;height:830px}
#who{top:150px;left:220px;right:220px}
#s6t{top:520px}
#bud{top:90px}
#bar,#barL{width:1000px}
#prio{margin-top:70px}
#s6chips{top:auto!important;bottom:100px}
`,
  media: [
    { file: '07-factory.mp4', a: 87.29, b: 93.3, in: 1.0, pos: [40, 60] },
    { file: '08-school.mp4', a: 97.17, b: 98.45, in: 3.0, pos: [50, 50], cutOut: true },
    { file: '09-housing.png', a: 98.45, b: 99.29, pos: [45, 60], zoom: 0.1, cut: true, cutOut: true },
    { file: '10-roads.mp4', a: 99.29, b: 101.05, in: 4.0, pos: [30, 40], cut: true },
  ],
  css: ({ C }) => `
#s6{position:absolute;inset:0;display:none}
#s6b{position:absolute;left:7%;right:7%;top:384px;height:1152px;border-radius:32px;background:rgba(22,40,68,.9);border:2px solid rgba(217,164,65,.55);box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden}
#who{position:absolute;top:220px;left:20px;right:20px;display:flex;justify-content:space-around;align-items:flex-end}
#who .w{display:flex;flex-direction:column;align-items:center;gap:20px;font-family:T;font-weight:800;font-size:46px}
#s6t{position:absolute;top:740px;left:40px;right:40px;text-align:center;font-family:T;font-weight:800;font-size:56px;line-height:1.45}
#bud{position:absolute;top:120px;left:40px;right:40px;text-align:center}
#bud .h{font-family:T;font-weight:900;font-size:72px}
#bar{position:relative;margin:70px auto 0;width:740px;height:110px;border-radius:20px;overflow:hidden;background:rgba(255,255,255,.08)}
#bar i{position:absolute;top:0;bottom:0;background:linear-gradient(#F3D58A,${C.acc})}
#bar i:nth-child(2){background:linear-gradient(#5B8CFF,${C.blue})}
#bar i:nth-child(3){background:linear-gradient(#C9D4E3,#9FB0C8)}
#barL{display:flex;justify-content:space-between;width:740px;margin:26px auto 0;font-size:42px;color:${C.mut}}
#prio{margin-top:90px;font-family:T;font-weight:800;font-size:60px;color:${C.acc}}
`,
  html: ({ I }) => `<div id="s6"><div id="s6b">
  <div id="who"><div class="w" id="w1">${I.person(190)}أنت</div><div class="w" id="w2">${I.factory(190)}الشركات</div><div class="w" id="w3">${I.state(190)}الدول</div></div>
  <div id="s6t">نفس المشكلة<br><span style="color:#D9A441">في كل مكان</span></div>
  <div id="bud"><div class="h">الدولة عندها <span style="color:#D9A441">ميزانية</span></div>
    <div id="bar"><i></i><i></i><i></i></div><div id="barL"><span>مدارس؟</span><span>بيوت؟</span><span>شوارع؟</span></div>
    <div id="prio">لازم تحدد أولوياتها</div></div>
</div></div>`,
  over: ({ C }) => `<div id="s6chips" style="position:absolute;left:0;right:0;top:1290px;display:none;justify-content:center;gap:18px;flex-wrap:wrap;padding:0 80px">
  ${['مواد', 'عمال', 'معدات', 'شنو يصنع؟', 'شلون يصنعه؟', 'مدارس؟', 'بيوت؟', 'شوارع؟'].map((x, i) => `<span class="s6c" data-i="${i}" style="display:none;font-family:T;font-weight:800;font-size:52px;color:${C.bg};background:${C.acc};padding:10px 32px 16px;border-radius:16px;box-shadow:0 14px 34px rgba(0,0,0,.45)">${x}</span>`).join('')}</div>`,
  js: () => `(t,on)=>{
  const s6=$('s6'), cw=$('s6chips'); if(t<81.75||t>101.6){s6.style.display='none'; cw.style.display='none'; return null;} s6.style.display='block';
  // match-cut: السبورة تدخل من اليسار
  const en=seg(t,81.75,82.2); $('s6b').style.transform='translateX('+(110*(1-ioCub(en)))+'%)';
  // أنت ← الشركات ← الدول
  [['w1',81.87],['w2',85.07],['w3',86.05]].forEach(([id,a])=>{const e=seg(t,a,a+0.45); $(id).style.opacity=seg(t,a,a+0.2); $(id).style.transform='translateY('+(60*(1-oBack(e)))+'px)';});
  const st=seg(t,86.51,86.9); $('s6t').style.opacity=st; $('who').style.opacity=1-seg(t,93.2,93.4); $('s6t').style.visibility=t<93.3?'visible':'hidden';
  // الميزانية
  const bd=seg(t,93.37,93.8); $('bud').style.opacity=bd*(1-seg(t,97.0,97.2)); $('bud').style.transform='translateY('+(40*(1-oCub(bd)))+'px)';
  const fill=oCub(seg(t,94.75,95.4)), split=oCub(seg(t,96.05,96.6));
  const segs=[[0,0.34],[0.34,0.67],[0.67,1]]; document.querySelectorAll('#bar i').forEach((b,i)=>{const [a,z]=segs[i]; const L=split>0?a:0, R=split>0?z:1;
    b.style.right=(100*L)+'%'; b.style.width=(100*(R-L)*fill)+'%'; b.style.opacity=i===0?1:split; b.style.marginRight=(split*8*i)+'px';});
  $('barL').style.opacity=split; $('prio').style.opacity=seg(t,96.49,96.8);
  // الشارات فوق اللقطات
  const sch=[[88.73,93.3],[89.25,93.3],[89.81,93.3],[91.63,93.3],[92.37,93.3],[97.17,98.45],[98.45,99.29],[99.29,101.05]];
  let any=false; document.querySelectorAll('.s6c').forEach(c=>{const i=+c.dataset.i; let [a,b]=sch[i]; if(i<3&&t>=91.63)b=91.63; const v=t>=a&&t<b; c.style.display=v?'inline-block':'none'; if(v){any=true; const e=seg(t,a,a+0.35); c.style.transform='translateY('+(40*(1-oBack(e)))+'px)'; c.style.opacity=seg(t,a,a+0.15);}});
  cw.style.display=any?'flex':'none';
  return {blur:1, logo:1};
}`,
};
