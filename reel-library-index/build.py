"""Builds index.json and references/motion-vocabulary.md and references/catalog.md from the data below.
Edit the data here, then run:  python -I reel-library-index/build.py   (from the plugin root)
"""
import json, pathlib

HERE = pathlib.Path(__file__).resolve().parent

# ---------------------------------------------------------------- catalog
# category -> (Arabic label, the question it answers, entries)
# entry: (name, what it gives, when to use, where: skill / file / command)
CATALOG = [
 ("text-motion", "حركة النص والكلمات", "كيف تدخل هذه الكلمة أو الجملة وتتحرك؟", [
  ("حركات الخط العربي", "كشيدة تتمدّد (stretch)، تجميع الحروف (join)، كلمة ثقيلة (heavy)، قطع حاد (cut)، شعار (brand)", "كلمة واحدة تحمل معنى الحركة. الطريقة الوحيدة المضمونة لتحريك العربي بلا كسر الحروف", "`motion-bilarabi` (مشهد `arabic-move`، كلمة واحدة في `show.word`)"),
  ("نص مطاطي، نص مقنّع، نص يتحول لتخطيط", "وصفات بناء كاملة", "عنوان افتتاح، كشف اسم، عنوان يصير غلافًا", "`motion-recipes` ← `references/effects-recipes.md` (09، 10، 11)"),
  ("مكونات نص HyperFrames", "blur-in، bottom-up-letters، وعشرات غيرها", "دخول جملة أو عنوان بسرعة", "`hyperframes-registry` ← `npx hyperframes catalog --query \"<الحركة>\"`"),
  ("كابشن متحرك", "caption-clip-wipe، caption-editorial-emphasis، تمييز الكلمة", "كابشن بتوقيت الكلمة", "`hyperframes-registry` و`remotion-captions` و`video-ad-editor`"),
  ("نص يُكتب أو يُفكّ", "آلة كاتبة، فك تشفير، لوحة مطار", "كشف معلومة أو كود", "`motion-prompt-library` (18-typewriter، 33-scramble-decode، 10-split-flap)، و`motion-effects-bank` (Typewriter)"),
  ("نص ثلاثي الأبعاد", "حروف بارزة تدور", "عنوان قوي أو خاتمة", "`motion-prompt-library` (46-extrude-type)، و`video-ad-editor/motion` (TextGeometry)"),
  ("افتتاحيات عربية", "هوك يوقف التمرير، مد عربي، مورف", "أول ثانيتين", "`mutqin-motion-prompts`"),
  ("كاينتك تايبوغرافي مولّد", "فيديو نص حركي من هيغزفيلد كاتانا", "حين يُطلب توليد لا بناء", "`katana-higgsfield-tips`"),
 ]),
 ("visual-fx", "مؤثرات بصرية للحظة", "اللحظة تحتاج صدمة، كشف، أرقام، خاتمة؟", [
  ("بنك 11 تأثيرًا", "Orbit، Vertigo، Zoom-through، Headlines، Paper Cut، Charts، Phone Screens، Frame Break، Pullback، Glitch، Typewriter", "اختيار التأثير بوظيفة اللحظة", "`motion-effects-bank`"),
  ("16 تأثيرًا بوصفات", "تحوّل رسم بياني، تكبير لوحة أرقام، تكديس نابضي، كشف صورة، تحوّل منظور، مسارات متدفقة، شعار من جزيئات، تأثيرات واجهات", "حين لا يكفي البنك", "`motion-recipes`"),
  ("47 أنيميشن بالكود", "عدّاد، أعمدة 3D، دائرة نسبة، كرة أرضية، انفجار طبقات، تحوّل أشكال، نفق، كرة جزيئات، قبل وبعد...", "طبقة واحدة للقطة واحدة", "`motion-prompt-library` ← `animations/INDEX.md`"),
  ("رقم يتجمع من نقاط، ورسم بياني متحرك", "الرقم كما هو من المصدر", "رقم صادم أو مقارنة", "`motion-recipes` (milestone-reveal، animated-chart)"),
  ("مؤثرات بكسل", "انفجار POW، عدّ تنازلي، رقم يقفز، طقس، 244 مؤثرًا", "ريل خفيف أو بطابع ألعاب", "`pixelfx` ← `docs/CATALOG.md`"),
  ("مؤثرات على شخصه المصوَّر", "قص الشخص، تركيز خلفي، نسخ، مدار، غوص في الحروف، تطاير، شاشة كود", "ريل كلام فيه شخصه", "`motion-bilarabi` (مشهد `cutout`)"),
  ("ملمس الصورة في Three.js", "حبيبات فيلم، هاف تون، عمق ميدان، تيلت شفت، بكسلة، قلتش، LUT", "فيلم ثلاثي الأبعاد", "`video-ad-editor/motion/THREE-ADDONS.md`"),
  ("لقطة مميزة جاهزة", "عنوان، انتقال، كاميرا 3D، ظهور واجهة", "لقطة بطل في الريل", "`shotcraft-motion-cards`"),
  ("بلوكات HyperFrames جاهزة", "قرابة 450: عناوين، شارتات، خرائط، مؤثرات، خلفيات 3D", "قبل بناء أي شيء باليد", "`hyperframes-registry` و`hyperframes-blocks`"),
 ]),
 ("transitions", "انتقالات", "كيف ننتقل من مشهد أو فكرة إلى التالية؟", [
  ("انتقالات HyperFrames", "beat-freeze-cut، chromatic-radial-split، cinematic-zoom، والمزيد", "بين مشهدين في فيلم HyperFrames", "`hyperframes-registry` (`--tag transition`)"),
  ("Zoom-through، Pullback، Frame Break، Glitch", "من البنك", "من فكرة إلى فكرة بلا قطع عادي", "`motion-effects-bank`"),
  ("10 انتقالات بكسل", "ستائر، احتراق، انطفاء CRT، معيّنات، قلتش، قزحية، تحلل، تكسّر زجاج، ضربة سيف، نجمة", "فاصل بطابع ألعاب أو تقني", "`pixelfx` (`src/fx/transitions/`)"),
  ("انتقال بين مشهدين ثلاثيي الأبعاد", "مسح أو ذوبان بقناع", "داخل فيلم Three.js", "`video-ad-editor/motion/THREE-ADDONS.md` (RenderTransitionPass)"),
  ("لقطة كاميرا واحدة بلا قطع", "كل مشهد على سطره", "فيلم متصل", "`continuous-camera-motion-reel`"),
  ("انتقال شبكة البروفايل", "المشهد يصغر لمربع في شبكته ثم يدخل التالي", "ريل لحسابه", "`motion-bilarabi` (`profile-grid`)"),
  ("ورقة تصعد بحافة ممزقة", "على اثنين", "ستايل الورق المقصوص", "`reel-cutpaper-vox-style`"),
  ("موجة هاف تون، مسح نقطي", "انتقال مطبوع", "بين فصول", "`motion-prompt-library` (32-halftone-wave، 36-dot-wipe)"),
 ]),
 ("camera", "حركة الكاميرا والإحساس", "كيف تتحرك الكاميرا وبأي إحساس؟", [
  ("مكونات الكاميرا", "camera-shake، camera-scan-gate، ودفع وسحب", "ضربة أو مسح", "`hyperframes-registry`"),
  ("إحساس الحركة", "ارتداد نابضي، انزلاق، تتابع، عدّاد", "ضبط التسهيل لكل ستايل", "`motion-easing-springs`"),
  ("أرقام الحركة والإيقاع", "حركة ظاهرة كل مشهد، دفع 2.5 إلى 4%/ث، مكان جديد كل جملة أو جملتين", "قبل البناء وعند المراجعة", "`reel-telling-kit` §2"),
  ("مفردات كاميرا للتوليد", "عدسة، فتحة، حركة", "برومبت B-roll مولّد", "`cinematic-camera-prompt-vocab`"),
 ]),
 ("fonts", "خطوط", "أي خط؟", [
  ("قائمة خطوطه المرقّمة", "51 خطًا، مع لوحة صور", "اختيار الخط قبل كل عمل", "`bunasser77/references/font-list.md`"),
  ("خطوط المحرّك وقواعدها", "الأوزان، الآيات بـAmiri Quran، عيوب معروفة، مرشّحة", "عند البناء", "`video-ad-editor/references/fonts.md`"),
  ("العربي مع الإنجليزي", "منع انكسار الاتجاه", "أي كابشن فيه اسم إنجليزي", "`reel-caption-bidi-guard`"),
 ]),
 ("styles", "ستايلات الريل كله", "أي شكل للريل؟", [
  ("لوحة 57 ستايل حركة", "ورق مقصوص، أيزومتري، كولاج، طين، مائي...", "اختيار الشكل بالصور", "`reel-style-board`"),
  ("99 ستايل فيلم بالكود", "66 بوصفات + 33 بفهرس", "فيلم كامل بشكل مسمّى", "`reel-code-film-styles` (و`styles-extra.md`)"),
  ("الورق المقصوص (Vox)", "بألوانه المعتمدة", "العناوين وريل الشرح", "`reel-cutpaper-vox-style`"),
  ("شرح وأرشيف تاريخي", "ستايلات الشرح ولقطات الأرشيف", "ريل تحليلي أو تاريخي", "`reel-explainer-styles-archive`"),
  ("حلقة بستايل مجرّب", "Collage، Finance، Science، 3D Brand، True Crime", "حلقة على نسق معروف", "`style-sampling`"),
  ("أسلوب ريل أعجبه", "بصمة الإيقاع والحركة", "عنده مرجع", "`reel-style-fingerprint` و`reverse-any-video`"),
  ("كسر الخيار المتوقع", "يسمّي الافتراضي ثم يبتعد عنه", "أي قرار شكلي «عادي»", "`antialgorithm`"),
 ]),
 ("templates", "قوالب جاهزة", "هل يوجد قالب يغني عن البناء؟", [
  ("قوالب موشن بالعربي", "قائمة، مشكلة وحل، خطوات، سألتوني، أداة، دليل حلقي، شرح نظام، تشويقة", "ريل عربي سريع", "`motion-bilarabi`"),
  ("6 قوالب أنيميشن", "graph، map-route، breakdown، minimalistic-graphics، stick-figure، zach-d-films", "ريل بلا تصوير من JSON", "`reel-animation-templates`"),
  ("سبورة على الكلمة", "رسم يتزامن مع الكلام", "ريل تعليمي", "`reel-word-synced-board`"),
  ("الشاشة فوق الراس", "زوم آوت وشاشة تطفو", "ريل تعليمي بشاشة", "`overhead-screen-zoomout`"),
 ]),
 ("story", "السرد والهوك", "كيف نبني الحكاية والبداية؟", [
  ("هياكل الحكاية", "حكاية قصيرة، ورقة وفكرة، سلّم، سلسلة", "ريل يُحكى بصوت", "`reel-telling-kit`"),
  ("عائلات الهوك", "مع مؤثرات مجانية", "أي ريل", "`reel-hook-families-free-sfx`"),
  ("تقطيع السكربت لمشاهد", "مشهد لكل جملة", "قبل أي فيلم موشن", "`motion-script-discipline` و`motion-video-pre-build`"),
  ("تيزر", "هيكل التشويق", "إعلان قصير بموسيقى", "`reel-teaser-structure`"),
 ]),
 ("sound", "الصوت", "أي صوت ومن أين؟", [
  ("طبقة المؤثرات", "من مكتبته الحقيقية، على الفريم", "بعد اكتمال الصورة والفويس", "`reel-sound-layer` و`real-sfx`"),
  ("مسار صوت كامل للفيلم", "مكس وماستر", "فيلم بالكود", "`real-sound`"),
  ("القياس والاستماع", "Claude لا يسمع، earshot يقيس", "قبل أي حكم على صوت", "`earshot`"),
  ("قاعدة صوت الريل المحكي", "3 إلى 5 مؤثرات حقيقية، الخلفية حقيقية أو لا شيء", "ريل بصوته", "`reel-telling-kit` §3"),
 ]),
 ("qa", "الفحص والتسليم", "هل الريل جاهز؟", [
  ("توقيت المشاهد على الصوت", "", "قبل الترتيب والتسليم", "`motion-timing-qa`"),
  ("اختبار الخمس ثوان والعربي", "", "فيلم بالكود", "`reel-code-film-checks`"),
  ("حلقة المراجعة", "نسخ مرقمة وبوابات اعتماد", "كل ريل", "`reel-review-loop` و`reel-review-tools`"),
  ("فحص التسليم", "الكابشن، مناطق الأمان، الصوت، الترميز", "آخر خطوة", "`reel-delivery-checks` و`motion-recipes` (reel-export)"),
 ]),
]

# ---------------------------------------------------------------- word -> motion vocabulary
# (meaning family, Arabic cue words, motion idea, options: list of (source, how))
VOCAB = [
 ("الطول والامتداد", "طويل، يمتد، بعيد، سنين، ممتد، يتمدد، مسافة", "النص يتمدد مع الكلمة حتى يواكب معناها", [
   ("`motion-bilarabi` arabic-move `stretch`", "كشيدة تتمدد في كلمة فيها موضع كشيدة. إن لم يكن فيها موضع (ورد، دار) فاختر غيرها"),
   ("`motion-recipes` 10 نص مطاطي", "تمدد أفقي مرن"),
   ("خط يرتسم تحت الكلمة", "`motion-prompt-library` 13-line-draw أو 15-marker-draw")]),
 ("القِصر والانكماش", "قصير، صغير، يتقلص، ينكمش، قليل", "الكلمة تنكمش أو تصغر", [
   ("تصغير بنابض", "`motion-easing-springs`"), ("تكبير لوحة ثم ابتعاد", "`motion-effects-bank` Pullback")]),
 ("الثقل والأهمية", "ثقيل، أهم، خطير، كبير، ضخم، حاسم", "الكلمة تهبط بثقل وتستقر", [
   ("`motion-bilarabi` arabic-move `heavy`", "الكلمة الثقيلة"), ("هبوط مع اهتزاز كاميرا خفيف", "`hyperframes-registry` camera-shake")]),
 ("السقوط والانهيار", "سقط، انهار، طاح، هبوط، خسارة، تراجع", "الشيء أو الرقم يسقط", [
   ("أعمدة تنهار", "`motion-recipes` 05 تحوّل رسم بياني"), ("Frame Break", "`motion-effects-bank`"), ("انفجار طبقات", "`motion-prompt-library` 44-layer-explode")]),
 ("الصعود والنمو", "ارتفع، صعد، نما، زاد، قفز، ربح", "صعود أو نمو", [
   ("عدّاد يصعد", "`motion-prompt-library` 40-count-up"), ("أعمدة 3D", "28-3d-bars"), ("رقم من نقاط", "`motion-recipes` milestone-reveal")]),
 ("الاجتماع والوحدة", "اجتمع، اتحد، تجمّع، كلنا، معًا، يكمّل", "أجزاء تجتمع في شكل واحد", [
   ("`motion-bilarabi` arabic-move `join`", "تجميع الحروف"), ("شعار من جزيئات", "`motion-recipes` 16"), ("كرة جزيئات", "`motion-prompt-library` 41-particle-sphere")]),
 ("الانقسام والتفرق", "انقسم، تفرّق، تشتّت، خلاف، تفكك", "شيء ينشق أو يتطاير", [
   ("انشقاق لوني", "`hyperframes-registry` chromatic-radial-split"), ("تطاير الشخص", "`motion-bilarabi` cutout `dust`"), ("تكسّر زجاج", "`pixelfx` transitions/shatter-wipe")]),
 ("الانفجار والصدمة", "انفجر، صدمة، فجأة، ضربة، مفاجأة", "صدمة على الكلمة", [
   ("Vertigo أو Glitch", "`motion-effects-bank`"), ("POW", "`pixelfx` explosions/cartoon-pow (لريل خفيف فقط)"), ("قطع مجمّد على الإيقاع", "`hyperframes-registry` beat-freeze-cut")]),
 ("السرعة", "سريع، فورًا، بلحظة، يركض", "قطع حاد أو حركة خاطفة", [
   ("`motion-bilarabi` arabic-move `cut`", "الكلمة حتى قطع حاد"), ("Zoom-through", "`motion-effects-bank`")]),
 ("البطء والانتظار", "ببطء، انتظر، صبر، سنين، هدوء", "دفع كاميرا بطيء وثبات", [
   ("دفع بطيء 1%/ث", "`reel-telling-kit` §2"), ("Bokeh يركز ببطء", "`THREE-ADDONS.md` BokehPass")]),
 ("الكشف والسر", "كشف، الحقيقة، سر، خلف، مخفي", "شيء مخفي يظهر", [
   ("نص مقنّع", "`motion-recipes` 09"), ("كشف صورة", "`motion-recipes` 12"), ("فك تشفير", "`motion-prompt-library` 33-scramble-decode (للإنجليزي والأرقام فقط)")]),
 ("المقارنة والتحول", "قبل، بعد، كان، صار، بدل، الفرق", "حالتان", [
   ("قبل وبعد", "`motion-prompt-library` 20-before-after"), ("تحوّل أشكال", "21-shape-morph"), ("لقطة قبل وبعد", "`reel-cutpaper-vox-style`")]),
 ("الكثرة والانتشار", "كثير، الكل، العالم، انتشر، آلاف", "تكاثر أو انتشار", [
   ("Headlines جدار عناوين", "`motion-effects-bank`"), ("كرة أرضية ومسارات", "`motion-prompt-library` 03-globe-arcs"), ("محاكاة انتشار", "`reel-code-film-styles` pip-simulation")]),
 ("الطريق والتدفق والخطوات", "طريق، مسار، خطوة، ثم، يمر، سلسلة", "خط يتقدم أو مسار", [
   ("خط متدفق", "`motion-prompt-library` 42-flow-line"), ("مسارات متدفقة", "`motion-recipes` 15"), ("مسار على خريطة", "`reel-animation-templates` map-route")]),
 ("العمق والطبقات والنظام", "داخل، طبقات، نظام، تحت السطح، يتكون من", "تحوّل منظور يكشف الطبقات", [
   ("تحوّل منظور", "`motion-recipes` 13"), ("انفجار طبقات", "`motion-prompt-library` 44-layer-explode")]),
 ("الزمن والتاريخ", "قديم، تاريخ، سنة، زمان، أرشيف", "ملمس أرشيفي أو خط زمني", [
   ("حبيبات فيلم وسيبيا", "`THREE-ADDONS.md` FilmPass وSepiaShader"), ("ستايل أرشيف", "`reel-explainer-styles-archive`")]),
 ("التوقف والنهاية", "توقف، انتهى، خلاص، آخر", "تجميد أو انطفاء", [
   ("قطع مجمّد", "`hyperframes-registry` beat-freeze-cut"), ("انطفاء شاشة", "`pixelfx` transitions/crt-off (طابع تقني)")]),
 ("العدّ والرقم", "رقم، مليون، نسبة، %، ريال، دولار", "الرقم هو البطل", [
   ("عدّاد", "40-count-up"), ("دائرة نسبة", "23-donut-ring"), ("تكبير لوحة أرقام", "`motion-recipes` 06")]),
]

DONT = [
 "الآية والحديث والنص المنقول: ثابت كامل على بطاقة، بلا حركة ولا مؤثر (`reel-telling-kit` §4).",
 "لا تُفصل حروف العربي المتصلة أبدًا. تحريك الحرف الواحد بالعربي فقط عبر `motion-bilarabi`. أنيميشن 01 و07 و10 و33 تحرّك حروفًا مفردة فتحتاج تعديلًا للعربي.",
 "لا حركة على كل كلمة: كلمة حركة واحدة تقريبًا كل جملتين، والباقي حركة كاميرا هادئة.",
 "لا مؤثرات مرحة (pixelfx، POW، قصاصات) في موضوع جاد أو مأساوي أو ديني.",
 "لا تتكرر عائلة الحركة نفسها في لحظتين متتاليتين، ولا أكثر من مرتين في الريل إلا إذا كانت لغة ستايل مقصودة.",
 "حركة بطل واحدة في الريل تُحفظ لأقوى لحظة.",
 "الستايل يحكم الإحساس: الورق المقصوص على اثنين (12 وضعية/ث)، وغيره بتسهيل `motion-easing-springs`.",
]

# ---------------------------------------------------------------- render
def md_catalog():
    out = ["# الكتالوج الكامل حسب الحاجة", "", "مولّد من `build.py`. لا تعدّله باليد.", ""]
    for key, label, q, entries in CATALOG:
        out += ["## %s" % label, "*%s*" % q, "", "| المصدر | ما يعطيه | متى | أين |", "| --- | --- | --- | --- |"]
        for name, gives, when, where in entries:
            out.append("| %s | %s | %s | %s |" % (name, gives or "—", when, where))
        out.append("")
    return "\n".join(out)

def md_vocab():
    out = ["# معنى الكلمة ← الحركة", "", "مولّد من `build.py`. لا تعدّله باليد.", "",
           "ابحث عن عائلة المعنى التي تنتمي إليها الكلمة، ثم اختر خيارًا لم يُستعمل قريبًا في الريل.", ""]
    for fam, cues, idea, opts in VOCAB:
        out += ["## %s" % fam, "**كلمات تدل عليها:** %s" % cues, "", "**الفكرة:** %s" % idea, ""]
        for i, (src, how) in enumerate(opts, 1):
            out.append("%d. %s: %s" % (i, src, how))
        out.append("")
    out += ["## ما لا يُحرَّك أو يُحرَّك بحذر", ""] + ["- " + d for d in DONT] + [""]
    return "\n".join(out)

(HERE / "references").mkdir(exist_ok=True)
(HERE / "references" / "catalog.md").write_text(md_catalog(), encoding="utf-8")
(HERE / "references" / "motion-vocabulary.md").write_text(md_vocab(), encoding="utf-8")
(HERE / "index.json").write_text(json.dumps({
  "catalog": [{"key": k, "label": l, "question": q,
               "entries": [{"name": n, "gives": g, "when": w, "where": wh} for n, g, w, wh in e]} for k, l, q, e in CATALOG],
  "motion_vocabulary": [{"family": f, "cues": c, "idea": i, "options": [{"source": s, "how": h} for s, h in o]} for f, c, i, o in VOCAB],
  "rules": DONT}, ensure_ascii=False, indent=1), encoding="utf-8")
print("catalog", sum(len(e) for *_, e in CATALOG), "entries; vocabulary", len(VOCAB), "families")
