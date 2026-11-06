"""Check the plugin before it is packaged.

- .claude-plugin/plugin.json and marketplace.json are valid JSON
- every top-level folder with a SKILL.md has frontmatter whose name matches the folder
  and a description
- with --tag vX.Y.Z, the tag matches plugin.json's version

Usage: python .github/scripts/validate_plugin.py [--tag v1.14.0]
"""
import json
import os
import re
import sys


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

    for e in errors:
        print("ERROR", e)
    print(f"{skills} skills checked, {len(errors)} problem(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
