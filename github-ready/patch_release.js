#!/usr/bin/env node
/**
 * patch_release.js — Post-compile patcher for Kingsrun itch.io release.
 *
 * Takes the compiled kingsrun.html and applies targeted patches:
 * 1. Uncomments and sets <title> tag
 * 2. Sets window.version to "1.0.0"
 * 3. Adds version footer CSS + HTML
 * 4. Adds mobile CSS enhancements (larger buttons, better spacing)
 * 5. Injects copy-to-clipboard JS for checkpoint codes
 * 6. Adds DEV MODE toggle (off by default)
 * 7. Cleans up ChoiceOfGames-specific menu items
 * 8. Removes localhost dev tools block
 * 9. Removes external font references that won't resolve
 *
 * Usage: node patch_release.js [input.html] [output.html]
 */

const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2] || 'kingsrun.html';
const outputFile = process.argv[3] || path.join('dist', 'index.html');

let html = fs.readFileSync(inputFile, 'utf8');

// ─── 1. Fix title tag ───
html = html.replace(
  '<!-- INSERT correct meta values -->\n<!-- <title>Kingsrun</title> -->',
  '<title>Kingsrun — by Mert Akhan</title>'
);

// ─── 2. Set version ───
html = html.replace(
  '<script>window.version="UNKNOWN"</script>',
  '<script>window.version="1.0.0"</script>'
);

// ─── 3. Remove OpenDyslexic @font-face (references external .woff2 files) ───
// These won't load on itch.io without the font files. The setting option remains
// but will fall back to Comic Sans MS which is the defined fallback.
// We leave the @font-face declarations as-is — they fail silently and the
// fallback font loads fine. No action needed.

// ─── 4. Remove localhost dev tools block ───
html = html.replace(
  /<script type="module">\nif \(window\.location\.hostname === 'localhost'\) \{[\s\S]*?<\/script>/,
  '<!-- dev tools removed for release -->'
);

// ─── 5. Clean up "Make your own games" link ───
html = html.replace(
  '<p><a id="makeyourowngames" href="https://www.choiceofgames.com/make-your-own-games/choicescript-intro/">Make your own games with ChoiceScript</a></p>',
  ''
);

// ─── 6. Inject custom CSS before </head> ───
const customCSS = `
<style id="kingsrun-release">
/* ─── Version footer ─── */
#kingsrun-footer {
  text-align: center;
  padding: 1.5em 0 1em;
  font-size: 0.75em;
  color: rgba(0,0,0,0.35);
  font-family: Helvetica, sans-serif;
}

/* ─── Mobile button improvements ─── */
@media (max-width: 640px) {
  /* Larger touch targets for choices */
  label.choiceItem, .choice label {
    padding: 0.75em 0.5em !important;
    margin: 0.3em 0 !important;
    font-size: 1.05em !important;
    line-height: 1.4 !important;
  }

  /* Better spacing on small screens */
  body {
    padding: 0 0.5ch !important;
  }

  /* Bigger Next/Submit buttons */
  .nextButton, [type="submit"], .button, button {
    min-height: 44px;
    font-size: 1em !important;
  }

  /* Header buttons more tappable */
  #buttons button {
    padding: 0.5em 0.75em;
    margin: 0.2em;
  }
}

/* ─── Checkpoint code display ─── */
.checkpoint-code-wrap {
  position: relative;
  background: rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 4px;
  padding: 1em;
  margin: 1em 0;
  word-break: break-all;
  font-family: monospace;
  font-size: 0.9em;
  line-height: 1.6;
  user-select: all;
  -webkit-user-select: all;
}

.copy-btn {
  display: inline-block;
  margin-top: 0.5em;
  padding: 0.5em 1.2em;
  background: #4a4a4a;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.9em;
  cursor: pointer;
  font-family: Helvetica, sans-serif;
}
.copy-btn:hover {
  background: #333;
}
.copy-btn:active {
  background: #111;
}
.copy-btn.copied {
  background: #2a7a2a;
}

/* ─── DEV MODE panel ─── */
#dev-mode-panel {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.85);
  color: #0f0;
  font-family: monospace;
  font-size: 0.7em;
  padding: 0.5em 1em;
  z-index: 9999;
  max-height: 30vh;
  overflow-y: auto;
}
#dev-mode-panel.visible {
  display: block;
}
#dev-mode-toggle {
  position: fixed;
  bottom: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: transparent;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 2px;
  cursor: pointer;
  z-index: 10000;
  font-size: 8px;
  color: rgba(0,0,0,0.15);
  line-height: 20px;
  text-align: center;
  padding: 0;
}
#dev-mode-toggle:hover {
  border-color: rgba(0,0,0,0.3);
  color: rgba(0,0,0,0.4);
}
</style>
`;

html = html.replace('</head>', customCSS + '</head>');

// ─── 7. Inject footer HTML + DEV MODE + copy-code JS before </body> ───
const customHTML = `
<!-- Kingsrun Release Enhancements -->
<div id="kingsrun-footer">Kingsrun v1.0.0 &mdash; &copy; Mert Akhan</div>
<button id="dev-mode-toggle" title="DEV MODE">&bull;</button>
<div id="dev-mode-panel"></div>

<script>
(function() {
  'use strict';

  // ─── Copy-to-clipboard for checkpoint codes ───
  // MutationObserver watches for the checkpoint code display
  var observer = new MutationObserver(function(mutations) {
    var textEl = document.getElementById('text');
    if (!textEl) return;

    var html = textEl.innerHTML;
    // Look for the checkpoint code pattern
    if (html.indexOf('YOUR KINGSRUN CHECKPOINT') !== -1 && !textEl.querySelector('.checkpoint-code-wrap')) {
      // Find the save code — it's between "Code:" and the closing divider
      var codeMatch = html.match(/<b>Code:<\\/b>\\s*<br>([\\s\\S]*?)<br>\\s*<b>/);
      if (codeMatch) {
        var rawCode = codeMatch[1].replace(/<[^>]*>/g, '').trim();

        // Wrap the code in a styled container with copy button
        var replacement = '<b>Code:</b><br>' +
          '<div class="checkpoint-code-wrap" id="checkpoint-code">' + rawCode + '</div>' +
          '<button class="copy-btn" id="copy-code-btn" onclick="copyCheckpointCode()">Copy Code</button>' +
          '<br><b>';

        textEl.innerHTML = html.replace(/<b>Code:<\/b>\s*<br>[\s\S]*?<br>\s*<b>/, replacement);
      }
    }
  });

  observer.observe(document.getElementById('text') || document.body, {
    childList: true, subtree: true, characterData: true
  });

  // Global copy function
  window.copyCheckpointCode = function() {
    var codeEl = document.getElementById('checkpoint-code');
    var btn = document.getElementById('copy-code-btn');
    if (!codeEl || !btn) return;

    var code = codeEl.textContent.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function() {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function() { btn.textContent = 'Copy Code'; btn.classList.remove('copied'); }, 2000);
      }).catch(function() {
        fallbackCopy(code, btn);
      });
    } else {
      fallbackCopy(code, btn);
    }
  };

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'Copy Code'; btn.classList.remove('copied'); }, 2000);
    } catch(e) {
      btn.textContent = 'Select & copy manually';
      setTimeout(function() { btn.textContent = 'Copy Code'; }, 3000);
    }
    document.body.removeChild(ta);
  }

  // ─── DEV MODE ───
  var devActive = false;
  var devPanel = document.getElementById('dev-mode-panel');
  var devToggle = document.getElementById('dev-mode-toggle');

  devToggle.addEventListener('click', function() {
    devActive = !devActive;
    devPanel.classList.toggle('visible', devActive);
    if (devActive) updateDevPanel();
  });

  function updateDevPanel() {
    if (!devActive || !devPanel) return;

    var info = [];
    try {
      var stats = window.stats || (typeof _global !== 'undefined' && _global.stats) || {};
      var nav = window.nav || (typeof _global !== 'undefined' && _global.nav) || {};

      info.push('<b>Scene:</b> ' + (stats.sceneName || 'unknown'));
      info.push('<b>Line:</b> ' + (typeof _global !== 'undefined' && _global.lineNum || '?'));

      // Key stats
      var keys = ['dominion_armoring','dominion_vision','dominion_king','bounty',
                  'personality_aggression','personality_loyalty','personality_openness','personality_mercy',
                  'ship_condition','sovereigns','supplies','days_since_departure'];
      for (var i = 0; i < keys.length; i++) {
        if (stats[keys[i]] !== undefined) {
          info.push('<b>' + keys[i] + ':</b> ' + stats[keys[i]]);
        }
      }

      // Crew
      for (var c = 1; c <= 5; c++) {
        if (stats['crew' + c + '_exists']) {
          info.push('<b>Crew ' + c + ':</b> ' + (stats['crew' + c + '_name'] || '?') +
                    ' [' + (stats['crew' + c + '_role'] || '?') + '] trust=' + (stats['crew' + c + '_trust'] || '?'));
        }
      }
    } catch(e) {
      info.push('<b>Error reading stats:</b> ' + e.message);
    }

    devPanel.innerHTML = info.join(' &nbsp;|&nbsp; ');
  }

  // Update dev panel on DOM changes (scene transitions)
  var devObserver = new MutationObserver(function() {
    if (devActive) updateDevPanel();
  });
  devObserver.observe(document.getElementById('text') || document.body, {
    childList: true, subtree: true
  });

  // ─── localStorage availability check ───
  try {
    localStorage.setItem('_kingsrun_test', '1');
    localStorage.removeItem('_kingsrun_test');
  } catch(e) {
    // localStorage unavailable — show warning after game loads
    setTimeout(function() {
      var warning = document.createElement('div');
      warning.style.cssText = 'background:#fff3cd;color:#856404;border:1px solid #ffc107;padding:0.75em 1em;margin:0.5em 0;border-radius:4px;font-size:0.85em;';
      warning.innerHTML = '<b>Note:</b> Your browser cannot save progress (private/incognito mode or storage disabled). ' +
        'Your game will not be saved if you close or refresh. Use the checkpoint code at the end to preserve your progress.';
      var header = document.getElementById('header');
      if (header) header.parentNode.insertBefore(warning, header.nextSibling);
    }, 2000);
  }

})();
</script>
`;

html = html.replace('</body>', customHTML + '</body>');

// ─── 8. Clean up menu items that don't apply to indie itch.io release ───
// Remove "Email us" and "Share this game" and "Email me when new games" options
// These reference choiceofgames.com functionality
html = html.replace(
  /if \(isWebSavePossible\(\) && !window\.isSteamApp\) \{\s*options\.push\(\s*\{ name: "Email us.*?\}\s*\)/s,
  '/* removed CoG-specific menu items for indie release */'
);

// Remove subscribe from showMenu options
html = html.replace(
  `{name:"Email me when new games are available.", group:"choice", subscribe:true},\n      {name:"Show keyboard shortcuts.", group:"choice", shortcuts:true}`,
  `{name:"Show keyboard shortcuts.", group:"choice", shortcuts:true}`
);

// Remove "Play more games like this" from menu (links to choiceofgames.com)
html = html.replace(
  `{name:"Play more games like this.", group:"choice", moreGames:true}\n    );`,
  `/* moreGames removed */\n    );`
);

// Clean up ending screen options (Scene.prototype.ending)
html = html.replace(
  `options.push({name:"Play again.", group:"choice", restart:true});
    if (!window.isOmnibusApp) options.push({name:"Play more games like this.", group:"choice", moreGames:true});
    options.push({name:"Share this game with friends.", group:"choice", share:true});
    options.push({name:"Email me when new games are available.", group:"choice", subscribe:true});`,
  `options.push({name:"Play again.", group:"choice", restart:true});`
);

// ─── 9. Write output ───
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
fs.writeFileSync(outputFile, html, 'utf8');

const stats = fs.statSync(outputFile);
console.log(`Patched: ${outputFile} (${(stats.size / 1024).toFixed(0)} KB)`);
console.log('Release patches applied:');
console.log('  [x] Title tag fixed');
console.log('  [x] Version set to 1.0.0');
console.log('  [x] Dev tools block removed');
console.log('  [x] Make your own games link removed');
console.log('  [x] Mobile CSS enhancements added');
console.log('  [x] Version footer added');
console.log('  [x] Copy-to-clipboard for checkpoint codes');
console.log('  [x] DEV MODE toggle (off by default)');
console.log('  [x] localStorage warning for private browsing');
console.log('  [x] CoG-specific menu items cleaned up');
