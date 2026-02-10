# Kingsrun — Future Improvements (Not in v1.0.0)

These are known limitations or potential enhancements. None are blocking for release.
Do NOT implement these now — ship first, iterate later.

---

## Save System
- **Checkpoint code hardening (Game 2):** When Game 2 imports the checkpoint code, it should: trim whitespace, normalize case, detect typos via checksum, and show clear error messages. This belongs in Game 2's decoder, not Game 1.
- **Multiple save slots:** ChoiceScript supports save slots but they're disabled in the compiled HTML by default. Could enable for longer playthroughs.
- **Export/import save state as file:** Alternative to clipboard codes — let players download a tiny JSON save file.

## UI / UX
- **Custom theme for Kingsrun:** Replace the default ChoiceScript beige/serif look with a dark maritime theme (dark background, lighter text, nautical fonts). Would significantly increase polish.
- **Chapter progress indicator:** Show "Chapter 2 of 6" or "Stop 3 of 6" somewhere subtle.
- **Reading time estimate:** "~15 minutes remaining in this chapter."
- **Recap panel:** "Previously in Kingsrun..." summary accessible via the stats screen.
- **Custom favicon:** Add a small icon for browser tabs.
- **Loading screen:** Replace the default ChoiceScript "Loading..." with a themed splash.

## Accessibility
- **OpenDyslexic font:** The compiled HTML references OpenDyslexic .woff2 files that aren't bundled. Either bundle the font files alongside index.html or remove the font-face declarations. Currently fails silently and falls back to Comic Sans MS.
- **High contrast mode:** Add a high-contrast theme option alongside the existing light/dark toggle.
- **Screen reader testing:** Verify ARIA labels and focus management work with VoiceOver/NVDA.

## Content
- **Suuvi Renn age discrepancy:** Bible says Khari lifespan is 60-70, but Suuvi is referenced at ~90. Either update the bible's Khari lifespan range or adjust Suuvi's stated age.
- **Bible bounty conflict:** Kovesse Thrallek's bounty is listed as both 190M (crew entry) and 350M (fruit catalog) in the world bible. Scenes use 190M. Bible needs reconciliation.
- **"Two Kingsrun Oni" line:** Ch4 has Brukka calling both the MC (half-Oni) and Kovesse (Gorundai) "Oni." May be intentional character voice or an error. Worth reviewing.

## Technical
- **Automated randomtest:** Run ChoiceScript's randomtest.js (longer, more thorough than quicktest) for deeper path coverage.
- **Automated name/spelling CI:** Script that greps all scene files against a canonical name list and flags deviations on every build.
- **Bundle OpenDyslexic fonts:** Include the .woff2 files in dist/ so the accessibility font option works on itch.io.
- **Analytics:** Add minimal, privacy-respecting analytics (e.g., how many players reach each chapter end) if desired.
- **PWA/offline support:** Add a service worker so the game works fully offline after first load.

## Game 2 Prep
- **Checkpoint import UI:** Game 2 needs a text input field at startup for pasting the checkpoint code.
- **"Story So Far" fallback:** For players without a code, a condensed decision-making sequence that sets the key variables.
- **Cross-game variable validation:** Sanity-check imported values are within expected ranges.
- **Paid game considerations:** Itch.io supports pay-what-you-want and minimum price. Configure Game 2 as paid from the start. Consider offering a bundle discount for players who played Game 1.
