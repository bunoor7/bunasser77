# سجل bunasser77

## 1.7.0 (5 نوفمبر 2026)
دمج majed-video 6.3.0 في video-ad-editor (من 6.1.0 عبر 6.2.0 و6.2.1 و6.3.0، بلا تعارض إلا سطرين بفهرس motion-video أُدخلا يدوياً، وكل إضافات بو ناصر باقية)
- جديد من المصدر: إطار ثابت وجدار شرائح 3D وموشن بلير (6.2.0)، دروس ريل «1000$ بيوم» (6.2.1)، «اشرح لي شلون يشتغل» وشعار 3D وفحص وِسبر 02a_whisper_check.py (6.3.0)
- video-ad-editor/scripts/41_logo3d.js سطر local-fonts (إضافة بو ناصر على ملف جديد من المصدر)
- ما زالت سكربتات 27_web_capture و31_device3d و40_capcut و motion/render.js بلا local-fonts كما كانت قبل الدمج
- UPSTREAM_VERSION صار 6.3.0
- لم يُرندر فيلم كامل بعد الدمج، والفحص كان بنيوياً (node --check وpy_compile) فقط

## 1.6.0 (5 نوفمبر 2026)
إضافة بو ناصر من مراجعة خمسة مستودعات فيديو وبي دي إف أدوات المؤثرات (احفظها عند دمج أي تحديث من المصدر)
- video-ad-editor/references/review-tools.md ملف جديد (مراجعة الريل بـclaude-video وffmpeg-skill، مع قواعد العربي والخصوصية)، وسطره في جدول 7.x بـSKILL.md
- video-ad-editor/references/sound-tools.md ملف جديد (تركيب Openverse وReal SFX وEarshot وجدول الاختيار)، وسطره في جدول 7.x بـSKILL.md
- video-ad-editor/scripts/43_tools_check.py صفّان اختياريان (ffmpeg-skill وreal-sfx)
- الأوامر لم تُجرَّب بعد على جهاز بو ناصر، والمصادر مراجَعة من الصفحات المنشورة فقط
- مراجَعة وغير مدمجة: HyperFrames (موجود أصلاً بـhyperframes.md)، OpenMontage (AGPL ويحتاج مفاتيح مدفوعة)، Remotion (بديل HyperFrames)

## 1.5.0 (4 نوفمبر 2026)
ربط الأدوات الخارجية المراجَعة بخط الإنتاج (احفظها عند دمج أي تحديث من المصدر)
- video-ad-editor/scripts/42_ingest_recording.py ملف جديد (استلام تسجيل Cap أو أي مسجّل وتجهيزه، جُرّب بتسجيل تجريبي)
- video-ad-editor/scripts/43_tools_check.py ملف جديد (فحص جاهزية الأدوات والمفاتيح قبل الإنتاج)
- video-ad-editor/scripts/17_gen_scenes.py مزوّد موباي الاختياري (provider وendpoint وMUAPI_KEY)، غير مُجرَّب بمفتاح حقيقي، والمزوّد الافتراضي fal.ai كما هو
- video-ad-editor/references/external-tools.md قسم «ربطها بالمحرّك»، وسطر جدول 7.x بـSKILL.md محدَّث

## 1.4.0 (4 نوفمبر 2026)
إضافة بو ناصر من مراجعة Open-Higgsfield-AI (احفظها عند دمج أي تحديث من المصدر)
- video-ad-editor/references/camera-vocab.md ملف جديد (مفردات الكاميرا والعدسة والبعد البؤري والفتحة لبرومت المشاهد المولّدة)، وسطره في جدول 7.x بـSKILL.md
- video-ad-editor/references/gen-scenes.md القاعدة 8 (وصف الكاميرا من camera-vocab.md)
- video-ad-editor/references/external-tools.md ملف جديد (أدوات مراجَعة وما يدخل المحرّك منها)، وسطره في جدول 7.x بـSKILL.md

## 1.3.0 (28 أكتوبر 2026)
دمج majed-video 6.1.0 في video-ad-editor (من v6.0.1، دمج ثلاثي بلا تعارض، وكل إضافات بو ناصر باقية)
- بنك الستايلات، 17 شكل للفيديو كله: motion/styles.js وmotion/styles/catalog.json وreferences/styles.md، وسطره في SKILL.md
- 35_moves.py plan يختار الستايل (--style auto|none|<id>|<a>+<b>)، ويحفظه بسجل الحركات
- engine.js وengine.html و04_render_frames.js و08_safe_check.js وmoves-compose.js وcompose.REFERENCE.html يدعمون project.style (سطر local-fonts باقي)
- UPSTREAM_VERSION صار 6.1.0

## 1.2.0 (24 أكتوبر 2026)
إضافات بو ناصر من مراجعة بلقن ثاني وسكل كودي انيميشن (احفظها عند دمج أي تحديث من المصدر)
- video-ad-editor/references/teaser-structure.md ملف جديد (هيكل التيزر التشويقي وقواعده)، وسطره في جدول 7.x بـSKILL.md، وسطر بـmontage-video وسطر بـmotion-video
- video-ad-editor/references/timing-qa.md ملف جديد (مدة المشهد على الصوت الفعلي، والفحص الصادق قبل التسليم)، وسطره في جدول 7.x، وسطر بـmontage-video وسطر بـmotion-video

## 1.1.0 (23 أكتوبر 2026)
إضافات بو ناصر من ريموشن (احفظها عند دمج أي تحديث من المصدر، لأنها داخل ملفات المصدر)
- video-ad-editor/motion/moves.js الحركات 101 audioBars و102 cubeTurn و103 starBadge (آخر الملف قبل G.FX)
- video-ad-editor/motion/moves/catalog.json ثلاثة مدخلات جديدة، و previews/101.mp4 و102.mp4 و103.mp4، و CREDITS.md ثلاثة أسطر
- video-ad-editor/references/remotion-toolbox.md ملف جديد، وسطره في جدول 7.x بـSKILL.md، وسطر بـremotion.md، وقسم 3و بـmoves.md

إضافات بو ناصر من قوقل فونتس (14 عائلة عربية، SIL OFL 1.1)
- video-ad-editor/motion/fonts/ تسعة عشر ملف خط جديد، ونصوص رخصها بـLICENSES.txt، وسطورها بـFONT_FILES في motion/engine.js (آخر المصفوفة)
- video-ad-editor/references/fonts.md ورقة العينات fonts-specimen.jpg وسطرها في جدول 7.x
- video-ad-editor/scripts/local-fonts.js ملف جديد، وسطر attach بعد newPage في 04_render_frames.js و08_safe_check.js و16_render_pod.js و23_beatfx_render.js و30_demo.js و13_collage.js و22_hook.py (يخدم الخطوط محلياً بدل قوقل)
- video-ad-editor/motion/fonts/manifest.json (يتولّد من FONT_FILES، عدّل الاثنين مع بعض)

إضافات بو ناصر من ShortGPT (رخصة MIT، فكرتين بس)
- video-ad-editor/references/dubbing.md ملف جديد (دبلجة بكتل كلام تنضغط لوقتها)، وسطره في جدول 7.x
- video-ad-editor/references/find-shots.md قسم «خطة لقطات كاملة من كلامه»، وسطر الجدول صار يذكره

## 1.0.0 (21 أكتوبر 2026)
المصادر المدموجة
- majed-video 6.0.1 (video-ad-editor, motion-video, podcast-video, montage-video, thumbnail-video) رخصة MIT
- majed-davinci 1.0.0 (davinci-video) رخصة MIT
- majed-live-stage 1.2.0 (live-stage-deck وملفات الصفحة في live-stage-deck/app) رخصة MIT
- مهارات بو ناصر: davinci-learn-from-edits, instagram-reels-agent

إضافات بو ناصر (احفظها عند دمج أي تحديث من المصدر)
- video-ad-editor/references/overhead-screen.md وسطره في جدول 7.x، وعبارات التشغيل في وصف video-ad-editor
- المهارة الرئيسية bunasser77/SKILL.md
- video-ad-editor/references/hyperframes.md وسطره في video-ad-editor و motion-video (مشاهد HyperFrames الجاهزة والرندر بالسحابة)

تعديلات الدمج
- davinci-video/find_engine.sh يبحث عن المحرّك جنبه أولاً
- video-ad-editor/scripts/00_setup.sh التحديث التلقائي مقفول، تنبيه فقط (UPSTREAM_VERSION)
- live-stage-deck مسارات الصفحة صارت app/
- أسماء المهارات majed-video: و majed-davinci: صارت bunasser77:
