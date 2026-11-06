# Third-party skills bundled in bunasser77

These folders are copied unchanged from their upstream repositories (snapshot of 7 November 2026). Each stays under its own license; full license texts are in `licenses/`.

| Folders | Upstream | Commit | License |
| --- | --- | --- | --- |
| `ffmpeg-skill` (without `site`, `demos`, `evals`, `assets`, `CHANGELOG.md`) | https://github.com/kajisho5/ffmpeg-skill | 9bdb444 | MIT (`ffmpeg-skill/LICENSE`) |
| `watch` | https://github.com/bradautomates/claude-video | 03ceb42 | MIT, Copyright (c) 2026 Bradley Bonanno |
| `hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use`, `reverse-any-video`, `style-sampling`, `slideshow`, `figma`, `remotion-to-hyperframes` | https://github.com/heygen-com/hyperframes (`skills/`) | cfa0d0c | Apache License 2.0 |
| `remotion-*` (13 folders) | https://github.com/remotion-dev/skills | a2824c6 | Upstream ships no license file; Remotion itself is under the Remotion License (free for individuals and companies of up to 3 people). See `remotion-license`. |

Notes:
- HyperFrames sends anonymous usage events to HeyGen when its skills start (`npx hyperframes events`); it can be switched off with the tool's opt-out.
- To refresh a tool: `git pull` in `studio/vendor/<tool>`, copy the skill folder over the one here, bump the plugin version and log it in `CHANGES.md`.
