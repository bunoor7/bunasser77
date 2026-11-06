# -*- coding: utf-8 -*-
"""sound_library.py: فهرس مكتبة أصوات بو ناصر المحلية (يقرأ فقط، ما يعدّل الأصوات).

  python sound_library.py [<مجلد الأصوات>]            # يبني/يحدّث الفهرس
  python sound_library.py --find whoosh [--max 2.0]    # يبحث بالنوع أو الاستخدام أو جزء من الاسم

المجلد الافتراضي: متغير BUNASSER_SOUNDS، وإلا ~/Videos/Reels/studio/sound
يكتب في نفس المجلد:
  library.json  لكل صوت: المسار، النوع، الاستخدام، المدة، زمن الذروة، المقام (للبادات)
  library.md    جدول عربي للقراءة
تعديلاتك اليدوية في library.json (أي صوت فيه "manual": true) تبقى كما هي عند إعادة البناء.
يحتاج ffmpeg وffprobe فقط (بلا numpy).
"""
import array, json, os, re, subprocess, sys

AUDIO = {".wav", ".mp3", ".aac", ".m4a", ".flac", ".ogg", ".aif", ".aiff"}

# (النوع، كلمات في الاسم أو المجلد، الاستخدام)
RULES = [
    ("pad",        r"atlantic|ping boom|major_minor",           "خلفية أو ضربة بنفس مقام الموسيقى"),
    ("riser",      r"riser|rise_|swell",                          "قبل الكشف أو الهوك، بناء توتر"),
    ("whoosh-hit", r"whoosh hit|whoosh_hit|whoosh-hit|swish",     "انتقال ينتهي بضربة على الكشف"),
    ("impact",     r"impact|boom|hit\b|hits\b",                   "ضربة على لحظة مهمة"),
    ("whoosh",     r"whoosh|whsh|sweetener|slow motion|morph",    "حركة وانتقال بين المشاهد"),
    ("typing",     r"type|backspace|enter\b",                     "ظهور نص يُكتب أو يُمسح"),
    ("glitch",     r"glitch|flicker",                             "ظهور نص تقني أو قطع سريع"),
    ("countdown",  r"countdown|numbers|spin",                     "عداد أرقام أو دوران"),
    ("camera",     r"camera|flash|aperture|shutter",              "لقطة شاشة، فلاش، صورة تظهر"),
    ("money",      r"cash|coin|money|cha ching",                  "أرقام مالية، سعر، ربح"),
    ("texture",    r"granular|texture|paper|abstract|flip",       "طبقة جو أو انتقال ورقي"),
    ("mechanical", r"gear|reload|mechanical|winding|lock",        "قفل، تركيب، حركة ميكانيكية"),
    ("alert",      r"notification|alert|beep|blip|confirm|wrong|disapprov|radio", "تنبيه، صح أو خطأ، إشعار"),
    ("ui-click",   r"click|ui|pop|snap|button|menu",              "ظهور عنصر أو أيقونة أو كلمة"),
]
KEY = re.compile(r"\b([A-G](?:#_[A-G]b|#)?)\.(?:wav|mp3)$", re.I)


def classify(rel):
    low = rel.lower().replace("\\", "/")
    for kind, pat, use in RULES:
        if re.search(pat, low):
            return kind, use
    return "misc", "حسب السمع"


def probe(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                          "format=duration:stream=sample_rate,channels", "-of", "json", path],
                         capture_output=True, text=True, encoding="utf-8", errors="replace")
    try:
        j = json.loads(out.stdout)
        s = (j.get("streams") or [{}])[0]
        return float(j["format"]["duration"]), int(s.get("sample_rate", 0)), int(s.get("channels", 0))
    except Exception:
        return None, 0, 0


def peak_time(path, rate=4000):
    """زمن أعلى لحظة صوت (ثانية)، بدقة 1/4000 ثانية: يكفي لمحاذاة الذروة على الفريم."""
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(rate),
                          "-f", "s16le", "-"], capture_output=True).stdout
    a = array.array("h", raw[: len(raw) // 2 * 2])
    if not a:
        return None
    i = max(range(len(a)), key=lambda k: abs(a[k]))
    return round(i / rate, 3)


def build(root):
    jpath = os.path.join(root, "library.json")
    old = {}
    if os.path.exists(jpath):
        with open(jpath, encoding="utf-8") as f:
            old = {s["file"]: s for s in json.load(f).get("sounds", [])}
    sounds = []
    for dp, dn, fn in os.walk(root):
        dn.sort()
        for name in sorted(fn):
            if os.path.splitext(name)[1].lower() not in AUDIO:
                continue
            full = os.path.join(dp, name)
            rel = os.path.relpath(full, root).replace("\\", "/")
            prev = old.get(rel)
            if prev and prev.get("manual"):
                sounds.append(prev)
                continue
            if prev and prev.get("bytes") == os.path.getsize(full) and prev.get("duration"):
                dur, sr, ch, pk = prev["duration"], prev.get("sample_rate", 0), prev.get("channels", 0), prev.get("peak_s")
            else:
                dur, sr, ch = probe(full)
                pk = peak_time(full) if dur and dur <= 30 else None
            kind, use = classify(rel)
            k = KEY.search(name)
            sounds.append({
                "file": rel, "group": rel.split("/")[0] if "/" in rel else "",
                # مجلد «Most used» = اختيارات بو ناصر المفضلة، تُقدَّم على غيرها من نفس النوع
                "favorite": rel.lower().startswith("most used/"),
                "kind": kind, "use": use,
                "duration": round(dur, 2) if dur else None, "peak_s": pk,
                "key": k.group(1).replace("_", "/") if (k and kind == "pad") else None,
                "sample_rate": sr, "channels": ch, "bytes": os.path.getsize(full),
            })
            print(f"  {kind:<11} {dur or 0:6.2f}s  {rel}")
    data = {"root": os.path.abspath(root), "count": len(sounds), "sounds": sounds}
    with open(jpath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    write_md(root, sounds)
    print(f"\n{len(sounds)} صوت. الفهرس: {jpath}")


def write_md(root, sounds):
    lines = ["# مكتبة أصوات بو ناصر", "",
             f"المجلد: `{os.path.abspath(root)}` · {len(sounds)} صوت. يُبنى بـ`sound_library.py`، لا تعدّله يدوياً (عدّل library.json وضع \"manual\": true).",
             "⭐ = من مجلد Most used، مفضّل بو ناصر، يُقدَّم على غيره من نفس النوع. الذروة = زمن أعلى لحظة صوت داخل الملف (للمحاذاة على الفريم).", ""]
    kinds = {}
    for s in sounds:
        kinds.setdefault(s["kind"], []).append(s)
    for kind, _, use in RULES + [("misc", "", "حسب السمع")]:
        items = kinds.get(kind)
        if not items:
            continue
        lines += [f"## {kind} ({len(items)}): {items[0]['use']}", "", "| الملف | المدة | الذروة | المقام |", "| --- | --- | --- | --- |"]
        for s in sorted(items, key=lambda s: not s.get("favorite")):
            lines.append(f"| {'⭐ ' if s.get('favorite') else ''}{s['file']} | {s['duration'] or '?'}s | {'' if s['peak_s'] is None else str(s['peak_s']) + 's'} | {s['key'] or ''} |")
        lines.append("")
    with open(os.path.join(root, "library.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


def find(root, term, max_dur=None):
    with open(os.path.join(root, "library.json"), encoding="utf-8") as f:
        sounds = json.load(f)["sounds"]
    t = term.lower()
    hits = [s for s in sounds if t in s["kind"] or t in s["use"] or t in s["file"].lower()]
    if max_dur:
        hits = [s for s in hits if s["duration"] and s["duration"] <= max_dur]
    for s in sorted(hits, key=lambda s: (not s.get("favorite"), s["duration"] or 99)):
        print(f"{'*' if s.get('favorite') else ' '} {s['kind']:<11} {s['duration']}s peak={s['peak_s']}  {os.path.normpath(os.path.join(root, s['file']))}")
    if not hits:
        print("ما فيه نتيجة. جرّب نوعاً: " + ", ".join(k for k, _, _ in RULES))


if __name__ == "__main__":
    args = sys.argv[1:]
    root = os.environ.get("BUNASSER_SOUNDS") or os.path.expanduser("~/Videos/Reels/studio/sound")
    if args and not args[0].startswith("--"):
        root = args.pop(0)
    if "--find" in args:
        i = args.index("--find")
        mx = float(args[args.index("--max") + 1]) if "--max" in args else None
        find(root, args[i + 1], mx)
    else:
        build(root)
