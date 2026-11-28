// المشهد 7: الأسئلة الثلاثة 101.21–118.82، ثم سبورة التعريف الفاتحة
module.exports = {
  span: [101.1, 119.2],
  cssW: () => `
#s7h{top:130px}
.qc{left:auto;right:auto;width:460px;height:300px;top:470px!important;flex-direction:column;gap:22px}
.qc .q{font-size:72px}
#q1{right:190px}#q2{left:730px}#q3{left:190px}
#s7d{left:160px;right:160px;top:150px;height:830px}
#s7d .t{margin-top:60px;font-size:76px}
#def{margin:50px 80px 0;font-size:62px}
`,
  css: ({ C }) => `
#s7{position:absolute;inset:0;display:none}
#s7h{position:absolute;top:330px;left:40px;right:40px;text-align:center;font-family:T;font-weight:800;font-size:58px}
#s7h b{color:${C.acc};font-weight:900;font-size:90px}
.qc{position:absolute;left:12%;right:12%;height:230px;border-radius:28px;background:rgba(22,40,68,.92);border:2px solid rgba(217,164,65,.6);box-shadow:0 30px 60px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;gap:30px;transform-origin:50% 100%}
.qc .n{width:96px;height:96px;border-radius:50%;background:${C.acc};color:${C.bg};font-family:T;font-weight:900;font-size:56px;display:flex;align-items:center;justify-content:center}
.qc .q{font-family:T;font-weight:900;font-size:84px}
#q1{top:560px}#q2{top:830px}#q3{top:1100px}
#s7d{position:absolute;left:7%;right:7%;top:384px;height:1152px;border-radius:32px;background:${C.ink};color:${C.bg};box-shadow:0 40px 90px rgba(0,0,0,.5);overflow:hidden}
#s7d .edge{height:10px;background:linear-gradient(90deg,${C.acc},#F3D58A,${C.acc})}
#s7d .t{margin-top:90px;text-align:center;font-family:T;font-weight:900;font-size:70px}
#s7d .t span{color:#B7791F}
#s7d .sub{text-align:center;font-size:44px;color:#5B6B82;margin-top:10px}
#def{margin:60px 40px 0;font-family:T;font-weight:700;font-size:52px;line-height:1.85;text-align:center}
#def .k{position:relative;display:inline-block;padding:0 6px}
#def .k::before{content:'';position:absolute;left:0;right:0;bottom:12px;height:40%;background:rgba(217,164,65,.45);border-radius:6px;transform:scaleX(var(--h,0));transform-origin:100% 50%;z-index:-1}
`,
  html: () => {
    const lines = [['شلون', 'نستخدم', 'الموارد', 'المحدودة،'], ['وننتج', 'ونوزّع', 'السلع', 'والخدمات،'], ['عشان', 'نلبّي', 'أكبر', 'قدر', 'ممكن', 'من', 'حاجاتنا']];
    let k = 0; const def = lines.map(l => l.map(w => `<span class="k" data-k="${k++}">${w}</span>`).join(' ')).join('<br>');
    return `<div id="s7">
  <div id="s7h">ومن هني تطلع<br><b>ثلاثة</b> أسئلة أساسية</div>
  <div class="qc" id="q1"><div class="q">شنو ننتج؟</div><div class="n">1</div></div>
  <div class="qc" id="q2"><div class="q">شلون ننتج؟</div><div class="n">2</div></div>
  <div class="qc" id="q3"><div class="q">ولمن ننتج؟</div><div class="n">3</div></div>
  <div id="s7d"><div class="edge"></div><div class="t">هذا هو <span>علم الاقتصاد</span></div><div class="sub">يدرس</div><div id="def">${def}</div></div>
</div>`;
  },
  js: () => `(t,on)=>{
  const s7=$('s7'); if(t<101.2||t>119.2){s7.style.display='none'; return null;} s7.style.display='block';
  const h=seg(t,101.21,101.6); $('s7h').style.opacity=h*(1-seg(t,104.5,104.7)); $('s7h').style.transform='translateY('+(30*(1-oCub(h)))+'px)';
  const n3=seg(t,101.93,102.25); $('s7h').querySelector('b').style.display='inline-block'; $('s7h').querySelector('b').style.transform='scale('+(1+0.25*Math.sin(Math.PI*n3))+')';
  // حواف البطاقات تصعد ثم تنفتح كل واحدة مع سؤالها (card-flip)
  [['q1',104.72],['q2',105.52],['q3',106.82]].forEach(([id,a],i)=>{const pre=seg(t,101.51+i*0.15,101.9+i*0.15), f=seg(t,a,a+0.5);
    const el=$(id); el.style.opacity=Math.max(0.25*pre,f>0?1:0)*(1-seg(t,108.0,108.3));
    el.style.transform='perspective(900px) rotateX('+(f>0?(80-80*oBack(f,1.2)):80)+'deg) translateY('+(40*(1-pre))+'px)';
    el.querySelector('.q').style.opacity=seg(t,a+0.1,a+0.35);});
  // سبورة التعريف تصعد من تحت عند «وهذا بالضبط»
  const d=seg(t,108.14,108.7); $('s7d').style.transform='translateY('+(120*(1-oQuint(d)))+'%)'; $('s7d').style.opacity=d>0?1:0;
  // إضاءة الجملة كلمة كلمة (mk-callout-highlight) على توقيت الصوت
  const at=[110.74,111.64,112.12,112.66,113.3,114.2,114.78,115.18,115.86,116.44,116.86,117.38,117.76,118.1,118.26];
  document.querySelectorAll('#def .k').forEach(k=>{const i=+k.dataset.k; const e=oCub(seg(t,at[i],at[i]+0.3)); k.style.setProperty('--h',e); k.style.color=e>0?'#0F1B2D':'#9AA6B8';});
  // خروج: الانقسام الشعاعي إلى المشهد 8 (transitions-radial)
  const ex=seg(t,118.82,119.15); s7.style.clipPath=ex>0?'circle('+(150*(1-oCub(ex)))+'% at 50% 50%)':'none';
  return {blur:1, logo:1};
}`,
};
