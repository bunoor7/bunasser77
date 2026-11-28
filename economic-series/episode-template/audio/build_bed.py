# سرير موسيقى السلسلة (Market Pulse، موسيقى السلسلة الثابتة): تكرار على حدود الإيقاع، وقطع عند كلمة «لحظة!»، ورجوع مع الكلمة التالية، وارتفاع +12 dB في الخاتمة
# عدّل لكل حلقة: T (المدة الكاملة) وCUT/BACK (أو احذف القطع إن لم توجد فقرة «لحظة!») وOUTRO (نهاية الكلام)، من audio/voice_words.json
import numpy as np, subprocess, sys
SR = 48000
import os
SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../../الهوية/music/Market Pulse.wav")
T = 144.5            # الكلام ينتهي 136.3 + بطاقة الرعاية 3.2 ث + 5 ث خاتمة السلسلة
CUT, BACK = 38.25, 59.15   # «لحظة!» عند 38.35 و«زين» عند 59.29
OUTRO = 136.4
BEAT = 37.12 / 64    # ~103.4 BPM
LB = int(round(56 * BEAT * SR))   # حلقة 14 مازورة

raw = subprocess.run(["ffmpeg", "-v", "error", "-i", SRC, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
m = np.frombuffer(raw, np.float32).reshape(-1, 2)
ML = len(m); N = int(T * SR)
# الطور بحيث تنتهي آخر دورة بالنهاية الطبيعية للمقطع
phi = (ML - N) % LB
idx = np.arange(N) + phi
k_last = (idx[-1] - (ML - 1) + LB - 1) // LB   # عدد الالتفافات حتى تنطبق النهاية
wraps = np.minimum((idx // LB), k_last)
pos = idx - wraps * LB
pos = np.clip(pos, 0, ML - 1)
bed = m[pos].copy()
# تنعيم كل التفاف: 40 مللي ثانية تداخل بقدرة متساوية مع امتداد الحلقة الطبيعي
XF = int(0.04 * SR)
for j in np.where(np.diff(wraps) > 0)[0] + 1:
    a = np.sin(np.linspace(0, np.pi / 2, XF))[:, None]
    tail_src = np.clip(np.arange(XF) + LB, 0, ML - 1)
    seg = slice(j, min(j + XF, N)); n = seg.stop - seg.start
    bed[seg] = bed[seg] * a[:n] + m[tail_src[:n]] * np.cos(np.linspace(0, np.pi / 2, XF))[:n, None]

t = np.arange(N) / SR
g = np.ones(N)
g *= np.clip(t / 0.6, 0, 1)                                   # دخول
g *= np.where(t < CUT, 1, np.where(t < CUT + 0.06, 1 - (t - CUT) / 0.06, 0)) + np.where(t >= BACK, np.clip((t - BACK) / 0.35, 0, 1), 0)
g = np.clip(g, 0, 1)
g *= 10 ** ((12 * np.clip((t - OUTRO) / 0.5, 0, 1)) / 20)       # +12 dB في الخاتمة بلا كلام
g *= np.clip((T - t) / 1.2, 0, 1)                              # خروج مع آخر الشعار
bed *= g[:, None]
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "pcm_s24le", "music_bed.wav"], input=bed.astype(np.float32).tobytes())
print("wraps at", [round(x / SR, 2) for x in np.where(np.diff(wraps) > 0)[0] + 1], "len", N / SR)
