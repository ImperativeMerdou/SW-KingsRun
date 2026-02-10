# Kingsrun — Itch.io Upload Instructions

## Step 1: Create the Zip

Zip **the contents** of the `dist/` folder (NOT the folder itself).

```
cd kingsrun/dist
zip ../kingsrun-v1.0.0.zip index.html
```

Or on Windows: right-click `index.html` inside `dist/` → "Send to" → "Compressed (zipped) folder" → rename to `kingsrun-v1.0.0.zip`.

**Critical:** `index.html` must be at the **root** of the zip, not inside a subfolder.

## Step 2: Upload to Itch.io

1. Go to https://itch.io/dashboard
2. Click **"Create new project"**
3. Fill in:
   - **Title:** Kingsrun
   - **Project URL:** (choose your slug, e.g. `kingsrun`)
   - **Kind of project:** HTML
   - **Classification:** Games
   - **Pricing:** Free (Game 1 is free; sequels will be paid)
4. Upload `kingsrun-v1.0.0.zip`
5. **Check the box:** "This file will be played in the browser"
6. Set **Viewport dimensions:** Width = 960, Height = 600
7. Check **"Mobile friendly"** (yes)
8. Check **"Automatically start on page load"** if available

## Step 3: Configure the Page

- **Cover image:** Upload a cover image (recommended 630x500)
- **Description:** Copy from `itch_io_page.md`
- **Tags:** Interactive Fiction, Dark Fantasy, Nautical, Mature, ChoiceScript, Text-Based, Story Rich, LGBTQ+
- **Genre:** Interactive Fiction
- **Content rating:** "May contain content not appropriate for all ages"
  - Add content warnings from `itch_io_page.md`
- **Community:** Enable comments (good for feedback)
- **Visibility:** Draft (review everything before going Public)

## Step 4: Test on Itch.io

Before going public:
1. Click "View page" on your draft
2. Click "Run game" — verify it loads
3. Play through the first few choices
4. Verify saves work (refresh the page, should resume)
5. Check on mobile (open the itch.io page on your phone)
6. Verify the game frame isn't too small or too large

## Step 5: Publish

1. Change visibility to **Public**
2. Share the URL

## Hotfix Workflow

When you need to patch (e.g. typo fix for v1.0.1):

1. Fix the scene file in `kingsrun/scenes/`
2. Sync: `cp kingsrun/scenes/*.txt choicescript/web/mygame/scenes/`
3. Quicktest: `cd choicescript && node quicktest.js`
4. Compile: `cd choicescript && node compile.js ../kingsrun/kingsrun.html web`
5. Patch: `cd kingsrun && node patch_release.js kingsrun.html dist/index.html`
   (Update the version in `patch_release.js` first)
6. Zip `dist/index.html` and re-upload to itch.io
7. Update CHANGELOG.md
