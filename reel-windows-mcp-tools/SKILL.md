---
name: "reel-windows-mcp-tools"
description: "Use when making reels on Windows with Claude Code and needing website screen captures via Playwright MCP, voice-over via ElevenLabs MCP, or a quick full edit with Reel Studio. Complements video-ad-editor."
---

# أدوات الريلز على ويندوز (MCP)

هذي الأدوات تكمّل مهارة video-ad-editor ولا تستبدلها. الشغل كله على ويندوز: استخدم python لا python3، والمسارات بصيغة C/…

## Playwright: لقطات المواقع

- التثبيت من الطرفية: claude mcp add playwright npx @playwright/mcp@latest
- يلزم Node.js بإصدار 18 أو أحدث.
- استخدمه لفتح موقع الأداة التي تشرحها، وتصوير الصفحة الرئيسية وصفحة الأسعار، وحفظ اللقطات في مجلد screens.
- اللقطات تدخل الشاشة فوق الراس أو زوم آوت (راجع overhead-screen-zoomout).
- لا تستخدمه للدخول إلى حسابات حساسة.

## ElevenLabs: صوت سحابي

- الخيار الأول يبقى الصوت المحلي (voicestudio-local-voice). استخدم ElevenLabs عند الحاجة لصوت سحابي.
- التثبيت: claude mcp add --transport http elevenlabs https://api.elevenlabs.io/v1/mcp ثم /mcp لتسجيل الدخول.
- تجاهل الشروحات القديمة التي تطلب مفتاح API وأمر uvx، فالخادم القديم مهجور.

## Reel Studio: مونتاج سريع كامل

- مجاني بترخيص MIT، ويعمل على ويندوز فقط.
- مفيد للمونتاج السريع. للتحكم الدقيق يبقى video-ad-editor أو دافنشي هو الخيار.
- التثبيت: أنشئ مجلدًا فارغًا وافتحه في تبويب Code، ثم اطلب من Claude تنزيل المستودع https://github.com/mohamedabdou-ai/reel-studio واتباع AGENTS.md فيه.
- ضع الفيديو الخام في مجلد Raw، وافتح جلسة جديدة في المجلد نفسه.
- قبل حذف أي كلام اعرض التفريغ واسأل صاحب الفيديو أولًا.

## قواعد عامة

- لا تنشر أي شيء تلقائيًا، والتسليم ملف فقط.
- أي أداة لا تعمل في البيئة الحالية، انزل للبديل واذكره بسطر واحد.