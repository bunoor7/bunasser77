# سجل bunasser77

## 1.41.0 (16 نوفمبر 2026)
- openfilm-studio جديد من openfilm/openfilm (MIT، رابط شاركه بو ناصر): محرر مرئي محلي للأفلام المبنية بالكود، وتصدير التايملاين لدافنشي. يُستخدم فقط عند طلب التعديل اليدوي. لم يُجرّب على جهازه بعد
- bunasser77/SKILL.md: سطر توجيه

## reel-control-room 0.1.0 (16 نوفمبر 2026)
- mods/reel-control-room جديد (طلب بو ناصر): Mod مستقل في نفس السوق. لوحة جانبية تعرض مراحل الريل الحالي (السكربت، المونتاج، الصوت، الكفر، التسليم) من `C:\Edit with AI\Projects\<اسم الريل>\status.json`، بأربع حالات: لم يبدأ، قيد العمل، بانتظار قراري، جاهز. فيه تنبيه داخلي مرة واحدة عند اكتمال مرحلة أو احتياجها قرار، ووضع هدوء، وحالة فارغة واضحة، ورسالة للملف الفارغ أو التالف. محلي بالكامل: لا موديل، ولا شبكة، ولا عمليات. مكتوب على أنواع API لإصدار 2.1.323، ونجحت اختباراته الثمانية

## 1.40.0 (16 نوفمبر 2026)
- antialgorithm جديد من mankidev/antialgorithm (MIT، رابط شاركه بو ناصر): يجبر على تسمية الخيار الافتراضي ثم الابتعاد عنه بسبب من الموضوع. سكربتات seed وrough وcheck كما هي. قواعد بو ناصر فوقه: الألوان المعتمدة ثابتة، لا rough.py على العربي، المنطقة الخليج
- bunasser77/SKILL.md: سطر توجيه

## 1.39.0 (15 نوفمبر 2026)
- bunasser77/SKILL.md: «الخطوة صفر» جديدة بأول البلقن (طلب بو ناصر). قبل أي عمل يقسّم الطلب ويوزّعه على النماذج، Haiku للشغل الآلي وSonnet للبحث والمتصفح والأساسي للقرار والعربي، ويكتب الخطة بسطر. وإذا العمل كله خفيف يقترح فتحه بنموذج أرخص، ولا يقترح Fable للتوفير

## 1.38.0 (15 نوفمبر 2026)
- video-ad-editor: الخطوة 4.2 جديدة. Cohere Transcribe Arabic (مفتوح المصدر Apache 2.0، مجاني ومحلي) يعطي النص المرجعي الأدق بالعامية الخليجية وخلط الإنجليزي، ووِسبر يبقى لتوقيت الكلمات
- scripts/02d_cohere_transcribe.py جديد: يفرّغ a.wav بقطع 25 ثانية ويتخطى الصامت، ويكتب cohere.txt

## 1.37.0 (15 نوفمبر 2026)
- continuous-camera-motion-reel جديد: من برومبت «موشن فايبل 5.2» لعبدالله الفارس (ملف شاركه بو ناصر، مع ذكر المصدر). فيلم موشن بالكود بلقطة كاميرا وحدة متصلة بلا قطع، كل مشهد مثبّت على سطر SRT، وثماني تقنيات مشاهد، وتكييف 9:16 وألوان بو ناصر
- bunasser77/SKILL.md وREADME.md: سطر توجيه في مجموعة الموشن

## 1.36.0 (13 نوفمبر 2026)
- motion-prompt-library: مجموعة Claude animations (ملف شاركه بو ناصر). **47 أنيميشن مبنية بالكود**: كل واحد في مجلد animations/NN-الاسم/index.html (ملف HTML واحد، canvas 2D بلا مكتبات، الفريم يعتمد على t وحده). الفهرس animations/INDEX.md فيه لكل واحد النوع وفي أي لقطة ينفع ومع شنو يُركَّب وهل يصلح للعربي
- animations/_build: المصادر القابلة للتعديل (src) والأساس المشترك (harness وlib-tex وlib-solid وlib-phone) وbuild.js وcheck.js وexport.js (تصدير MP4)
- references/claude-animations-44.md: الأوصاف الأصلية (44 + ثلاثة أضافها بو ناصر: Seal Spin وParticle Sphere وExtrude Type). Tunnel Grid بُني من الوصف الأصلي لأنه ما أُعيد إرساله
- SKILL.md: قسم عن المجموعة ومتى تُفتح وخطواتها، وقاعدة «وصف واحد لكل لقطة، ولقطتان إلى ثلاث للريل»
- الأنيميشن الذي يحرّك الحرف الواحد (01 و07 و10 و33) يحتاج تعديلًا للعربي. المصدر والترخيص غير مذكورين في الملف الأصلي فالمجموعة للمستودع الخاص فقط

## 1.35.0 (12 نوفمبر 2026)
- agents/ جديد (طلب بو ناصر): أربعة مساعدين بنماذج أرخص. studio-helper (Haiku) للشغل الروتيني على الملفات وffmpeg. browser-media-maker (Sonnet) يفتح كروم ويطلب صورة أو فيديو من Gemini أو ChatGPT أو غيرها ببرومت جاهز، بلا دخول ولا دفع ولا تنزيل بدون إذن. session-reviewer (Haiku) يدوّر في المحادثات السابقة والذاكرة. web-researcher (Sonnet) يجمع الحقائق بمصادرها
- bunasser77/SKILL.md: قسم «المساعدين» (متى يوزّع الأساسي، والتوزيع مع بعض، والطلب الكامل، والتحقق من التقرير)

## 1.34.0 (11 نوفمبر 2026)
- reel-animation-templates جديد: ست قوالب من claude-animation-skills (MIT)، كل واحد بأمر من ملف JSON: graph وmap-route وbreakdown وminimalistic-graphics وstick-figure وzach-d-films، مع الأداة المشتركة kit. التكييف: خط عربي وRTL، وألوان theme.json، وصوته بدل Kokoro، وتوقيت الكلمات العربي من أدواتنا، والتجهيز على ويندوز من Git Bash. ما انجرّبت على ويندوز للحين
- bunasser77/SKILL.md: سطر توجيه

## 1.33.0 (11 نوفمبر 2026)
- reel-cutpaper-vox-style: قسم «الإيقاع وقوس السرد» من vox-director (MIT)، وreferences/beat-layer.md كما هو. السكربتات والتوليد المدفوع ما انضافت، والألوان المعتمدة والحركة «على اثنين» ما تغيّرت

## 1.32.0 (10 نوفمبر 2026)
من خمسة مستودعات فوكس شاركها بو ناصر. أخذنا قواعد vox-explainer من charlie947/motion-graphics-skills؛ الباقي ما انضاف
- reel-cutpaper-vox-style: صار للعناوين الرئيسية أولًا (عنوان الريل، عناوين الأقسام، الخلاصة). الألوان المعتمدة (المنجاوي ‎#F2C230 للتمييز، الأحمر ‎#B8312A، الكريمي ‎#F1E6D0، الكحلي ‎#14213D) وخط Cairo Black، والحركة «على اثنين» (12 وضعية بالثانية)، وجدول ست لقطات، وشروط قبل البناء (السؤال وملف وقائع بمصادر)، وقسم الصوت، وفحص لقطة من كل مشهد، وحدود الصياغة
- reel-cutpaper-vox-style/assets: الريل التجريبي المعتمد كقالب (index.html وrender.js وخط Cairo محليًا)
- vox-director (Alisa0808) وvox-ai-motion-graphics-generator (Anil-matcha) وvox-explainer-skill (CK42BB) ما انضافت: توليد مدفوع على Atlas Cloud أو MuAPI، والعربي غير مدعوم بالكابشن والنص داخل الصورة
- vox-styled-reels (htlin222) ما انضاف: قالب بطاقات مراجعة طبية على Remotion، وبلا ملف ترخيص

## 1.31.0 (10 نوفمبر 2026)
- voicestudio-local-voice: قسم «التشغيل من Claude» (الخادم المحلي 3900، ‎/health، ‎/openapi.json، توليد الكلام، والتفريغ بالتوقيت أو srt، وMCP على ‎/mcp، والتعامل مع الأخطاء)، ملخّص بكلامنا من مهارة المستودع
- OmniRoute ما انضاف: بوابة توجيه لأدوات البرمجة على مزودات مجانية، مو فيديو

## 1.30.0 (10 نوفمبر 2026)
- reel-text-humanizer: خطوة «مرور البنية والتحديد» من Voice Editor (افتتاح فيه تغيير وسؤال محدد، الربط بـ«لأن» مو «وبعدين»، المبني للمعلوم، تفصيل بدل الصفة، اختبار «بيعرف إنه كلامه؟») وخطوة التعلّم من تعديله. الباقي (إزالة علامات الذكاء الاصطناعي ومطابقة الأسلوب) مكرر مع reel-text-humanizer وmy-writing-style

## 1.29.0 (10 نوفمبر 2026)
- ffmpeg-skill تحدّث من 3.2.0 إلى 3.2.3 (رابط شاركه بو ناصر): قص دقيق بالفريم بدون إعادة ترميز كامل (cut.py --smart)، وفحص المستويات للبث (check.py --levels)، وتصحيح المستويات (color.py --legalize)، والمحافظة على الشفافية في التلوين والتركيب (--keep-alpha)، وprobe.py --keyframes-near
- iPolloWork ما انضاف: رخصته Source Available (غير تجاري بشروط وتلزم بإظهار علامتهم)، ومهاراته للفيديو مربوطة باستوديوهم ومبنية على HyperFrames اللي عندنا

## 1.28.0 (10 نوفمبر 2026)
مكتبة Lemo-Opuscar لـ LemoLab (رابط شاركه بو ناصر). أخذنا الوصفات والأدلة والصور؛ محرّكهم (core وnpm) ما انضاف لأن محرّكاتنا تكفي
- reel-code-film-styles جديد: ٦٦ ستايل فيلم بالكود، لكل واحد STYLE.md وDEMO.md وصورة، وstyles.json بأسماء عربية ومجموعات، وجدول الأقرب لحبر أبيض، وتكييف (عمودي، ألوان theme.json، صوته، RTL، الخاتمة، الخرائط)، وملخص طريقة الإخراج
- reel-style-board/scripts/style_board.js: خيار --lib يعرض لوحة مكتبة ثانية (وحقل img والعنوان من styles.json)
- bunasser77/SKILL.md: سطر توجيه، ولوحة أفلام الكود مع سؤال الخط إذا الفيلم بالكود
- motion-video-pre-build: تنويع الستايل يشمل لوحة أفلام الكود

## 1.27.0 (10 نوفمبر 2026)
من قائمة مشاريع مفتوحة المصدر (PDF شاركه بو ناصر). انضاف Humanizer بس؛ الباقي ما يخص الفيديو أو عندنا مثله
- reel-text-humanizer جديد: علامات كتابة الذكاء الاصطناعي بالعربي («ليس مجرد… بل»، الختام الرنّان، الحكم، التمهيد، الثلاثيات، التهويل، السلطة بلا مصدر، بقايا المحادثة) مع أمثلة، والأرقام والأسماء ما تتغيّر، ولهجة كل نص تبقى. المهارة الإنقليزية الأصلية في references/humanizer-en.md
- bunasser77/SKILL.md: الكابشن يمرّ عليها قبل الحفظ، وسطر في جدول التوجيه

## 1.26.0 (9 نوفمبر 2026)
لوحة الستايلات من video-director لـ Sally Slater (رابط شاركه بو ناصر). الباقي من المهارة مكرر عندنا فما انضاف
- reel-style-board جديد: ٥٧ ستايل حركة بصورة لنفس المشهد، وscripts/style_board.js يطلع لوحة مرقّمة (مثل لوحة الخطوط) مع --suggest للمقترحات. الاختيار ينكتب بـtheme.json (style وstyleNum)
- bunasser77/SKILL.md: سؤال الخط ينعرض معه لوحة الستايلات إذا العمل فيه موشن أو رسم، وسطر في جدول التوجيه
- motion-video-pre-build: قواعد «استمرارية، مو سلايدات» (شي ينتقل بين المشاهد، أول عنصر بالقائمة يبقى، ثبات ثانية، لا ارتداد على النص، ٨ أفكار للجملة المهمة)
- motion-bilarabi: ملاحظات ملف الهوية (الحساب من Metricool، لا حقول فاضية، الألوان حسب الموضوع)، وانجرّب المحرّك على جهاز بو ناصر: mba doctor أخضر وريل تجريبي بقالب قائمة

## 1.25.0 (9 نوفمبر 2026)
محرّك «موشن بالعربي» من يوسف الجبوري (رابط شاركه بو ناصر)
- motion-bilarabi جديد: ٨ قوالب ريل جاهزة، حركات الخط العربي (كشيدة تتمدّد، تجميع حروف، كلمة ثقيلة)، مؤثرات على الشخص المصوَّر (قص، تركيز خلفي، نسخ، مدار، غوص بالحروف، تطاير، شبكة البروفايل)، وأدوات شرح (خط زمني، شاشة Claude Code، نافذة سياق). المحرّك كامل داخل المهارة بلا الاختبارات وصور العرض
- الوصف تعدّل عشان ما يتعارض مع motion-video، وانضافت قواعد بو ناصر فوقه (الخط، صوته، المؤثرات من مكتبته بعد الرندر بدل إطفائها، الخاتمة والشعار، فحوص التسليم)
- سطر في جدول التوجيه بـbunasser77/SKILL.md، وTHIRD_PARTY.md وlicenses/motion-bilarabi-LICENSE.txt
- ما انجرّب تشغيله بعد (npm install وmba doctor على جهاز بو ناصر)

## 1.24.0 (8 نوفمبر 2026)
المؤثرات من مكتبة بو ناصر أول حتى بالموشن (قراره بعد ما تبيّن إن مؤثرات ريل الأسهم الـ27 كلها مولّدة بالكود)
- 🔉 قاعدة في bunasser77/SKILL.md: الترتيب مكتبته (studio\sound) ثم أصوات الواجهة الـ78 ثم بنك إيرشوت، والتوليد بالكود احتياط. الاختيار بالسمع بـearshot rank وfind، وضربة الخاتمة والشعار من صوت حقيقي دايماً
- audio.py: sfx.json يقبل "file" (‎@sound/… = مكتبته أو مسار نسبي) مع anchor (peak افتراضي، start، end، ثواني) وpitch وpan وdur. الملف يتطبّع لذروة 1 مثل المولّد. متغير المكتبة BUNASSER_SOUNDS
- motion-mode.md وENGINE-API.md وreel-sound-layer تحدّثت

## 1.23.0 (8 نوفمبر 2026)
مراجعة الصوت بإيرشوت قبل التسليم (قرار بو ناصر بعد مراجعة ريل هبوط أسهم الذكاء الاصطناعي: «يحتاج شغل»، 74%)
- 🎧 قاعدة في bunasser77/SKILL.md: `earshot critique` على الملف النهائي بكل عمل قبل النشر. الشروط: ‎-14 LUFS للريلز، وضربة الخاتمة ما تزيد عن الجسم بأكثر من 3 إلى 5 LU، والضربات القوية للحظات الكشف بس، وكل قطعة معها صوت. الليمتر يشتغل بخفة ويتقارن قبل وبعد بـearshot ab
- audio.py: المعايرة الافتراضية صارت ‎-14 للكل، حتى صوته الحقيقي (كانت ‎-20، والريل طلع أوطى من الفيد بـ6 دسيبل). وتحدّث ENGINE-API.md وreel-sound-layer

## 1.22.0 (7 نوفمبر 2026)
النشر التلقائي بعد التصدير، ولقطات فيديو داخل محرك الموشن، وتشغيل المحرك على ويندوز (من ريل هبوط أسهم الذكاء الاصطناعي)
- 📤 قاعدة في bunasser77/SKILL.md: بعد التصدير النهائي في كل عمل: كابشن بالفصحى (caption.txt والأرقام من facts.md)، ثم نسخ الفيديو لمجلد Social media في قوقل درايف، ثم جدولة في Metricool على إنستغرام (ريل) وتيك توك ويوتيوب (شورت) بالوقت اللي يحدده بو ناصر، ثم فحص قبل النشر بنص ساعة، وأي مشكلة يتواصل معه بالإيميل أو تطبيق كلود. اختبار الاتصال كان مرة وحدة وما يتكرر
- video-ad-editor/motion: خاصية seqs: لقطات فيديو مولّدة تدخل المشهد كتسلسل صور JPG، بـctx.seq وctx.cover وMOTION.prepare (تحميل مسبق وذاكرة 120 صورة). موثّقة في ENGINE-API.md
- render.js على ويندوز: يشغّل Edge أو Chrome بنفسه ويتصل فيه (التشغيل العادي كان يطلع بـCode 0)، وGL=gpu يرسم بكرت الشاشة عبر ANGLE D3D11 (أسرع 4 مرات تقريباً)، والأفضل ‎--workers 3

## 1.21.0 (7 نوفمبر 2026)
قائمة الخطوط محفوظة، والسؤال عن الخط أول كل عمل (أمر بو ناصر: يختار خطاً مختلفاً حسب الموضوع)
- bunasser77/references/font-list.md جديد: 51 خطاً بأرقامها (21 مجانية داخل البلقن و30 على جهازه) مع طابع كل خط
- bunasser77/assets/font_board.png وfont_board_local.png: صور اللوحتين محفوظة داخل البلقن
- القاعدة صارت «اختيار الخط أول كل عمل»: دايماً تُعرض القائمة ويُسأل عن رقمين (رئيسي وجانبي) قبل البدء، بلا اعتماد على اختيار سابق إلا إذا قاله هو. وسؤال الخط صار ضمن أسئلة البداية بالتوجيه

## 1.20.0 (7 نوفمبر 2026)
اختيار الخط قبل الكتابة (أمر ثابت من بو ناصر)
- 🔤 قاعدة في bunasser77/SKILL.md: بكل عمل، قبل كتابة أي نص على الشاشة، تُعرض لوحة خطوط مرقّمة ويختار بو ناصر رقماً للعنوان الرئيسي ورقماً للجانبي، ويُكتبان بـtheme.json (font وfontSub)
- bunasser77/scripts/font_board.js جديد: لوحة بنفس جمل العمل وألوان الثيم، 21 خطاً عربياً مجانياً من video-ad-editor/motion/fonts، و--local يضيف خطوط جهازه (51 بالمجموع على جهازه الحين). يصغّر النص ليركب بالكرت، ويصوّر بـEdge أو Chrome بلا واجهة، ويكتب قائمة .txt بالأرقام. بلا مكتبات

## 1.19.0 (7 نوفمبر 2026)
الصوت بصوته، واقتراح الصور واللقطات المولّدة، والتواصل بالعربي (قرارات بو ناصر)
- 🎙️ قاعدة أساسية في bunasser77/SKILL.md: بو ناصر يسجّل الفويس أوفر بنفسه بالعامية البحرينية حتى بالموشن. Claude يعطيه نص قراءة بلهجته (script_read.txt، سطور قصيرة، الأرقام من facts.md، وآخره «هذه هي القصة») ولا يولّد صوتاً إلا بطلبه. تتقدم على «الصوت المولّد» في motion-mode.md، وسطر في motion-video/SKILL.md
- 🎬 قاعدة أساسية: قبل بناء المشاهد يقترح Claude صوراً ولقطات فيديو تعبيرية أو تمثيلية، كل وحدة ببرومبت إنقليزي مفصّل داخل بلوك كود. المرجع الجديد cinematic-camera-prompt-vocab/references/ai-visual-prompts.md (القالب، القواعد: 9:16، ألوان theme.json، بلا نص ولا أرقام ولا شعارات ولا أشخاص حقيقيين، ومثالان من ريل هبوط أسهم الذكاء الاصطناعي)
- 💬 قاعدة: كل التواصل مع بو ناصر بالعربي، والبرومبتات وحدها بالإنقليزي

## 1.18.0 (7 نوفمبر 2026)
خاتمة الشعار، دليل إصلاح المؤثرات، ومستوى الصوت (قرارات بو ناصر)
- 🖋️ قاعدة أساسية جديدة في bunasser77/SKILL.md: كل عمل ينتهي بـ«هذه هي القصة» ثم شعار حبر أبيض 3D يدور (بـ41_logo3d.js). الشعار في bunasser77/assets/habr-abyad-logo.png (مقصوص بخلفية شفافة من صورته)، وسطر في instagram-reels-agent
- «حبر أبيض» عن فيديو يستدعي البلقن (سطر الوصف وفقرة بالتوجيه)، وعن مقال يروح my-writing-style
- reel-sound-layer/references/fix-reel-playbook.md جديد: إصلاح مؤثرات ريل جاهز خطوة خطوة بوقفات موافقة وPROGRESS.md وقواعد الكثافة (مؤثر بالثانية بالكثير، أعلى لحظة بكل مشهد، رايزر نادر). مأخوذ من دليل جرّبه بو ناصر، معدّل: لهجة خليجية، مكتبته أولاً وSFX Kit من Wyzowl احتياطاً بعد قراءة رخصته، وبلا سطر الدعاية. وصف بالتوجيه وفي reel-sound-layer
- مستوى الصوت: الريلز ‎-14 LUFS ويوتيوب الطويل والبودكاست الكامل ‎-16 (reel-sound-layer كان يقول ‎-16 للكل ويخالف المحرّك). 24_podcast_wide.py وpodcast.md صارت ‎-16
- Earshot مركّب على جهازه (vendor\earshot\.venv) وجُرّب على ووش من مكتبته. تسجيله كـMCP بكلود كود باقٍ بيده (نظام الأذونات منع)

## 1.17.0 (7 نوفمبر 2026)
Real SFX وEarshot (أوامر التركيب اللي لصقها بو ناصر)
- real-sfx من Clipwing صارت داخل البلقن مع أصوات uisfx الـ78 (CC0)، وconfig.json يشير لمكتبته studio\sound، وفهرسها بـstudio\sound\real-sfx-index.json. فُحصت: 102 صوت مقروءة بأنواعها
- earshot وreal-sound (مهارتا مستودع Earshot) صارت داخل البلقن. أداة Earshot نفسها (venv وtorch وMCP) ما تركّبت: نظام الأذونات أوقف تشغيل كود خارجي، وتنتظر إذن بو ناصر
- reel-sound-layer/scripts/sound_library.py يكتب catalog.csv بصيغة real-sfx (نوع كل صوت) جنب library.json
- reel-sound-layer وreel-sound-tools-install: Real SFX مدمجة بدل التركيب اليدوي، وأمر Earshot بمسار ويندوز
- THIRD_PARTY.md وlicenses/earshot-LICENSE.txt

## 1.16.1 (7 نوفمبر 2026)
- watch/SKILL.md شيل سطر `allowed-tools: Bash, Read, AskUserQuestion` من المصدر الأصلي (كان يخلي Claude يشغّل أوامر بلا استئذان، وتطبيق Claude يعرض البلقن «Can run code without asking»). الأداة نفسها ما تغيّرت، بس تستأذن مثل الباقي. أمر بو ناصر
- .github/scripts/validate_plugin.py يرفض أي مهارة فيها allowed-tools عشان ما يرجع مع تحديث أداة

## 1.16.0 (7 نوفمبر 2026)
مكتبة أصوات بو ناصر المحلية (أمره: فهرسة الأصوات اللي حطها في studio\sound وجعلها أول مصدر)
- reel-sound-layer/scripts/sound_library.py جديد: يفهرس المجلد (النوع، الاستخدام، المدة، زمن الذروة، المقام للبادات، والمفضّل من Most used) في library.json وlibrary.md داخل مجلد الأصوات، ويبحث بـ--find. يحتاج ffmpeg فقط، ويحفظ أي تعديل يدوي "manual": true
- reel-sound-layer/references/bunasser-library.md نسخة من الفهرس (102 صوت، 14 نوعاً) عشان Claude يعرف المكتبة حتى بالجلسة السحابية
- reel-sound-layer/SKILL.md المكتبة المحلية صارت المصدر الأول (قبل سونيس)، مع قواعد المفضّل والبادات حسب المقام، وتحذير أن أغلبها من مكتبات مدفوعة فلا تدخل البلقن ولا تُرسل
- bunasser77/SKILL.md ترتيب المصادر في قاعدة المؤثرات التلقائية
- الأصوات نفسها (555 ميغا) باقية على جهازه وما دخلت البلقن

## 1.15.0 (7 نوفمبر 2026)
أدوات الاستوديو صارت داخل البلقن (أمر بو ناصر: كل المهارات والأدوات في بلقن واحد مرتب، ومتاحة من أي جهاز)
- 24 مهارة أداة منسوخة كما هي من مصادرها إلى مجلدات بالبلقن: ffmpeg-skill، watch، تسع مهارات HyperFrames (hyperframes وhyperframes-cli وhyperframes-registry وmedia-use وreverse-any-video وstyle-sampling وslideshow وfigma وremotion-to-hyperframes)، وثلاث عشرة مهارة Remotion. ffmpeg-skill بلا site وdemos وevals وassets وCHANGELOG (صور وديمو فقط، 23.5 إلى 2.8 ميغا)
- THIRD_PARTY.md وlicenses/ جديدة: المصدر والكومت والرخصة لكل أداة
- bunasser77/SKILL.md فقرة «أدوات الاستوديو» صارت جدول توجيه بالبادئة bunasser77:، وسطر الوصف يذكر الأدوات
- bunasser77/references/studio-tools.md وvideo-ad-editor/references/review-tools.md المسارات داخل البلقن بدل ~/.claude/skills
- bunasser77/scripts/studio_setup.ps1 يثبّت المتطلبات فقط، ونسخ المهارات محلياً صار بخيار -LocalSkills
- video-ad-editor/scripts/43_tools_check.py يلقى الأدوات داخل البلقن أولاً
- 66 مهارة، والفحص بلا أخطاء. ⚠️ النسخ المحلية بـ~/.claude/skills على جهاز بو ناصر تتكرر مع البلقن بكلود كود بعد التثبيت، فتُنقل لنسخة احتياطية
- لم تُدمج: مهاراته الشخصية العشر (مب فيديو)، وبلقنات Anthropic (Productivity وCrypto Spot Futures Analyzer) لأنها مب ملكه وتتحدث من مصدرها

## 1.14.0 (7 نوفمبر 2026)
البلقن صار مصدراً واحداً كاملاً (أمر بو ناصر: نقل المهارات المستقلة داخل المستودع)
- 32 مهارة كانت مرفوعة مستقلة بحساب بو ناصر صارت مجلدات داخل البلقن، بنصها كما هو بلا تعديل: المجموعة الأساسية (reel-style-broll-rules وأخواتها)، مهارات الموشن، الستايلات والبنى، الصوت والأصول، المراجعة، وما بعد النشر. القائمة كاملة في README
- لم تُنقل: history-writer وmy-writing-style وrashid-content-creator (مب شغل فيديو بو ناصر)، ومهارات Anthropic العامة
- bunasser77/SKILL.md سطر أن المهارات المساندة صارت داخل البلقن، وREADME جدول «المهارات المساندة»
- فُحصت الواجهات: 42 مهارة، كل اسم يطابق مجلده، وكل اسم مهارة مذكور بالمدخل موجود داخل البلقن
- ⚠️ النسخ المستقلة القديمة باقية بحساب بو ناصر، فبعد تثبيت هذه النسخة تطلع كل مهارة مرتين. تُحذف المستقلة من إعدادات المهارات بتطبيق Claude بيده
- .github/workflows/release-plugin.yml بدل npm-publish.yml (كان قالب npm بلا package.json فيفشل مع أي إصدار): يفحص البلقن مع كل push، ومع نشر إصدار وسمه v<النسخة> يبني bunasser77.plugin ويرفقه بالإصدار. الفحص بـ.github/scripts/validate_plugin.py ويرفض وسماً لا يطابق plugin.json
- مكررات لم تُدمج بعد (مهارة ومرجع بنفس الموضوع): reel-pause-policy مع video-ad-editor/references/pause-policy.md، reel-review-tools مع review-tools.md، overhead-screen-zoomout مع overhead-screen.md، reel-teaser-structure مع teaser-structure.md، cinematic-camera-prompt-vocab مع camera-vocab.md

## 1.13.0 (7 نوفمبر 2026)
طبقة أدوات الاستوديو (أمر بو ناصر: البلقن هو الأساس، ومنه نبني ونجمع أدوات استوديو إنتاج الفيديو والريلز)
- bunasser77/references/studio-tools.md ملف جديد: من يستخدم ماذا (ffmpeg-skill وwatch وHyperFrames وRemotion)، أسماؤها على الجهاز، الخصوصية والرخص
- bunasser77/scripts/studio_setup.ps1 ملف جديد: يفحص ويثبّت المتطلبات بـwinget وينسخ مهارات الأدوات الأربع إلى ~/.claude/skills بلا مسح الموجود (-CheckOnly و-Update)
- bunasser77/SKILL.md فقرة «أدوات الاستوديو» ضمن المهارات والأدوات
- video-ad-editor/scripts/43_tools_check.py صفوف yt-dlp وwatch وhyperframes وremotion
- video-ad-editor/references/review-tools.md اسم الأمر `/watch` عند التثبيت كمهارة مستقلة
- مثبّتة على جهاز بو ناصر ونجحت فحوصها الذاتية (watch وffmpeg-skill doctor وhyperframes 0.9.19)، لكن لم تُجرَّب على ريل كامل. OpenMontage باقٍ غير مدمج

## 1.12.0 (6 نوفمبر 2026)
إضافة بو ناصر من مراجعة Reel Studio 3.0 (احفظها عند دمج أي تحديث من المصدر)
- video-ad-editor/references/pause-policy.md ملف جديد (سياسة السكتات حسب نوع الفيديو، وفكرة ستايل الكارتون، وسطره في جدول 7.x بـSKILL.md)
- bunasser77/SKILL.md سطر قص السكتات ضمن «حسب المادة أو الطلب»
- الحكم على Reel Studio: لا يُثبَّت مع البلقن لأن أغلب قدراته مغطاة، ويرسل إشارة تثبيت واستخدام يومية، ويعمل على ويندوز فقط
- الستايلات الجديدة لم تُضف لبنك styles.md، والمرجع لم يُجرَّب على ريل

## 1.11.0 (6 نوفمبر 2026)
مسار الأسئلة والمجموعة الأساسية (أمر بو ناصر: كلود يسأل عن شكل العمل ومادته ثم يجهّز المهارات والأدوات)
- bunasser77/SKILL.md قسم «بداية العمل» بثلاثة أسئلة قصيرة (شكل العمل، المادة، الصوت)، وقسم «المهارات والأدوات حسب نوع العمل»: مجموعة أساسية لكل ريل، وإضافات الموشن، وما يُستدعى حسب المادة، والأدوات المربوطة (ElevenLabs وArtlist وHiggsfield وMetricool)
- ما كان مرفوعاً خارج البلقن وغير مذكور صار مربوطاً بالمدخل بالاسم
- لم يُجرَّب على ريل كامل، وArtlist يحتاج تحقق من الرصيد والرخص قبل الاعتماد

## 1.10.0 (6 نوفمبر 2026)
طبقة المؤثرات الصوتية تلقائية (أمر بو ناصر: يجلبها Claude ذاتياً حين ينتج أو يحتاج مؤثرات)
- bunasser77/SKILL.md قاعدة «المؤثرات الصوتية تلقائية» بقواعد بو ناصر قبل قاعدة الكفر، تحمّل reel-sound-layer بعد الصورة والصوت وتحيل التركيب إلى reel-sound-tools-install
- لم يُجرَّب على ريل كامل، وReal SFX وEarshot تعملان على جهازه فقط داخل Claude Code

## 1.9.0 (6 نوفمبر 2026)
قاعدة الكفر الأساسية (أمر بو ناصر: ما يطلع فيديو بلا كفر مختار قبل الخطوة الأخيرة)
- bunasser77/SKILL.md قاعدة «الكفر قبل الخطوة الأخيرة» بقواعد بو ناصر، وتسري على كل مهارات الفيديو
- motion-video وmontage-video وpodcast-video وdavinci-video سطر الكفر بقواعدها الثابتة، وinstagram-reels-agent شرط اعتماد الغلاف قبل التصدير
- video-ad-editor/SKILL.md وreferences/timing-qa.md الكفر ضمن الفحص قبل التسليم (بند خامس)
- لم يُجرَّب على ريل كامل، وكفر فيلم الموشن بلا وجه يعتمد على اختيار فريم أوضح مشهد

## 1.8.0 (6 نوفمبر 2026)
إضافة بو ناصر من ربط موصّل هيغزفيلد (احفظها عند دمج أي تحديث من المصدر)
- video-ad-editor/references/higgsfield.md ملف جديد (أين يخدم هيغزفيلد بخط الريل، خطوات التوليد بدل fal.ai، قواعد الصرف)، وسطره في جدول 7.x بـSKILL.md
- غير مُجرَّب: لم يُولَّد أي مقطع، والرصيد وقت الربط 10 كريدت بخطة مجانية

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
