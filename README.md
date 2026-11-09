# بوناصر٧٧

بلقن Claude خاص ببو ناصر، يجمع أدوات الفيديو والريلز والعرض الحي في مكان واحد.

## ما بداخله
| المهارة | عملها |
| --- | --- |
| bunasser77 | المدخل الرئيسي، يوجّه كل طلب للمهارة المناسبة |
| video-ad-editor | ريل أو إعلان من فيديو كلام، بكابشن عربي وموشن، ومعه الشاشة فوق الراس |
| motion-video | موشن قرافيكس بلا تصوير، وشرح المواقع والتطبيقات |
| motion-bilarabi | ريل موشن عربي من ٨ قوالب جاهزة، حركات الخط العربي، ومؤثرات على الشخص المصوَّر (محرّك يوسف الجبوري) |
| podcast-video | البودكاست والمقابلات بأكثر من كاميرا |
| montage-video | مقاطع بلا كلام على الإيقاع |
| thumbnail-video | كفر الريل وثمبنيل يوتيوب |
| davinci-video | تايملاين قابل للتعديل في دافنشي ريزولف ستوديو |
| davinci-learn-from-edits | يتعلّم ذوق بو ناصر من تعديلاته في دافنشي |
| instagram-reels-agent | إيجنت ريلز «حبر أبيض» من الرصد إلى المونتاج |
| live-stage-deck | شاشة العرض الحي التي تمشي بالصوت |

### المهارات المساندة (يحمّلها المدخل حسب نوع العمل)
| المجموعة | المهارات |
| --- | --- |
| أساس كل ريل | reel-style-broll-rules، reel-hook-families-free-sfx، reel-caption-bidi-guard، reel-sound-layer، reel-review-loop، reel-delivery-checks |
| الموشن | motion-script-discipline، motion-video-pre-build، motion-effects-bank، motion-easing-springs، motion-prompt-library، motion-timing-qa، mutqin-motion-prompts، reel-code-film-checks، shotcraft-motion-cards، hyperframes-blocks، katana-higgsfield-tips |
| ستايلات وبنى | reel-teaser-structure، reel-word-synced-board، reel-cutpaper-vox-style، reel-explainer-styles-archive، reel-style-fingerprint، overhead-screen-zoomout، reel-pause-policy، cinematic-camera-prompt-vocab |
| الصوت والأصول | reel-sound-tools-install، voicestudio-local-voice، reel-free-assets-sources |
| المراجعة والجهاز | reel-review-tools، reel-windows-mcp-tools |
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
