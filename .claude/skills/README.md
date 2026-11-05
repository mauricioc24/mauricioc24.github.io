# Skills in this folder

Claude Code loads every folder here that contains a `SKILL.md` as a skill.

## Emil Kowalski's design-engineering skills

- **Source:** https://github.com/emilkowalski/skills (commit `f1090bec277140d02ed202440185ad9d02ac1490`, copied Nov 3, 2026)
- **License:** MIT. See `LICENSE-emilkowalski-skills` in this folder.
- **Copied unchanged:** all 16 skills: `animate`, `animate-expo`, `animation-performance`, `animation-vocabulary`, `apple-design`, `ask-sonner`, `break-ui`, `emil-design-eng`, `find-animation-opportunities`, `improve-animations`, `mobile-native`, `pick-ui-library`, `prototype`, `remove-animations`, `review-animations` and `write-swift`, plus `ui-cheatsheet.md` and `performance-cheatsheet.md`.
- **Added on Nov 5, 2026:** `write-swift`, `animate-expo` and `ask-sonner`. They target Swift, React Native/Expo and a React toast library, which this site doesn't use, so only their web-relevant ideas apply here. Example: the copy-email toast follows Sonner's patterns (one toast updated in place, 4 seconds on screen, paused while the tab is hidden or the toast is hovered, offset 32px from the edge or 16px on phones).

## How they work with the brand

- **These skills decide how things behave:** motion, easing, durations, polish, interaction details.
- **`brand/BRAND.md` decides how things look:** color, motifs, type and where the art is allowed. It always wins on looks. Don't add colors, fonts or "bold aesthetic risks" beyond it.
- **When rules conflict:** accessibility first, then readable content, then Emil's motion rules, then brand expression (see the top of `brand/BRAND.md`).

## Updating them later

1. Download the latest version from the source repo above.
2. Copy all the skill folders over the ones here.
3. Update the commit hash in this file, then commit with a message like "Update Emil Kowalski skills".
