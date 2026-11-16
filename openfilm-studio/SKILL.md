---
name: "openfilm-studio"
description: "يُستخدم عندما يريد بو ناصر أن يعدّل بيده فيلمًا أو ريلًا مبنيًا بالكود في محرر مرئي (يحرك العناصر ويغيّر النص واللون ويقص على التايملاين)، أو يصدّر التايملاين إلى دافنشي أو بريمير. Use when he says «أبي أعدّل بيدي على الموشن»، «افتحه في محرر»، «OpenFilm»، «Studio»."
---

# OpenFilm Studio

مصدره openfilm/openfilm (رخصة MIT، licenses/openfilm-LICENSE.txt). محرّك فيديو بالكود مثل HyperFrames، لكن معه محرر محلي في المتصفح (Studio) يعدّل فيه بو ناصر بيده، وتُحفظ تعديلاته في ملفات الفيلم فيراها Claude.

## متى يُستخدم ومتى لا
- **يُستخدم** للموشن والشرح بلا تصوير إذا أراد بو ناصر أن يعدّل بيده بعد البناء، أو أراد تصدير التايملاين إلى DaVinci Resolve أو Premiere أو Final Cut.
- **لا يُستخدم** لريل الكلام للكاميرا (video-ad-editor)، ولا حين يكفي motion-video أو hyperframes بلا تعديل يدوي. لا تغيّر المحرك في منتصف ريل.
- قواعد سكل الريل (الألوان المعتمدة، الخطوط، الكابشن، الكفر أول فريم، reel-delivery-checks) تبقى كما هي.

## التركيب (مرة واحدة على جهاز بو ناصر)
- يحتاج Node 22.2 أو أحدث وffmpeg (موجودان).
- `npx skills add openfilm/openfilm` ثم `npx -y openfilm@latest doctor` للتأكد.
- أو تطبيق OpenFilm لسطح المكتب من openfilm.dev (فيه ffmpeg والمتصفح جاهزين).

## الاستخدام
- `npx -y openfilm@latest` يطبع الدليل؛ اقرأ المهارة التي تحتاجها (`openfilm skill edit` أو `media` أو `canvas`).
- الفيلم مجلد فيه `film.html`، وكل لقطة صفحة ترسم أي لحظة بدالة `frame(t)`.
- `openfilm open` يفتح Studio، و`openfilm look` لقطات للفحص، و`openfilm render --loudness=-14` للـMP4.
- ضع المشروع في `C:\Edit with AI\Projects\<اسم الريل>\` مع status.json للوحة reel-control-room.

## العربي
- الدليل لا يذكر العربي. اضبط `dir="rtl"` و`lang="ar"` في كل صفحة فيها نص عربي، واستخدم خطوط البلقن المحلية.
- لا تحرّك الحروف العربية حرفًا حرفًا، ولا تعدّل النص العربي في Studio إلا وتفحص لقطة بعده (`openfilm look`).

## الصوت والوسائط
- مكتبتي أولًا (reel-sound-layer وReal SFX)، ثم مكتبة OpenFilm المجانية (`openfilm get`). لا تربط خدمات مدفوعة بمفاتيح بو ناصر بدون إذنه.
- **لم يُجرّب على جهاز بو ناصر بعد.** أول استخدام: ريل تجريبي 10 ثوانٍ.
