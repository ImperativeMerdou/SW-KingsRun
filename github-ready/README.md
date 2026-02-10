# Kingsrun

**A ChoiceScript interactive fiction game by Mert Akhan.**

Game 1 of the Sovereign World trilogy. 107,000+ words. 21 scenes. 6 chapters. Free.

## Structure

```
kingsrun/
  scenes/          # ChoiceScript source files (24 .txt files)
  dist/            # Build output (index.html for itch.io)
  patch_release.js # Post-compile patcher for release builds
  CHANGELOG.md
  QA_CHECKLIST.md
  UPLOAD_INSTRUCTIONS.md
  FUTURE_IMPROVEMENTS.md
  GAME1_SCENE_MAP.md
  itch_io_page.md
```

## Build

Requires the ChoiceScript engine (not included — see [choicescript](https://github.com/dfabulich/choicescript)).

```bash
# 1. Copy scenes into choicescript
cp scenes/*.txt ../choicescript/web/mygame/scenes/

# 2. Run quicktest
cd ../choicescript && node quicktest.js

# 3. Compile to single HTML
node compile.js ../kingsrun/kingsrun.html web

# 4. Apply release patches
cd ../kingsrun && node patch_release.js kingsrun.html dist/index.html
```

## Deploy to itch.io

```bash
cd dist
zip ../kingsrun-v1.0.0.zip index.html
```

Upload `kingsrun-v1.0.0.zip` to itch.io as an HTML project. See `UPLOAD_INSTRUCTIONS.md` for details.

## Version

v1.0.0

## License

All rights reserved. Game content, writing, and world-building are the intellectual property of Mert Akhan.
ChoiceScript engine is licensed under the ChoiceScript License by Choice of Games LLC.
