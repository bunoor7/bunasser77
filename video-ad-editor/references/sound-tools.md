<!-- مرجع لسكل video-ad-editor — يُقرأ عند الحاجة فقط (توفير توكنز) -->

### ثلاث أدوات مجانية لمؤثرات الريل الصوتية (5 نوفمبر 2026)

المصدر ملخص منشور بتاريخ 27 أكتوبر 2026، فتحقق من المستودعات قبل التركيب لأن الأوامر قد تتغير. **قواعد الرخص والمستويات والخفض تحت الكلام** تبقى بمهارة `reel-sound-layer`، وهذا المرجع يضيف التركيب والاختيار فقط.

**لماذا يطلع الصوت وحشاً:** Claude لا يسمع. يضع الصوت بالتخمين فيقع على فريم غلط أو بمستوى عالٍ أو واطئ. الأدوات الثلاث تعالج ذلك بصوت حقيقي في مكانه وبالمستوى الصحيح.

## جدول الاختيار
| الحاجة | الأداة |
|---|---|
| صوت حقيقي جاهز للتحميل | Openverse API |
| وضع الصوت على الفريم الصحيح داخل الفيديو | Real SFX |
| ما لقيت الصوت اللي بدماغك، يُولَّد بالكود | Earshot |

## 1) Openverse API
بلا تركيب. الصق الطلب بكلود كود:
```
Find 3 short whoosh sounds on Openverse
(api.openverse.org/v1/audio/?q=whoosh&license=cc0,pdm),
download them to ./sfx and list each file's license.
```
⛔ أبقِ فلتر الرخصة `cc0,pdm` (تجاري بلا ذكر مصدر). الملخص المنشور يقترح `cc0,by`، ولا تستخدم BY إلا بعد إخبار بو ناصر وتسجيل اسم الصوت وصاحبه بـ`attribution.txt`. ولا تقبل أي رخصة فيها NC أو ND.

## 2) Real SFX من Clipwing
يقرأ التايملاين ويحدد كل لحظة تحتاج صوتاً ويضعه على الفريم. يحتاج بايثون وffmpeg.
```
git clone https://github.com/Clipwing/skills
cp -R skills/skills/real-sfx ~/.claude/skills/
cd ~/.claude/skills/real-sfx
python3 scripts/setup.py init --uisfx
python3 scripts/setup.py check
```
الخيار `--uisfx` يضيف 78 صوت واجهة مجانية، مفيدة لظهور النص والنقرات. بعد التركيب أضف مجلد أصواتك وقل لكلود كود:
```
Add sound design to out/promo.mp4 with real-sfx
```
قبل الاعتماد تأكد أنه يتوافق مع صيغة التايملاين (دافنشي أو الرندر البرمجي)، وإلا وزّع يدوياً بقواعد `reel-sound-layer` مع محاذاة ذروة المؤثر لا بدايته.

## 3) Earshot من Leonxlnx
يولّد الصوت بالكود على المعالج بلا كرت شاشة. أول تشغيل ينزّل نحو 1.1 جيجا مرة واحدة، وفيه 252 صوتاً جاهزاً.
```
git clone https://github.com/Leonxlnx/earshot
cd earshot
python3 -m venv .venv
.venv/bin/python -m pip install torch --index-url https://download.pytorch.org/whl/cpu
.venv/bin/python -m pip install -e ".[mcp,llm,dev]"
claude mcp add earshot --scope user -- $PWD/.venv/bin/python -m earshot mcp
```
على ويندوز مسار بايثون داخل البيئة `.venv\Scripts\python` بدل `.venv/bin/python`. بالمستودع مهارتان إضافيتان تُنسخان لمجلد skills. طلب جاهز:
```
Use earshot to make a soft whoosh, 0.8 s long
```

## الترتيب
Openverse أولاً، ثم Real SFX للتوزيع على الفريم مع محاذاة الذروة، ثم Earshot لما ينقص. اذكر لبو ناصر الصوت الناقص والمصدر، واعرض عليه جدول المستويات قبل الرندر النهائي.
