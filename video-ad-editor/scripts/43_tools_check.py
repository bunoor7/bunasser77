# -*- coding: utf-8 -*-
"""🧰 43_tools_check.py — فحص جاهزية الأدوات قبل الإنتاج (يطبع جاهز/ناقص ولا يثبّت شي).
   python3 43_tools_check.py [<work>]
   يفحص: ffmpeg وnode وpython، مفاتيح التوليد (FAL_KEY وMUAPI_KEY)، وتطبيقات المكتب (Cap وOpenWhispr وVoiceStudio) بمسارات التثبيت المعتادة.
   تطبيقات المكتب ما تُفحص إلا بجهاز بو ناصر نفسه؛ بالبيئة السحابية يقول «غير مثبّت هنا» وهذا طبيعي."""
import sys, os, shutil, glob, platform

def env_key(name, dirs):
    if os.environ.get(name): return True
    for d in dirs:
        p = os.path.join(d, ".env")
        if os.path.exists(p) and any(l.startswith(name + "=") for l in open(p, encoding="utf-8", errors="ignore")): return True
    return False

def app_found(patterns):
    return any(glob.glob(os.path.expandvars(os.path.expanduser(p)), recursive=True) for p in patterns)

def main():
    work = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.getcwd()
    dirs = (work, os.getcwd(), os.path.expanduser("~"))
    win, mac = platform.system() == "Windows", platform.system() == "Darwin"
    rows = []
    for b in ("ffmpeg", "ffprobe", "node", "python3" if not win else "python"):
        rows.append((b, bool(shutil.which(b)), "ضروري"))
    rows.append(("yt-dlp (لأداة watch)", bool(shutil.which("yt-dlp")), "اختياري"))
    rows.append(("FAL_KEY (توليد المشاهد الافتراضي)", env_key("FAL_KEY", dirs), "للمشاهد المولّدة"))
    rows.append(("MUAPI_KEY (بديل Open Higgsfield)", env_key("MUAPI_KEY", dirs), "اختياري"))
    apps = {
        "Cap": ["/Applications/Cap.app", "%LOCALAPPDATA%/Cap*", "%LOCALAPPDATA%/Programs/Cap*", "%PROGRAMFILES%/Cap*"],
        "OpenWhispr": ["/Applications/OpenWhispr.app", "%LOCALAPPDATA%/Programs/OpenWhispr*", "%LOCALAPPDATA%/OpenWhispr*", "%PROGRAMFILES%/OpenWhispr*"],
        "VoiceStudio": ["~/VoiceStudio", "~/Documents/VoiceStudio", "%LOCALAPPDATA%/VoiceStudio*", "%PROGRAMFILES%/VoiceStudio*"],
    }
    for n, pats in apps.items():
        rows.append((n + " (تطبيق مكتب)", app_found(pats), "اختياري"))
    # من 1.15.0 أدوات الاستوديو مجلدات داخل البلقن نفسه، جنب video-ad-editor
    plugin = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    inside = lambda name: os.path.join(plugin, name, "SKILL.md")
    skills = {
        "ffmpeg-skill (فحص الريل)": [inside("ffmpeg-skill"), "~/.claude/skills/ffmpeg-skill"],
        "real-sfx (مؤثرات على الفريم)": ["~/.claude/skills/real-sfx"],
        "watch (Claude يشوف الفيديو)": [inside("watch"), "~/.claude/skills/watch", "~/.claude/plugins/**/claude-video*"],
        "hyperframes (مشاهد جاهزة)": [inside("hyperframes"), "~/.claude/skills/hyperframes", "~/.agents/skills/hyperframes"],
        "remotion (شاشة التعديل)": [inside("remotion-best-practices"), "~/.claude/skills/remotion-best-practices", "~/.agents/skills/remotion-best-practices"],
    }
    for n, pats in skills.items():
        rows.append((n, app_found(pats), "اختياري"))
    for n, ok, why in rows:
        print(("✅" if ok else ("⛔" if why == "ضروري" else "➖")), n, "" if ok else ("— ناقص (%s)" % why if why == "ضروري" else "— غير موجود هنا (%s)" % why))
    miss = [n for n, ok, why in rows if not ok and why == "ضروري"]
    print("\n" + ("جاهز للإنتاج." if not miss else "ناقص ضروري: " + "، ".join(miss)))

if __name__ == "__main__":
    main()
