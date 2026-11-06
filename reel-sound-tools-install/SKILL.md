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
يحتاج بايثون وffmpeg.
```
git clone https://github.com/Clipwing/skills
cp -R skills/skills/real-sfx ~/.claude/skills/
cd ~/.claude/skills/real-sfx
python3 scripts/setup.py init --uisfx
python3 scripts/setup.py check
```
الخيار uisfx يضيف 78 صوت واجهة مجانية، مفيدة لأصوات ظهور النص والنقرات. بعد التركيب أضف مجلد أصوات المستخدم. طلب جاهز لـ Claude Code
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
على ويندوز يكون مسار بايثون داخل البيئة .venv\Scripts\python بدل .venv/bin/python.
في المستودع مهارتان إضافيتان، تُنسخان إلى مجلد skills في Claude. طلب جاهز
```
Use earshot to make a soft whoosh, 0.8 s long
```

## ترتيب الاستخدام
نفس ترتيب reel-sound-layer. Openverse وسونيس أولًا، ثم Real SFX للتوزيع على الفريم مع محاذاة الذروة، ثم Earshot أو إيليفن لابز لما ينقص.