# بوناصر٧٧

بلقن Claude خاص ببو ناصر، يجمع أدوات الفيديو والريلز والعرض الحي في مكان واحد.

## ما بداخله
| المهارة | عملها |
| --- | --- |
| bunasser77 | المدخل الرئيسي، يوجّه كل طلب للمهارة المناسبة |
| video-ad-editor | ريل أو إعلان من فيديو كلام، بكابشن عربي وموشن، ومعه الشاشة فوق الراس |
| motion-video | موشن قرافيكس بلا تصوير، وشرح المواقع والتطبيقات |
| motion-bilarabi | ريل موشن عربي من ٨ قوالب جاهزة، حركات الخط العربي، ومؤثرات على الشخص المصوَّر (محرّك يوسف الجبوري) |
| reel-style-board | لوحة ٥٧ ستايل حركة بالصور، يختار منها بالرقم وقت الإنتاج (من video-director) |
| reel-code-film-styles | ٦٦ ستايل فيلم بالكود مع وصفة بناء لكل ستايل ولوحة بالأرقام، منها نشرة أخبار وتحقيق بصري وأقمار صناعية (من Lemo-Opuscar)، و٣٣ ستايلًا إضافيًا بفهرس ولقطات |
| reel-animation-templates | ست قوالب أنيميشن بالكود بأمر واحد: رسم بياني بعدّاد، مسار خريطة 3D، تفكيك جهاز، خطوط بسيطة، شخصيات عيدان، كرتون 3D «ماذا لو» (من claude-animation-skills) |
| agents/ (مساعدين) | `studio-helper` و`session-reviewer` بنموذج Haiku، و`browser-media-maker` و`web-researcher` بنموذج Sonnet: مهام روتينية بنموذج أرخص عشان يتوفّر الرصيد |
| reel-text-humanizer | يشيل علامات كتابة الذكاء الاصطناعي من الكابشن والسكربت ونص الشاشة (مكيّفة من Humanizer) |
| podcast-video | البودكاست والمقابلات بأكثر من كاميرا |
| montage-video | مقاطع بلا كلام على الإيقاع |
| tripo-3d | مجسّم ثلاثي الأبعاد (GLB أو FBX) من نص أو صورة بأداة Tripo CLI، يدخل فيلم الموشن ويدور أو يتفكك أو يتحرك |
| review-video | ريل مراجعة منتج بتعليق صوتي |
| thumbnail-video | كفر الريل وثمبنيل يوتيوب |
| davinci-video | تايملاين قابل للتعديل في دافنشي ريزولف ستوديو |
| davinci-learn-from-edits | يتعلّم ذوق بو ناصر من تعديلاته في دافنشي |
| instagram-reels-agent | إيجنت ريلز «حبر أبيض» من الرصد إلى المونتاج |
| live-stage-deck | شاشة العرض الحي التي تمشي بالصوت |

### المهارات المساندة (يحمّلها المدخل حسب نوع العمل)
| المجموعة | المهارات |
| --- | --- |
| أساس كل ريل | reel-style-broll-rules، reel-hook-families-free-sfx، reel-caption-bidi-guard، reel-sound-layer، reel-review-loop، reel-delivery-checks |
| الموشن | motion-script-discipline، motion-video-pre-build، motion-effects-bank، motion-easing-springs، motion-prompt-library، motion-timing-qa، mutqin-motion-prompts، continuous-camera-motion-reel، reel-library-index، antialgorithm، openfilm-studio، motion-recipes، pixelfx، reel-telling-kit، reel-code-film-checks، shotcraft-motion-cards، hyperframes-blocks، katana-higgsfield-tips |
| الصوت الحقيقي | real-sfx، real-sound، earshot |
| ستايلات وبنى | reel-teaser-structure، reel-word-synced-board، reel-cutpaper-vox-style، reel-explainer-styles-archive، reel-style-fingerprint، overhead-screen-zoomout، reel-pause-policy، cinematic-camera-prompt-vocab |
| الصوت والأصول | reel-sound-tools-install، voicestudio-local-voice، reel-free-assets-sources |
| المراجعة والجهاز | reel-review-tools، reel-windows-mcp-tools، video-tool-verdict |
| بعد النشر | reel-performance-review، social-hook-performance-lab |

### أدوات الاستوديو المفتوحة المصدر (داخل البلقن من 1.15.0)
| الأداة | المهارات |
| --- | --- |
| فحص وقص وتسليم بـFFmpeg | ffmpeg-skill |
| Claude يشوف الفيديو | watch |
| HyperFrames (فيديو من HTML) | hyperframes، hyperframes-cli، hyperframes-registry، media-use، reverse-any-video، style-sampling، slideshow، figma، remotion-to-hyperframes |
| Remotion (فيديو بـReact) | remotion-best-practices، remotion-create، remotion-render، remotion-studio، remotion-captions، remotion-maps، remotion-markup، remotion-multimedia، remotion-interactivity، remotion-docs، remotion-saas، remotion-upgrade، remotion-license |

تحتاج FFmpeg وNode وPython على الجهاز، وتجهيزها بـ`bunasser77/scripts/studio_setup.ps1`. التفاصيل في `bunasser77/references/studio-tools.md`، والرخص في `THIRD_PARTY.md`.

## التنصيب
في Claude Code
```
/plugin marketplace add bunoor7/bunasser77
/plugin install bunasser77@bunasser77
```
وفي تطبيق Claude ارفع ملف `bunasser77.plugin` من صفحة الإصدارات.

## المصادر والرخصة
محرّك الفيديو والدافنشي والعرض الحي مبنية على بلقنات ماجد الزعابي (majed-video و majed-davinci و majed-live-stage) برخصة MIT. نص الرخصة في `LICENSE`، وسجل الدمج والإضافات في `CHANGES.md`. أدوات الاستوديو لأصحابها برخصها، ومصادرها في `THIRD_PARTY.md`.
