# CHANGELOG — Kingsrun v1.0.0

## Release: v1.0.0 (February 2026)

### Continuity Fixes
- **Dussa Kervenne surname**: Fixed "Dussa Verenne" to "Dussa Kervenne" in ch1_selvaggio_docks.txt (2 occurrences). Bible canonical name is Kervenne.
- **Kovesse Thrallek surname**: Fixed "Kovesse Braal" to "Kovesse Thrallek" across 10 scene files (26 occurrences). Surname "Braal" was not in the world bible; "Thrallek" matches her mother Ghorvenne Thrallek.
- **Nettava Daeshara name**: Fixed "Daeshara Vos" to "Nettava Daeshara" in ch3_merrenbach_reef_walk.txt (6 occurrences). "Daeshara" is the surname, not the first name; "Vos" was an invented surname not in the bible.
- **Nettava Daeshara bounty**: Fixed bounty from "2.1 billion" to "5.21 billion Sovereigns" in ch3_merrenbach_reef_walk.txt (2 occurrences). Bible canonical bounty is 5,210,000,000.
- **Veshanna Torc race**: Fixed "Morventhi" to "Khari" in ch6_velundri_cliffhanger.txt (4 occurrences). Bible says Khari (feline), not Morventhi. Cultural descriptors updated to match Khari identity.
- **Commander Gress pronouns**: Fixed "his" to "her" in ch1_selvaggio_the_bell.txt (from prior QA pass).
- **Kovesse Thrallek pronouns**: Fixed "His/He" to "Her/She" in ch4_brannach_landfall.txt (deliberate creative decision: Kovesse is female in-game).
- **Sureth Kellane**: Restored "Sureth Kellane, lean and watchful" in ch6_velundri_market.txt (was changed to unnamed Gorundai woman).
- **Sundered Wake crew name**: Fixed "Kindling crew" to "Sundered Wake crew" in ch4_brannach_fissures.txt and ch5_kelvanni_clinic.txt broadcast lines.
- **Sullavenne scar location**: Fixed "forearm" to "jaw" in ch5_kelvanni_debts.txt.
- **Chart stop count**: Fixed "twenty-one" to "seventeen" in ch6_velundri_revelation.txt (3 occurrences).
- **Travel time estimate**: Fixed "six to eight days" to "three to five days" in ch1_selvaggio_crew_hunt.txt.
- **Sullavenne backstory**: Generalized Ch1 version to avoid contradicting later chapter reveals.

### Silent Protagonist Fixes (Final Audit)
- **MC quoted speech removed**: 11 instances in ch1_selvaggio_arrival.txt where the MC spoke short quoted answers ("Merdou Akkan.", "Akkan.", "Passage south.", etc.) during the checkpoint registration scene. Replaced with narrator descriptions of the action (choice text carries the MC's voice instead).
- **Narrator certainty softened**: 5 borderline instances across ch1-ch5 where the narrator attributed internal states to the MC ("you were certain", "you knew", "you recognized", "the feeling was not triumph — it was weight"). Converted to externally observable descriptions.

### Anti-Slop Fixes (Final Audit)
- **"Sullavenne went still."** (ch3_merrenbach_arrival.txt line 183) → "Sullavenne's hand stopped halfway to her coat pocket. The notebook stayed where it was."
- **"The harbor went still."** (ch5_kelvanni_crisis.txt line 297) → "Conversations dropped mid-word along the dock. Someone's cup clinked against stone in the silence."
- **"Sullavenne's jaw tightened."** (ch5_kelvanni_crisis.txt line 37) → "Sullavenne's eyes cut to the harbor approach, then back."

### Build & Packaging
- Added `*ifid a5034680-4842-45ed-8902-989808d03d12` to startup.txt for browser save persistence.
- Added `game_version "1.0.0"` variable; version displayed at game end.
- Fixed ChoiceScript compile.js Node v24 compatibility (`global.rootDir` scope fix).
- Compiled to single self-contained HTML file (1.2 MB).
- Created post-compile patcher (`patch_release.js`) for repeatable release builds.
- Output: `dist/index.html` ready for itch.io upload.

### HTML / UI Enhancements
- Fixed `<title>` tag: now reads "Kingsrun — by Mert Akhan".
- Set `window.version` to "1.0.0" (was "UNKNOWN").
- Added version footer: "Kingsrun v1.0.0 — (c) Mert Akhan" at page bottom.
- Added mobile CSS: larger touch targets for choice buttons, better spacing, min 44px button height on small screens.
- Added copy-to-clipboard button on checkpoint code screen (with fallback for browsers that block clipboard API).
- Added localStorage availability warning for private/incognito browsing.
- Added DEV MODE toggle (tiny dot, bottom-right corner, off by default) showing scene name, line number, key stats, and crew info when enabled.

### Cleanup
- Removed "Make your own games with ChoiceScript" link (CoG-specific).
- Removed localhost dev tools block.
- Removed CoG-specific menu items: "Email us", "Share this game", "Play more games", "Email me when new games available", "Report a bug" from both in-game menu and ending screen.
- Ending screen now shows only "Play again." option.
- In-game menu now shows: Return to game, Restart (with confirmation), Change settings, Show keyboard shortcuts.

### Save System (Built-in ChoiceScript)
- Auto-saves to localStorage on every scene transition (ChoiceScript built-in).
- On page load, automatically restores from last save point.
- "Restart the game" option in Menu clears saves and starts fresh (with confirmation prompt).
- Checkpoint code generated at end of Game 1 for cross-game persistence into Game 2.
- IFID ensures save data is scoped to this specific game.

### QA
- QuickTest PASSED after all changes.
- Zero broken paths, zero undefined variables, zero dead ends.
- Silent protagonist audit: CLEAN (zero MC dialogue or rendered thoughts).
- Variable consistency audit: CLEAN (zero runtime errors).
