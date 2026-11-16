# إضافات Three.js المتاحة في المحرّك (r186)

كلها في `vendor/three/examples/jsm/` من الإصدار r186 نفسه الذي يستعمله المحرّك (رخصة MIT، النص في `licenses/threejs-LICENSE.txt`). تُستورد كما تُستورد `UnrealBloomPass`: تُضاف إلى `EffectComposer` بعد `RenderPass`، و`OutputPass` يبقى آخرها.

| الملف | التأثير | متى يفيد |
| --- | --- | --- |
| `postprocessing/FilmPass.js` (`FilmShader`) | حبيبات فيلم وخطوط مسح | ملمس أرشيفي أو سينمائي |
| `postprocessing/HalftonePass.js` (`HalftoneShader`) | نقاط هاف تون | ستايل Vox والجرائد في مشهد ثلاثي الأبعاد |
| `postprocessing/DotScreenPass.js` (`DotScreenShader`) | شاشة نقطية | طباعة قديمة وبوب آرت |
| `postprocessing/BokehPass.js` (`BokehShader`) | عمق ميدان | تركيز على شيء واحد |
| `shaders/HorizontalTiltShiftShader.js` + `VerticalTiltShiftShader.js` (عبر `ShaderPass`) | تيلت شفت، فيبدو المشهد مجسّمًا صغيرًا | الديوراما والمدن المصغّرة |
| `postprocessing/RenderTransitionPass.js` | **انتقال** بين مشهدين بقناع صورة | الانتقال من فكرة إلى فكرة داخل فيلم واحد |
| `postprocessing/RenderPixelatedPass.js` | بكسلة مع إبراز الحواف | ستايل بكسل، ومع مهارة `pixelfx` |
| `postprocessing/GlitchPass.js` (`DigitalGlitch`) | قلتش | كشف خطأ. **يستعمل `Math.random`**، فيُستبدل به مولّد ببذرة ثابتة مربوط بالفريم قبل الريندر، وإلا اختلف كل ريندر |
| `postprocessing/LUTPass.js` + `loaders/LUTCubeLoader.js` و`LUT3dlLoader.js` | تدريج ألوان بملف .cube أو .3dl | توحيد لون الريل، أو LUT مُصدَّر من دافنشي |
| `postprocessing/OutlinePass.js` | إطار مضيء حول شيء | تمييز عنصر في مشهد مزدحم |
| `postprocessing/SMAAPass.js` (`SMAAShader`) | تنعيم حواف أفضل من FXAA | الحواف الرفيعة والنص ثلاثي الأبعاد |
| `shaders/SepiaShader.js`، `BleachBypassShader.js`، `TechnicolorShader.js`، `ColorCorrectionShader.js`، `HueSaturationShader.js`، `BrightnessContrastShader.js`، `ExposureShader.js`، `ColorifyShader.js`، `LuminosityShader.js` | تدريجات جاهزة | سيبيا للأرشيف، وتباين قاسٍ، وألوان قديمة، وأبيض وأسود |
| `shaders/SobelOperatorShader.js` | استخراج الحواف | شكل رسم خطي فوق المشهد |
| `shaders/KaleidoShader.js` | مشكال | فاصل تجريدي |

كانت في المحرّك قبلها: `UnrealBloomPass` و`AfterimagePass` و`FXAAPass` و`RGBShiftShader` و`VignetteShader`.
