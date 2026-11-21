"""Check the plugin before it is packaged.

- .claude-plugin/plugin.json and marketplace.json are valid JSON
- every top-level folder with a SKILL.md has frontmatter whose name matches the folder
  and a description
- with --tag vX.Y.Z, the tag matches plugin.json's version
- with --package ARCHIVE, the built archive holds every file the repo ships
  (only .github/ is left out, on purpose)

Usage: python .github/scripts/validate_plugin.py [--tag v1.14.0] [--package dist/bunasser77.plugin]
"""
import json
import os
import re
import subprocess
import sys
import zipfile

# The workflow zips the checkout, so a shipped file can only go missing through an
# exclusion that is too wide. These are the paths the workflow drops on purpose.
LEFT_OUT = (".github/",)


def main() -> int:
    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    os.chdir(root)
    errors = []

    manifests = {}
    for name in ("plugin.json", "marketplace.json"):
        path = os.path.join(".claude-plugin", name)
        try:
            with open(path, encoding="utf-8-sig") as f:
                manifests[name] = json.load(f)
        except (OSError, ValueError) as e:
            errors.append(f"{path}: {e}")

    skills = 0
    for d in sorted(os.listdir(".")):
        path = os.path.join(d, "SKILL.md")
        if not os.path.isfile(path):
            continue
        skills += 1
        with open(path, encoding="utf-8-sig") as f:
            text = f.read()
        m = re.match(r"\s*---\s*\n(.*?)\n---", text, re.S)
        if not m:
            errors.append(f"{path}: no frontmatter")
            continue
        fm = m.group(1)
        name = re.search(r"^name:\s*(.+)$", fm, re.M)
        name = name.group(1).strip().strip("\"'") if name else None
        if name != d:
            errors.append(f"{path}: name {name!r} does not match folder {d!r}")
        if not re.search(r"^description:\s*\S", fm, re.M):
            errors.append(f"{path}: missing description")
        # Bu Nasser's rule (1.16.1): no skill pre-approves tools, so Claude always asks first
        if re.search(r"^allowed-tools:", fm, re.M):
            errors.append(f"{path}: allowed-tools is not allowed (Claude must ask before running code)")

    # Claude's uploader rejects an archive with more than one plugin.json
    for dirpath, dirnames, filenames in os.walk("."):
        dirnames[:] = [d for d in dirnames if d not in (".git", "dist", "node_modules")]
        if "plugin.json" in filenames and os.path.normpath(dirpath) != ".claude-plugin":
            errors.append(f"{os.path.join(dirpath, 'plugin.json')}: extra plugin manifest (only .claude-plugin/plugin.json allowed)")

    if "--tag" in sys.argv:
        tag = sys.argv[sys.argv.index("--tag") + 1]
        version = manifests.get("plugin.json", {}).get("version")
        if tag.lstrip("v") != version:
            errors.append(f"tag {tag} does not match plugin.json version {version}")

    if "--package" in sys.argv:
        archive = sys.argv[sys.argv.index("--package") + 1]
        errors += check_package(archive)

    for e in errors:
        print("ERROR", e)
    print(f"{skills} skills checked, {len(errors)} problem(s)")
    return 1 if errors else 0


def check_package(archive: str) -> list:
    """Every file the repo ships must be inside the built archive.

    real-sfx lost its 936 CC0 UI sounds to the '*/node_modules/*' exclusion while its
    own config.json kept pointing at vendor/node_modules/uisfx, so the packaged skill
    asked for a folder that was not there.
    """
    errors = []
    try:
        with zipfile.ZipFile(archive) as z:
            names = {strip_dot_slash(n) for n in z.namelist()}
    except (OSError, zipfile.BadZipFile) as e:
        return [f"{archive}: {e}"]

    missing = []
    for path in shipped_files():
        if path.startswith(LEFT_OUT):
            continue
        if path not in names:
            missing.append(path)

    for path in missing[:20]:
        errors.append(f"{path}: in the repo but not in {archive}")
    if len(missing) > 20:
        errors.append(f"...and {len(missing) - 20} more files missing from {archive}")
    if missing:
        errors.append(f"{len(missing)} shipped file(s) are not in {archive}")
    return errors


def strip_dot_slash(name: str) -> str:
    """Drop a leading './' only. A leading '.' is part of the name (.claude-plugin)."""
    while name.startswith("./"):
        name = name[2:]
    return name


def shipped_files() -> list:
    """Files the repo ships: from git when available, else from the working tree."""
    try:
        out = subprocess.run(
            ["git", "ls-files", "-z"], capture_output=True, text=True, check=True
        ).stdout
        return [p for p in out.split("\0") if p]
    except (OSError, subprocess.CalledProcessError):
        files = []
        for dirpath, dirnames, filenames in os.walk("."):
            dirnames[:] = [d for d in dirnames if d not in (".git", "dist", "__pycache__")]
            for name in filenames:
                files.append(os.path.normpath(os.path.join(dirpath, name)))
        return files


if __name__ == "__main__":
    sys.exit(main())
