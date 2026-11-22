---
name: tripo-3d
description: "مجسّم ثلاثي الأبعاد حقيقي (GLB أو FBX) من نص أو صورة بأداة Tripo CLI، لريل أو فيلم موشن يحتاج شيئًا يدور أو يتفكك أو يتحرك: جهاز في شرح «شلون يشتغل»، منتج، قطعة، شعار، شخصية بهيكل عظمي وحركة جاهزة. يشمل التثبيت وتسجيل الدخول بلا لصق مفتاح، والتجربة المجانية قبل الدفع، وإدخال المجسّم في محرّك الموشن (three.js) أو HyperFrames. Use when a reel or motion scene needs a 3D model, mesh, GLB, object turntable, exploded device, rigged character, or when he says «مجسّم»، «ثلاثي الأبعاد»، «3D»، «Tripo»."
---

# مجسّمات ثلاثية الأبعاد بـ Tripo

Tripo لا يصنع فيديو. يصنع **مجسّمًا** (ملف GLB أو FBX مع صورة معاينة)، ثم نحرّكه نحن داخل فيلم الموشن. المهارة مساندة لـ `motion-video` و`hyperframes` و`reel-animation-templates`، ولا تحل محلها.

## متى نرجع لها

| ينفع | لا ينفع |
| --- | --- |
| شرح جهاز «اشرح لي شلون يشتغل …»: المجسّم يدور ثم يتفكك طبقات | ريل الكلام والكابشن والهوك المكتوب |
| منتج أو قطعة أو شعار من صورة واحدة، يدور مع الكاميرا في الهوك أو الخاتمة | الورق المقصوص والكولاج والستايلات المسطحة |
| شخصية بسيطة بهيكل عظمي وحركة جاهزة (مشي، تلويح) لريل شرح | معلم أو مبنى أو شخص **حقيقي** في ريل خبري أو تاريخي |
| شيء يكون **بطل المشهد**، لا خلفية | خلفيات وزخارف (البلوكات والصور أرخص) |

**قاعدة الدقة:** المجسّم المولَّد تقريبي. في ريلات الأخبار والتاريخ لا يُعرض كأنه الشيء الحقيقي (مبنى، سلاح، قطعة أثرية، علم، شعار جهة رسمية). هناك الصور والأرشيف الحقيقي من `reel-free-assets-sources` أسلم. وإن احتاج المشهد مجسّمًا للتوضيح، يقال ذلك لبو ناصر قبل البناء.

**قبل التوليد افحص البدائل:** مجسّم مجاني برخصة واضحة (`reel-free-assets-sources`)، أو أشكال three.js مبنية بالكود (`motion-video` و`video-ad-editor/references/machine-explainer.md`)، أو `generate_3d` في Higgsfield للمقارنة. Tripo حين يكون الشكل خاصًا ولا يُبنى بالكود بسهولة.

## الكلفة والموافقة

- التوليد الافتراضي (موديل P2) نحو **100 إلى 130 رصيدًا** للمجسّم. التلوين والتحويل والهيكل العظمي خطوات إضافية بتكلفة غير مقدّرة مسبقًا، وهذا لا يعني أنها مجانية.
- لا تنفيذ مدفوع قبل موافقة بو ناصر على الخطة والتكلفة. التجربة `--dry-run` مجانية دائمًا.
- لا إعادة توليد (`tripo redo`) ولا تغيير موديل من تلقاء نفسك. اعرض `preview.png` واسأل.
- رمز الخروج 4 (رصيد غير كافٍ): توقف فورًا، وأعطه رابط الشحن أو `tripo topup`، وانتظر تأكيده.

## التجهيز (مرة واحدة على الجهاز)

1. Node.js 20 أو أحدث: `node --version`.
2. `npm install -g tripo-cli`.
3. اسأله عن موقع حسابه إن لم يكن معروفًا (حساب بو ناصر على الموقع الدولي `ov`)، ثم `tripo login --region ov --no-wait`. أرسل له الرابط والرمز، وبعد ما يقول «تم» شغّل الأمر نفسه مرة ثانية.
4. `tripo doctor` للفحص، و`tripo balance` للرصيد.
5. **لا تطلب منه لصق المفتاح في المحادثة أبدًا.** المفتاح يُحفظ محليًا في `~/.tripo/config.json`.
6. الدليل الكامل: `tripo docs --llm`، وتفاصيل الأوامر: `tripo docs --topic commands/make` و`commands/generate` و`commands/process`.

في كل أمر ضع `TRIPO_CLIENT_APP=claude` (في PowerShell: `$env:TRIPO_CLIENT_APP = "claude"`).

## خطوات العمل

1. **حدّد المجسّم ووظيفته في المشهد:** ماذا يفعل (يدور، يتفكك، يمشي)، ومدة ظهوره، ومن أي زاوية يُرى. هذا يحدد هل نحتاج تلوينًا، وهل نحتاج هيكلًا عظميًا.
2. **المدخل:** صورة واضحة للشيء على خلفية بسيطة أفضل من النص. من 2 إلى 4 صور لزوايا مختلفة تعطي شكلًا أدق. البرومبت النصي بالإنجليزي، قصير ومحدد (المادة، اللون، الوضعية).
3. **الخطة المجانية أولًا:**
   ```bash
   tripo make ./device.png --for film --dry-run --json
   ```
   راجع `valid` و`warnings` و`generation_credits_estimate`، واعرضها عليه بجملتين.
4. **التنفيذ بعد موافقته**، والمخرجات داخل مجلد الريل نفسه:
   ```bash
   tripo make ./device.png --for film -o "<مجلد الريل>/3d" --json --yes
   ```
   الأمر يحجب حتى تنتهي الملفات (لا تقطعه قبل 15 دقيقة). النتيجة JSON فيها `model_file` و`preview` و`credits_consumed`.
5. **افحص `preview.png` بعينك** قبل إدخاله في الفيلم، واعرضه عليه.
6. **أدخله في المشهد** (القسم التالي)، ثم أكمل بقواعد `motion-video` وفحوصه كالمعتاد.

**إعدادات شائعة**
- مجسّم بلا ألوان (أرخص، لشكل خطي أو مادة واحدة نلوّنها بالكود): `-p texture=false -p pbr=false`.
- عدد مضلعات أخف للريندر السريع: `-p face_limit=15000`.
- شخصية تتحرك: `--for anim`، أو سلسلة `--then rig-check,rig,retarget:preset:walk`. التفاصيل في `tripo docs --topic commands/process`.
- لدافنشي فيوجن أو بلندر: `--then convert:fbx`.
- للمحرّك و HyperFrames: GLB كما هو (الافتراضي).

## إدخال المجسّم في محرّك الموشن

`GLTFLoader` موجود في `video-ad-editor/motion/vendor/three/examples/jsm/loaders/` (من r186 نفسه، من 1.49.0). ضع الملف داخل مجلد المشروع وحمّله قبل أول فريم، وكل حركة مربوطة بالوقت `t` لا بالساعة، حتى يطلع كل ريندر مثل الثاني:

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const gltf = await new GLTFLoader().loadAsync('./assets/device.glb');
const model = gltf.scene;
// توسيط وتحجيم: أطول ضلع = 2 وحدة
const box = new THREE.Box3().setFromObject(model);
const size = box.getSize(new THREE.Vector3()).length();
model.position.sub(box.getCenter(new THREE.Vector3()));
const holder = new THREE.Group(); holder.add(model);
holder.scale.setScalar(2 / size);
scene.add(holder);

// حركة جاهزة داخل الملف (شخصية بهيكل عظمي)
const mixer = gltf.animations.length ? new THREE.AnimationMixer(model) : null;
if (mixer) mixer.clipAction(gltf.animations[0]).play();

function frame(t) {               // t بالثواني من بداية المشهد
  holder.rotation.y = t * 0.6;    // دوران هادئ
  if (mixer) mixer.setTime(t);    // لا mixer.update(delta)
}
```

- **التفكيك طبقات:** المجسّم المولّد غالبًا قطعة واحدة. للتفكيك اطلب `--then segment` (يقسمه أجزاء)، أو ابنِ الطبقات الداخلية بالكود فوق الغلاف المولّد، كما في `video-ad-editor/references/machine-explainer.md`.
- **الإضاءة:** `RoomEnvironment` موجود في المحرّك، ويعطي الألوان المولّدة شكلًا طبيعيًا بلا إعداد طويل.
- **HyperFrames:** نفس الكود داخل التركيبة، والملف في مجلد المشروع. وقواعد التحميل قبل الريندر في `hyperframes`.

## الأخطاء

| رمز الخروج | المعنى | التصرف |
| --- | --- | --- |
| 2 | خطأ في المعطيات | صحّح الأمر، لا شيء صُرف |
| 3 | تسجيل الدخول | `tripo doctor` ثم أعد تسجيل الدخول |
| 4 | الرصيد | توقف واطلب الشحن |
| 5 | سياسة المحتوى | غيّر المدخل بعد سؤاله |
| 6 | فشلت المهمة | الرصيد يرجع تلقائيًا. إن كانت مهلة: `tripo task watch <id>`، لا إعادة |
| 7 | الشبكة | لا تعِد التشغيل. `tripo balance`، وإن نجحت المهمة: `tripo task get <id> --download` |
| 9 | ضغط على الخادم | انتظر ثم أعد المحاولة |

## المصدر

أداة Tripo CLI على npm (`tripo-cli`)، ودليلها المرفق معها (`tripo docs --llm`). لم يُنسخ منها شيء إلى البلقن، والنص هنا مكتوب بكلامنا.
