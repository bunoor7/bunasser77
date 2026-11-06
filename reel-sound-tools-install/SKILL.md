---
name: "reel-sound-tools-install"
description: "يُستخدم مع reel-sound-layer عند تركيب أو تشغيل Real SFX وEarshot وOpenverse لأول مرة، أو عند الاختيار بينها بحسب الحاجة."
---

# تركيب أدوات المؤثرات الصوتية وجدول الاختيار

تكمّل reel-sound-layer ولا تستبدلها. قواعد الرخص والمستويات والخفض تبقى مرجعها هناك. المصدر ملخص منشور بتاريخ 27 أكتوبر 2026، فتحقق من المستودعات قبل التركيب لأن الأوامر قد تتغير.

## لماذا يطلع الصوت وحشًا
Claude لا يسمع. يضع الصوت بالتخمين فيقع على فريم غلط أو بمستوى غير مناسب. هذه الأدوات تعالج ذلك بصوت حقيقي في مكانه وبالمستوى الصحيح.

## جدول الاختيار
- أريد صوتًا حقيقيًا جاهزًا للتحميل، استخدم Openverse.
- أريد وضع الصوت على الفريم الصحيح داخل الفيديو، استخدم Real SFX.
- لا أجد الصوت الذي في رأسي، ولّده بـ Earshot.

## Openverse
لا تركيب. الصق الطلب في Claude Code. أبقِ فلتر الرخصة على cc0,pdm كما في reel-sound-layer، ولا تستخدم cc0,by إلا بعد إخبار المستخدم وتسجيل اسم صاحب الصوت في attribution.txt.

## Real SFX من Clipwing
**من 1.17.0 صارت داخل البلقن** (`bunasser77:real-sfx`) ومعها أصوات uisfx الـ78، ومضبوطة على مكتبة بو ناصر (`studio\sound`) بملف `real-sfx/config.json`، وفهرسها بـ`studio\sound\real-sfx-index.json`. ما تحتاج تركيب، تحتاج بايثون وffmpeg بس.
- فحص: `python real-sfx/scripts/setup.py check`
- إذا ضاف بو ناصر أصواتاً: شغّل `python reel-sound-layer/scripts/sound_library.py` (يحدّث catalog.csv) ثم `python real-sfx/scripts/build_index.py`
- على جهاز ثاني مساره مختلف: `REAL_SFX_CONFIG` يشير لملف config خاص بذاك الجهاز.

طريقة التركيب القديمة (لو احتاجها بلا البلقن):
```
git clone https://github.com/Clipwing/skills
cp -R skills/skills/real-sfx ~/.claude/skills/
cd ~/.claude/skills/real-sfx
python3 scripts/setup.py init --uisfx
python3 scripts/setup.py check
```
طلب جاهز لـ Claude Code
```
Add sound design to out/promo.mp4 with real-sfx
```

## Earshot من Leonxlnx
يعمل على المعالج بلا كرت شاشة. أول تشغيل ينزّل نحو 1.1 جيجا مرة واحدة. فيه 252 صوتًا جاهزًا معمولًا بالكود.
```
git clone https://github.com/Leonxlnx/earshot
cd earshot
python3 -m venv .venv
.venv/bin/python -m pip install torch --index-url https://download.pytorch.org/whl/cpu
.venv/bin/python -m pip install -e ".[mcp,llm,dev]"
claude mcp add earshot --scope user -- $PWD/.venv/bin/python -m earshot mcp
```
على ويندوز يكون مسار بايثون داخل البيئة .venv\Scripts\python بدل .venv/bin/python، وأمر المهارة يصير:
`claude mcp add earshot --scope user -- C:\Users\bunoo\Videos\Reels\studio\vendor\earshot\.venv\Scripts\python.exe -m earshot mcp`
مهارتا المستودع (`earshot` و`real-sound`) **صارت داخل البلقن من 1.17.0**، بس الأداة نفسها (بايثون وtorch وMCP) لازم تتركّب على الجهاز، والتركيب بإذن بو ناصر. طلب جاهز
```
Use earshot to make a soft whoosh, 0.8 s long
```

## ترتيب الاستخدام
نفس ترتيب reel-sound-layer. مكتبة بو ناصر المحلية ثم سونيس وOpenverse، ثم Real SFX للتوزيع على الفريم مع محاذاة الذروة، ثم Earshot أو إيليفن لابز لما ينقص.