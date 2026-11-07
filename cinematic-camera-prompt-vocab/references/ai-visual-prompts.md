<!-- مرجع لقاعدة «اقتراح صور ولقطات مولّدة» في bunasser77/SKILL.md (7 نوفمبر 2026) -->

# اقتراح صور ولقطات مولّدة: برومبتات إنقليزية جاهزة

بو ناصر ينتج الصور والفيديوهات بنفسه بأدوات الذكاء الاصطناعي. شغلك تقترح **وش ينحط** و**تكتب البرومبت** جاهز للنسخ.

## متى

بعد اعتماد السكربت و`facts.md`، وقبل بناء المشاهد. ولو طلبها في أي وقت.

## شكل الاقتراح (بالعربي، والبرومبت وحده بالإنقليزي)

لكل مشهد:

1. **رقم المشهد والجملة** اللي ينحط عليها من السكربت (ونص الجملة).
2. **النوع:** صورة ثابتة، أو لقطة فيديو (مع المدة: 4 إلى 8 ثواني).
3. **الفكرة بسطر عربي:** وش تعبّر عنه ولماذا هنا. تعبيري (رمز للفكرة) أو تمثيلي (يمثّل الحدث نفسه).
4. **البرومبت** داخل بلوك كود:

````
```text
[SUBJECT] …
[SETTING] …
[ACTION / MOTION] …   (للفيديو: حركة الموضوع + حركة الكاميرا)
[CAMERA] camera body, lens, focal length, aperture  ← من SKILL.md بهالمهارة
[LIGHTING] …
[MOOD] …
[COLOR] palette from theme.json (hex values)
[FORMAT] vertical 9:16, 1080x1920, photorealistic / stylized …
[DURATION] 6s   (للفيديو فقط)
[NEGATIVE] no text, no letters, no numbers, no logos, no watermarks, no real identifiable people
```
````

5. **وين يتركّب بالفيلم:** خلفية كاملة، أو داخل كرت، أو تحت الرسم (شارت/رقم يطلع فوقها من المحرّك).

بعد القائمة: جدول قصير (المشهد ← النوع ← المدة) عشان يعرف كم صورة وكم لقطة.

## قواعد البرومبت

- **مفصّل:** الموضوع، المكان، الحركة، الكاميرا، الإضاءة، الإحساس، الألوان، المقاس. ولا برومبت سطر واحد عام.
- **عمودي 9:16** دايماً إلا لو قال غير.
- **الألوان من `theme.json`** (اكتب قيم hex بالبرومبت) عشان اللقطات تركب على هوية الفيلم.
- **بلا نص ولا أرقام ولا شعارات داخل الصورة.** كل رقم أو اسم يطلع على الشاشة يكتبه المحرّك من `facts.md`، لأن المولّدات تخرّب الحروف العربية والأرقام.
- **بلا أشخاص حقيقيين معروفين** (رؤساء، مسؤولين، مشاهير) وبلا شعارات شركات حقيقية: استعمل رمزاً (منصة خطابة فاضية، مبنى حكومي عام، رقاقة إلكترونية عامة بلا علامة).
- **بلا مشاهد مضلّلة:** اللقطة التمثيلية ما توحي إن حدثاً صار وهو ما صار (مثلاً لا تصوّر مركز بيانات مقفول بالشمع الأحمر والقيود بس مخاوف).
- **للفيديو:** حركة كاميرا وحدة واضحة (slow push-in، orbit، dolly، crane down…) وحركة موضوع وحدة، ولا تكدّس.
- **الكاميرا:** كاميرا وحدة وعدسة وحدة وبعد بؤري واحد وفتحة وحدة من جدول `SKILL.md` بهالمهارة، وفي آخر البرومبت.
- اقترح **5 إلى 8 مشاهد** لريل 60 إلى 90 ثانية، وأكثر شوي للأطول. المشاهد اللي يكفيها رسم المحرّك (شارت، رقم، عداد) لا تقترح لها صورة.

## مثال (من ريل هبوط أسهم الذكاء الاصطناعي، نوفمبر 2026)

**المشهد 1، الهوك:** «ڨرابة ثلاثة تريليونات دولار… انمسحت» · لقطة فيديو 6 ث · تعبيري: شاشة تداول حمراء تنهار في قاعة فاضية.

```text
[SUBJECT] A vast, empty trading floor at night, rows of monitors all glowing deep red with falling candlestick charts (abstract, unreadable)
[SETTING] Modern financial exchange hall, glass and steel, rain streaks on tall windows behind
[ACTION / MOTION] Screens flicker and the red charts cascade downward; slow camera push-in down the central aisle
[CAMERA] Full-Frame Cine Digital, Classic Anamorphic lens, 35mm, f/2.0
[LIGHTING] Low-key, red monitor glow as the only key light, cold blue rim light from the windows
[MOOD] Tense, sudden, ominous silence
[COLOR] dominant #C0262D red against #0B0B0F near-black, small accents of #F5F7FA
[FORMAT] vertical 9:16, 1080x1920, photorealistic
[DURATION] 6s
[NEGATIVE] no readable text, no numbers, no logos, no watermarks, no people
```

**المشهد 6، مراكز البيانات والكهرباء** · لقطة فيديو 6 ث · تمثيلي: مركز بيانات ضخم بالصحراء وخطوط كهرباء مشدودة.

```text
[SUBJECT] A massive windowless data center campus with cooling towers, high-voltage power lines converging on it
[SETTING] Flat desert plain at dusk, Texas-like landscape, distant city lights on the horizon
[ACTION / MOTION] Heat shimmer rises from the roofs, power lines hum; slow aerial crane-down from high above toward the main building
[CAMERA] Grand Format 70mm Film, Vintage Prime lens, 24mm, f/8
[LIGHTING] Golden-hour fading to blue hour, industrial sodium lights flicking on
[MOOD] Enormous scale, quiet unease about energy and cost
[COLOR] warm #C98B18 amber sky fading into #101828 deep navy, white #F5F7FA facility lights
[FORMAT] vertical 9:16, 1080x1920, photorealistic
[DURATION] 6s
[NEGATIVE] no text, no signage, no company logos, no watermarks, no identifiable people
```
