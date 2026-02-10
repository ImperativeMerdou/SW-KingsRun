# Kingsrun v1.0.0 — Manual QA Checklist

**Estimated time: 10–15 minutes**

## Setup
- [ ] Open `dist/index.html` in Chrome desktop
- [ ] Also test in: Safari iPhone, Android Chrome, Firefox desktop (at minimum)

---

## 1. Fresh Start (2 min)
- [ ] Open the game for the first time (or clear browser data first)
- [ ] Verify the title bar says "Kingsrun — by Mert Akhan"
- [ ] Verify the header shows "Kingsrun" and "by Mert Akhan"
- [ ] Verify the game starts at Ch1 Selvaggio (the smell of fish oil and tar)
- [ ] Make a few choices, advance past the first page break
- [ ] Verify the version footer "Kingsrun v1.0.0 — (c) Mert Akhan" appears at the bottom

## 2. Autosave / Continue After Refresh (2 min)
- [ ] Play through several scenes (at least past the character creation checkpoint)
- [ ] Note which scene you're on
- [ ] Refresh the page (F5 or Ctrl+R)
- [ ] Verify the game resumes from where you left off (NOT from the beginning)
- [ ] Verify your stats are preserved (click "Show Stats")

## 3. Restart Game (1 min)
- [ ] Click "Menu" in the header
- [ ] Select "Restart the game."
- [ ] Verify a confirmation prompt appears: "Start over from the beginning?"
- [ ] Select "Restart the game." again to confirm
- [ ] Verify the game starts from the very beginning
- [ ] Refresh the page — verify it starts fresh (save was cleared)

## 4. Menu Options (1 min)
- [ ] Click "Menu"
- [ ] Verify these options appear: Return to game, Restart, Change settings, Show keyboard shortcuts
- [ ] Verify there is NO "Email me when new games", "Play more games", "Share this game", or "Report a bug" option
- [ ] Test "Change settings" — verify text size/color/font options work
- [ ] Test "Show keyboard shortcuts" — verify the shortcuts dialog appears

## 5. Mobile Usability (2 min)
- [ ] Open on a phone (or use Chrome DevTools mobile emulation: iPhone 12 / Pixel 5)
- [ ] Verify text doesn't touch screen edges (adequate padding)
- [ ] Verify choice buttons are large enough to tap without misclicking
- [ ] Verify buttons have adequate spacing between them
- [ ] Verify no horizontal scrolling occurs
- [ ] Verify text wraps correctly on narrow screens
- [ ] Scroll through a long passage — verify no jank

## 6. Checkpoint Code (3 min)
- [ ] Play through to the very end of the game (or use DEV MODE to track progress)
- [ ] At the checkpoint code screen, verify:
  - [ ] The code is displayed in a styled monospace box
  - [ ] A "Copy Code" button is visible below the code
  - [ ] Clicking "Copy Code" shows "Copied!" feedback
  - [ ] The copied code is actually on your clipboard (paste it somewhere to verify)
  - [ ] The instructions clearly explain how to save the code
  - [ ] The instructions mention that Game 2 will accept it
- [ ] Note: if clipboard fails (e.g. some mobile browsers), verify the code is selectable by tap/hold

## 7. DEV MODE (1 min)
- [ ] Look for a tiny dot in the bottom-right corner of the page
- [ ] Click it — a dark panel should appear at the bottom showing:
  - [ ] Current scene name
  - [ ] Line number
  - [ ] Key stats (dominion, personality, bounty, etc.)
  - [ ] Crew information
- [ ] Navigate to a new scene — verify the panel updates
- [ ] Click the dot again — verify the panel hides

## 8. Private/Incognito Mode (1 min)
- [ ] Open the game in an incognito/private window
- [ ] If localStorage is blocked, verify a yellow warning banner appears:
  "Note: Your browser cannot save progress..."
- [ ] (Note: most modern browsers allow localStorage in incognito, so this may not trigger)

## 9. Subfolder Hosting Test (1 min)
- [ ] If you have a local HTTP server, serve the dist/ folder from a subfolder path
  ```
  npx serve -l 3000 dist
  ```
  Then open http://localhost:3000/
- [ ] Verify the game loads and runs correctly
- [ ] Verify no console errors about failed resource loads

## 10. Ending Screen (1 min)
- [ ] After the checkpoint code, advance to the final page
- [ ] Verify "Thank you for playing." and the closing text appears
- [ ] Verify "Kingsrun v1.0.0 — (c) Mert Akhan" is shown
- [ ] After `*ending`, verify only "Play again." appears as an option
- [ ] Verify no CoG-specific options (subscribe, share, etc.) appear

---

## Quick Smoke Tests (if time allows)
- [ ] Firefox desktop: game loads, choices work, saves persist
- [ ] Safari iPhone: game loads, touch works, text readable
- [ ] Android Chrome: game loads, touch works, no layout issues
- [ ] Edge desktop: game loads, choices work

---

## Pass Criteria
All items checked = ready to ship to itch.io.
Any item failing = fix before release.
