<!-- مرجع لمهارة bunasser77 — طبقة أدوات الاستوديو — يُقرأ عند الحاجة فقط -->

# أدوات الاستوديو حول البلقن (7 نوفمبر 2026)

البلقن هو الأساس: المهارات داخله تقرر الشغل، والأدوات تحت تنفّذ أجزاء منه. ولا أداة تحل محل محرّك البلقن ولا قواعد بو ناصر. كلها مفتوحة المصدر ومثبّتة كمهارات بكلود كود في `~/.claude/skills`، ونسخها الأصلية في `studio/vendor` على جهازه.

## من يستخدم ماذا

| مرحلة الشغل | الأداة | المهارة اللي تناديها | المرجع |
| --- | --- | --- | --- |
| فحص الملف المصدر (مدة، أبعاد، fps، صوت) قبل التخطيط | `ffmpeg-skill` (`probe.py`) | video-ad-editor، montage-video، podcast-video | `video-ad-editor/references/review-tools.md` |
| فحص التسليم: مواصفات ريلز، مناطق الأمان، الصوت -14 LUFS، إطار أسود أو متجمد | `ffmpeg-skill` (`check.py` و`look.py` و`loudness.py`) | reel-delivery-checks، reel-review-loop | `review-tools.md` |
| Claude يشوف النسخة النهائية ويعطي ملاحظات بالثانية | `watch` (claude-video) | reel-review-loop قبل التسليم | `review-tools.md` |
| تفكيك ريل منافس أو مرجعي | `watch` | reel-style-fingerprint | `review-tools.md` |
| مشهد جاهز: رسم بيانات، خريطة، نص حركي، انتقال | `hyperframes` و`hyperframes-registry` | motion-video، video-ad-editor | `video-ad-editor/references/hyperframes.md` |
| تفكيك فيديو مرجعي إلى مشاهد HTML | `reverse-any-video` (HyperFrames) | reel-style-fingerprint، motion-video | `hyperframes.md` |
| شاشة تعديل حية، تصدير شفاف لدافنشي، دفعة ريلات من JSON | Remotion (`remotion-best-practices`) | video-ad-editor بطلبه فقط | `video-ad-editor/references/remotion.md` و`remotion-toolbox.md` |

الترتيب ما يتغيّر: الكابشن العربي يبقى من محرّك البلقن وقواعد `reel-caption-bidi-guard`. كاسر الأسطر في ffmpeg-skill (`--wrap phrase`) والكابشن في HyperFrames وRemotion ما يُعتمد عليها للعربي.

## الأسماء على هذا الجهاز

- `watch` مثبّتة كمهارة مستقلة، فتُنادى `/watch` (مب `/watch:watch`).
- سكربتات ffmpeg-skill بـ`~/.claude/skills/ffmpeg-skill/scripts`، وعلى ويندوز `python` بدل `python3`.
- HyperFrames: المهارات `hyperframes` و`hyperframes-cli` و`hyperframes-registry` و`media-use` و`reverse-any-video` و`slideshow` و`style-sampling`. والأداة نفسها `npx hyperframes`.
- Remotion: `remotion-best-practices` هي المدخل، وتحتها create وrender وcaptions وmaps والباقي.

## تجهيز جهاز جديد أو فحص الموجود

```powershell
powershell -ExecutionPolicy Bypass -File bunasser77/scripts/studio_setup.ps1 -CheckOnly   # يفحص بس
powershell -ExecutionPolicy Bypass -File bunasser77/scripts/studio_setup.ps1              # يثبّت الناقص
```
السكربت يثبّت بـwinget: Git وNode LTS وFFmpeg وPython 3.12 وyt-dlp وGitHub CLI، ثم ينسخ مهارات الأدوات الأربع من GitHub إلى `~/.claude/skills`، وما يلمس مهارة موجودة. بعده شغّل `python video-ad-editor/scripts/43_tools_check.py` للتأكد. التثبيت بإذن بو ناصر فقط.

## قواعد إلزامية

- **الخصوصية:** `watch` تشتغل محلياً افتراضياً. محرك Gemini يرفع الفيديو لقوقل، فما يُستخدم لمادة غير منشورة إلا بإذنه. المفاتيح بـ`~/.config/watch/.env` وما تنلصق بالمحادثة.
- **HyperFrames يرسل إشارة استخدام** لـHeyGen كل ما تبدأ المهارة (`npx hyperframes events`)، ومعه اسم المهارة. لو بو ناصر طلب يوقفها، اتبع خيار الإيقاف في الأداة.
- **رخصة Remotion:** مجانية للفرد والشركة اللي فيها ثلاثة موظفين أو أقل. لو الشغل لجهة أكبر بلّغه قبل الاستخدام.
- **OpenMontage مب مدمج** (رخصة AGPL ويحتاج مفاتيح مدفوعة، ومساره يتداخل مع motion-video وvideo-ad-editor).
- أداة ما اشتغلت؟ لا توقف الريل: كمّل بالمحرّك وقل لبو ناصر بجملة وش تعذّر.

## التحديث

النسخ تحت `~/.claude/skills` ما تتحدّث لحالها. للتحديث: `git pull` في `studio/vendor/<الأداة>` ثم أعد تشغيل `studio_setup.ps1 -Update`. وبعد تحديث HyperFrames شغّل `npx hyperframes skills update`.
