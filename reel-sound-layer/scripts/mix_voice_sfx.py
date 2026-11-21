# -*- coding: utf-8 -*-
r"""أداة الصوت الثابتة لريلات حبر أبيض (قاعدة الصوت الثابتة في reel-sound-layer/SKILL.md).
   python -I reel-sound-layer/scripts/mix_voice_sfx.py <مجلد المشروع> --video <فيديو بلا صوت أو بصوت قديم> [--voice vo/vo_full.wav] [--sfx sfx_plan.json] [--out <الناتج.mp4>]
   1) الصوت لحاله ← ‎-16 LUFS   2) كل مؤثر بالنسبة لمستوى الكلام: gain = كم dB تحت صوتك
   3) المزج ← ‎-14 LUFS، الذروة ‎-2 dBTP   4) يحفظ stems/voice.wav و stems/sfx.wav ويطبع فحص المستويات
   sfx_plan.json: [{file, at, gain, anchor, dur?, noduck?, note}]
     file: مسار نسبي للمشروع، أو @sound/… (C:\Edit with AI\Sound\library)
     at: ثواني | word:l2:0 | scene:s3 | line:l4 | line-end:l4 (+/- إزاحة)  ← من timeline.json بالمشروع
     anchor: peak (الافتراضي) | start | end | ثواني"""
import json, os, re, subprocess, sys, argparse
import numpy as np

ap = argparse.ArgumentParser(); ap.add_argument("proj"); ap.add_argument("--video", required=True)
ap.add_argument("--voice", default="vo/vo_full.wav"); ap.add_argument("--sfx", default="sfx_plan.json"); ap.add_argument("--out")
A = ap.parse_args()
P = os.path.abspath(A.proj)
SOUND = next((d for d in [os.environ.get("BUNASSER_SOUNDS", ""), r"C:\Edit with AI\Sound\library",
              r"C:\Users\bunoo\Videos\Reels\studio\sound"] if d and os.path.isdir(d)), "")   # مكتبة بو ناصر
SR = 48000
VOICE_DB = 0.0        # الصوت مضبوط لحاله على ‎-16 LUFS
SFX_BUS_DB = 0.0      # بلا خفض عام: كل مؤثر بخفضه الثابت (مثل ريل بوتين)
DUCK_DB = 0.0         # بلا خفض تلقائي
ATTACK, RELEASE = 0.02, 0.30
FFMPEG = "ffmpeg"

def decode(path):
    r = subprocess.run([FFMPEG, "-v", "error", "-i", path, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True)
    return np.frombuffer(r.stdout, dtype=np.float32).reshape(-1, 2).copy()

def db(x): return 10 ** (x / 20)

T = json.load(open(os.path.join(P, "timeline.json"), encoding="utf-8"))
VO = {v["id"]: v for v in T["vo"]}
SC = {s["id"]: s for s in T["scenes"]}

def resolve(at):
    if isinstance(at, (int, float)): return float(at)
    m = re.match(r"^(.*?)([+-]\d+(?:\.\d+)?)?$", at)
    base, off = m.group(1), float(m.group(2) or 0)
    k = base.split(":")
    if k[0] == "word":
        w = VO[k[1]]["words"]; i = int(k[2]); t = w[i]["s"]
    elif k[0] == "scene": t = SC[k[1]]["start"]
    elif k[0] == "line": t = VO[k[1]]["start"]
    elif k[0] == "line-end": t = VO[k[1]]["end"]
    else: t = float(base)
    return t + off

vn = os.path.join(P, "stems", "voice_m16.wav"); os.makedirs(os.path.dirname(vn), exist_ok=True)
subprocess.run([FFMPEG, "-v", "error", "-y", "-i", os.path.join(P, A.voice), "-af", "loudnorm=I=-16:TP=-2:LRA=11", "-ar", str(SR), vn], check=True)
voice = decode(vn)
dur = max(len(voice) / SR, T["duration"]) + 0.5
N = int(dur * SR)
vbus = np.zeros((N, 2), np.float32); vbus[:len(voice)] = voice[:N] * db(VOICE_DB)
sbus = np.zeros((N, 2), np.float32)
nbus = np.zeros((N, 2), np.float32)   # مؤثرات بلا خفض (الخاتمة)

_vm = voice.mean(axis=1); _h = int(0.05 * SR); _n = len(_vm) // _h
_r = np.sqrt((_vm[: _n * _h].reshape(_n, _h) ** 2).mean(axis=1)); _r = _r[_r > db(-45)]
VOICE_RMS_DB = 20 * np.log10(np.median(_r))
cues = json.load(open(os.path.join(P, A.sfx), encoding="utf-8"))
report = []
for c in cues:
    f = c["file"]; path = os.path.join(SOUND, f[7:]) if f.startswith("@sound/") else os.path.join(P, f)
    x = decode(path)
    if c.get("dur"): x = x[: int(c["dur"] * SR)]
    mono = np.abs(x).max(axis=1)
    _xm = x.mean(axis=1); _w = int(0.15 * SR); _pk = int(np.argmax(np.abs(_xm)))
    _seg = _xm[max(0, _pk - _w // 2): _pk + _w // 2]; _rms = 20 * np.log10(np.sqrt((_seg ** 2).mean()) + 1e-9)
    x = x * db(VOICE_RMS_DB + c.get("gain", -14) - _rms)
    a = c.get("anchor", "peak")
    anc = 0.0 if a == "start" else len(x) / SR if a == "end" else float(np.argmax(mono)) / SR if a == "peak" else float(a)
    t = resolve(c["at"]); s0 = int(round((t - anc) * SR))
    if s0 < 0: x = x[-s0:]; s0 = 0
    fade = min(len(x), int(0.01 * SR)); x[-fade:] *= np.linspace(1, 0, fade)[:, None]
    e = min(N, s0 + len(x)); (nbus if c.get("noduck") else sbus)[s0:e] += x[: e - s0]
    report.append((t, c.get("note", ""), os.path.basename(path), c.get("gain", -12)))

# غلاف الكلام (RMS 20ms) → خفض المؤثرات بهجوم 20ms وتحرير 300ms
hop = int(0.01 * SR); vm = np.abs(vbus).max(axis=1)
frames = len(vm) // hop
rms = np.sqrt(np.mean(vm[: frames * hop].reshape(frames, hop) ** 2, axis=1))
thr = db(-38); speech = (rms > thr).astype(np.float32)
env = np.zeros(frames, np.float32); ka, kr = 1 - np.exp(-0.01 / ATTACK), 1 - np.exp(-0.01 / RELEASE); g = 0.0
for i in range(frames):
    g += (ka if speech[i] > g else kr) * (speech[i] - g); env[i] = g
env = np.repeat(env, hop); env = np.pad(env, (0, N - len(env)))
gain = db(SFX_BUS_DB) * (1 - (1 - db(DUCK_DB)) * env)
sbus *= gain[:, None]
sbus += nbus * db(SFX_BUS_DB)

os.makedirs(os.path.join(P, "stems"), exist_ok=True)
def wav(path, x):
    import wave
    y = np.clip(x, -1, 1); y = (y * 32767).astype("<i2")
    with wave.open(path, "wb") as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
wav(os.path.join(P, "stems", "voice.wav"), vbus); wav(os.path.join(P, "stems", "sfx.wav"), sbus)
mix = vbus + sbus
peak = np.abs(mix).max(); mix = mix / max(1.0, peak / 0.98)
raw = os.path.join(P, "renders", "mix_raw.wav"); wav(raw, mix)

# معايرة ‎-14 LUFS بمرحلتين (loudnorm خطّي)
r = subprocess.run([FFMPEG, "-hide_banner", "-i", raw, "-af", "loudnorm=I=-14:TP=-2.0:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
js = json.loads(r.stderr[r.stderr.rfind("{"): r.stderr.rfind("}") + 1])
af = (f"loudnorm=I=-14:TP=-2.0:LRA=11:measured_I={js['input_i']}:measured_TP={js['input_tp']}:measured_LRA={js['input_lra']}"
      f":measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true")
out = os.path.join(P, "renders", "mix.wav")
subprocess.run([FFMPEG, "-v", "error", "-y", "-i", raw, "-af", af + ",aresample=48000", out], check=True)

video_in = os.path.abspath(A.video)
video_out = os.path.abspath(A.out) if A.out else os.path.splitext(video_in)[0] + "_mix.mp4"
subprocess.run([FFMPEG, "-v", "error", "-y", "-i", video_in, "-i", out, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", video_out], check=True)
for t, n, f, g in sorted(report): print(f"{t:6.2f}  {g:>5}  {f[:44]:44}  {n}")
_s = sbus.mean(axis=1); _v = vbus.mean(axis=1); _w = int(0.15 * SR); _k = min(len(_s), len(_v)) // _w
_rs = 20 * np.log10(np.sqrt((_s[: _k * _w].reshape(_k, _w) ** 2).mean(axis=1)) + 1e-9) - VOICE_RMS_DB
_sp = 20 * np.log10(np.sqrt((_v[: _k * _w].reshape(_k, _w) ** 2).mean(axis=1)) + 1e-9) > VOICE_RMS_DB - 15   # فيه كلام
_bad = [round(i * 0.15, 1) for i in np.where((_sp & (_rs > -9)) | (_rs > -5))[0]]
print(f"🔎 مستوى الكلام {VOICE_RMS_DB:.1f} dBFS · أعلى مؤثر وقت الكلام {(_rs[_sp].max() if _sp.any() else -99):+.1f} dB · بالفراغات {(_rs[~_sp].max() if (~_sp).any() else -99):+.1f} dB"
      + (f" · ⚠ خارج القاعدة عند {_bad[:12]}" if _bad else " · ✓ داخل القاعدة"))
print("✅", video_out)
