# Skills in this folder

Claude Code loads every folder here that contains a `SKILL.md` as a skill.

## Emil Kowalski's design-engineering skills

- **Source:** https://github.com/emilkowalski/skills (commit `f1090bec277140d02ed202440185ad9d02ac1490`, copied Nov 3, 2026)
- **License:** MIT. See `LICENSE-emilkowalski-skills` in this folder.
- **Copied unchanged:** `animate`, `animation-performance`, `animation-vocabulary`, `apple-design`, `break-ui`, `emil-design-eng`, `find-animation-opportunities`, `improve-animations`, `mobile-native`, `pick-ui-library`, `prototype`, `remove-animations`, `review-animations`, plus `ui-cheatsheet.md` and `performance-cheatsheet.md`.
- **Left out on purpose:** `write-swift`, `animate-expo` and `ask-sonner`. They cover Swift, React Native/Expo and a React toast library, which this plain HTML/CSS/JS site doesn't use. Some copied skills still mention them by name; that's harmless.

## How they work with the brand

- **These skills decide how things behave:** motion, easing, durations, polish, interaction details.
- **`brand/BRAND.md` decides how things look:** color, motifs, type and where the art is allowed. It always wins on looks. Don't add colors, fonts or "bold aesthetic risks" beyond it.
- **When rules conflict:** accessibility → readable content → Emil's motion rules → brand expression (see the top of `brand/BRAND.md`).

## Updating them later

1. Download the latest version from the source repo above.
2. Copy the skill folders over the ones here. Skip the three left out above.
3. Update the commit hash in this file, then commit with a message like "Update Emil Kowalski skills".
