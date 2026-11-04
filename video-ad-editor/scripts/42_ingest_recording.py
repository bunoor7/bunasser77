# -*- coding: utf-8 -*-
"""🎥 42_ingest_recording.py — يستلم تسجيل شاشة جاهز (من Cap أو أي مسجّل) ويجهّزه لخط الريل.
   python3 42_ingest_recording.py <work> <ملف التسجيل> [--name screen]
   - يحوّله لـH.264 بـ30 فريم/ث ثابتة وأبعاد زوجية (تسجيلات Cap بوضع Studio أحياناً VFR) → <work>/<name>.mp4
   - يطبع الأبعاد ونسبتها ومدتها وهل فيه صوت، وسطر PH_W الجاهز لـ screen-recording.md (النسبة مقدّسة: بلا قص ولا تمديد)
   - ما يمسح الملف الأصلي، ويشتغل على نسخة بمجلد الشغل."""
import sys, os, json, subprocess

def probe(p):
    o = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height:format=duration",
                        "-of", "json", p], capture_output=True, text=True)
    if o.returncode: sys.exit("❌ ffprobe ما قدر يقرا الملف: " + o.stderr[:200])
    return json.loads(o.stdout)

def main():
    a = sys.argv[1:]
    pos = [x for i, x in enumerate(a) if not x.startswith("--") and (i == 0 or a[i - 1] != "--name")]
    if len(pos) < 2: print(__doc__); sys.exit(1)
    work, src = os.path.abspath(pos[0]), os.path.abspath(pos[1])
    name = a[a.index("--name") + 1] if "--name" in a else "screen"
    if not os.path.exists(src): sys.exit("❌ ما لقيت الملف " + src)
    os.makedirs(work, exist_ok=True)
    info = probe(src)
    v = next((s for s in info["streams"] if s["codec_type"] == "video"), None)
    if not v: sys.exit("❌ الملف بلا فيديو")
    has_audio = any(s["codec_type"] == "audio" for s in info["streams"])
    out = os.path.join(work, name + ".mp4")
    cmd = ["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2",
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p"]
    cmd += ["-c:a", "aac", "-b:a", "192k"] if has_audio else ["-an"]
    r = subprocess.run(cmd + [out], capture_output=True, text=True)
    if r.returncode: sys.exit("❌ فشل التحويل: " + r.stderr[:300])
    o = probe(out); ov = next(s for s in o["streams"] if s["codec_type"] == "video")
    w, h = int(ov["width"]), int(ov["height"]); dur = float(o["format"]["duration"])
    print("✅ %s ← %dx%d · نسبة h/w=%.3f · %.1f ث · %s" % (out, w, h, h / w, dur, "فيه صوت" if has_audio else "بلا صوت"))
    print("   سطر الإطار: const PH_H=1320, PH_W=Math.round(PH_H/%.3f);" % (h / w))
    print("   الخطوة التالية: references/screen-recording.md (استخراج اللقطات بـffmpeg وعلامات الضغط)")

if __name__ == "__main__":
    main()
