/* local-fonts.js — يخدم خطوط السكل المحلية بدل قوقل فونتس (تشتغل بلا إنترنت، وببيئات تحجب قوقل).
   الاستخدام (بعد newPage وقبل goto):  await require('./local-fonts').attach(page);
   كيف: يلتقط بس طلبات css2 من fonts.googleapis.com (CDP Fetch بنمط محدد — بقية الطلبات ما تتأثر ولا تتباطأ)
   وإذا **كل** العائلات المطلوبة موجودة بـmotion/fonts/manifest.json يرد بـCSS فيه الخطوط مدمجة (base64). غيرها يكمل لقوقل زي ما كان.
   القائمة: motion/fonts/manifest.json (من FONT_FILES بـmotion/engine.js). */
const fs = require('fs'), path = require('path');
const FD = path.join(__dirname, '..', 'motion', 'fonts');
let MAN = null; const B64 = {};
function manifest() { if (MAN) return MAN; try { MAN = JSON.parse(fs.readFileSync(path.join(FD, 'manifest.json'), 'utf8')).fonts || {}; } catch (e) { MAN = {}; } return MAN; }
function families(url) { try { return new URL(url).searchParams.getAll('family').map(f => decodeURIComponent(f.split(':')[0]).replace(/\+/g, ' ')); } catch (e) { return []; } }
function cssFor(fams) {
  const man = manifest(); let out = '';
  for (const fam of fams) for (const e of man[fam] || []) {
    const f = path.join(FD, e.file); if (!fs.existsSync(f)) return null;
    const b = B64[e.file] || (B64[e.file] = fs.readFileSync(f).toString('base64'));
    out += `@font-face{font-family:'${fam}';font-style:normal;font-weight:${e.weight};font-display:block;src:url(data:font/ttf;base64,${b}) format('truetype');}\n`;
  } return out;
}
/* يرجّع true لو ركّب الاعتراض */
async function attach(page) {
  try {
    const man = manifest(); if (!Object.keys(man).length) return false;
    const c = await page.createCDPSession();
    await c.send('Fetch.enable', { patterns: [{ urlPattern: 'https://fonts.googleapis.com/*', requestStage: 'Request' }] });
    c.on('Fetch.requestPaused', async ev => {
      try {
        const fams = families(ev.request.url), local = fams.length && fams.every(f => man[f]) ? cssFor(fams) : null;
        if (local) await c.send('Fetch.fulfillRequest', { requestId: ev.requestId, responseCode: 200, responseHeaders: [{ name: 'Content-Type', value: 'text/css; charset=utf-8' }, { name: 'Access-Control-Allow-Origin', value: '*' }], body: Buffer.from(local).toString('base64') });
        else await c.send('Fetch.continueRequest', { requestId: ev.requestId });
      } catch (e) { try { await c.send('Fetch.continueRequest', { requestId: ev.requestId }); } catch (_) {} }
    });
    return true;
  } catch (e) { return false; }   // ما يوقف الرسم أبداً: نرجع لقوقل
}
module.exports = { attach, families, cssFor, manifest };
