# Spicetify-tui

🇫🇷 [Version française](README_FRENCH.md)

A Spicetify theme inspired by [spotify-tui](https://github.com/Rigellute/spotify-tui), styled after a terminal interface: panel border labels ("Nav", "Library", "Main", "Sidebar", "Playing"), Nerd Font monospace typography, an ASCII art banner on the home page, and text-glyph playback controls instead of SVG icons. The window frame itself is reworked too — thinner borders and no minimize/maximize/close buttons, for a clean, borderless look that fits tiling window managers like [komorebi](https://github.com/LGUG2Z/komorebi).

Originally based on the community [`text`](https://github.com/spicetify/spicetify-themes/tree/main/text) theme from the official `spicetify-themes` repo, heavily reworked since (progress bar, volume bar, layout, window frame, and compatibility fixes for recent Spotify updates).


> Developed and tested on Windows 11 with Spotify 1.3.1 and Spicetify 2.45.1. Spotify updates regularly rename its internal CSS classes, so if something looks off after an update, see [After a Spotify update](#after-a-spotify-update).

## Preview

![Home view](preview-home.png)
![Clean playlist view — no album art, terminal-style text list](preview-playlist.png)

## Requirements

- [Spicetify](https://spicetify.app/) installed and working (2.45.1 tested)
- Spotify desktop installed with the official installer — Spicetify does not support the Microsoft Store version
- The **[0xProto Nerd Font Mono](https://github.com/ryanoasis/nerd-fonts/releases/latest/download/0xProto.zip)** font installed on your system — required for the ASCII banner alignment and the control glyphs

## What's in this repo

| File | What it is | Where it goes |
|---|---|---|
| `user.css` | The theme's styles | `Themes/TUI/` |
| `color.ini` | The color palettes | `Themes/TUI/` |
| `noControls.js` | Extension that removes the native window controls ([details](#the-nocontrolsjs-extension)) | `Extensions/` |

Both folders live in your Spicetify config directory: `%appdata%\spicetify\` on Windows, `~/.config/spicetify/` on Linux/macOS. `spicetify -c` prints the path of the `config-xpui.ini` file, which sits in that same directory.

## Installation

1. Install the **0xProto Nerd Font Mono** font (link above) if you haven't already.
2. Download `user.css`, `color.ini` and `noControls.js` from this repo.
3. Copy them into your Spicetify config directory. From the folder containing the downloaded files, in PowerShell:
   ```powershell
   $cfg = spicetify -c | Split-Path
   New-Item -ItemType Directory -Force "$cfg\Themes\TUI", "$cfg\Extensions" | Out-Null
   Copy-Item .\user.css, .\color.ini "$cfg\Themes\TUI\"
   Copy-Item .\noControls.js "$cfg\Extensions\"
   ```
   Or by hand: `user.css` and `color.ini` go in a new `Themes/TUI/` folder, `noControls.js` goes in `Extensions/`.
4. Enable the theme and the extension:
   ```
   spicetify config current_theme TUI
   spicetify config color_scheme TokyoNight
   spicetify config inject_css 1 replace_colors 1 overwrite_assets 1
   spicetify config extensions noControls.js
   ```
   `spicetify config extensions noControls.js` adds the extension to your list, it doesn't replace the extensions you already use.
5. Apply:
   ```
   spicetify apply
   ```
   If Spicetify complains about a missing backup (first use, or right after reinstalling Spotify), run `spicetify backup apply` instead.
6. Check with `spicetify config` that `current_theme` is `TUI` and that `extensions` contains `noControls.js`.

> **Scoop users** — keep the files in the config directory above, not in `scoop\apps\spicetify-cli\<version>\Themes`: that folder is specific to one Spicetify version and isn't carried over when Scoop installs the next one. If Spicetify reports `noControls.js` as not found after an update, also copy it to `scoop\apps\spicetify-cli\<version>\Extensions` (this fixed it in testing).

## The `noControls.js` extension

The theme is designed for a window without native minimize/maximize/close buttons. `noControls.js` is the small extension that removes them, and `user.css` handles the layout side: it sets `--global-nav-margin-top` to `0px` and collapses the space Spotify reserves for those buttons at the top right of the window (the `.main-globalNav-contentRightSpacer` rule near the end of the file).

Because that space is gone, the native buttons may overlap the top-right icons if the extension isn't loaded. Either install the extension (step 3 and 4 above) or follow [Getting the native buttons back](#getting-the-native-buttons-back).

## About the window frame

This theme removes the native minimize/maximize/close buttons and slims down the window borders, matching the borderless look tiling window managers usually go for. Keep in mind what that changes in practice:

- **Closing/minimizing the app** now depends entirely on your window manager's keybinds (or the system tray icon / taskbar) — there's no button left to click.
- If you're **not** running a tiling WM (komorebi, GlazeWM, i3, etc.), test this on a machine where you can still reach the app another way before committing to it daily — Alt+F4 still works, but it's easy to feel "stuck" the first time.

### Getting the native buttons back

You can keep the rest of the theme and restore the buttons:

1. Remove the extension from your config:
   ```
   spicetify config extensions noControls.js-
   ```
2. In `user.css`, raise `--global-nav-margin-top` (for example to `32px`) until the top bar sits below the native buttons.
3. Delete or comment out the `.main-globalNav-contentRightSpacer` rule near the end of `user.css`.
4. Run `spicetify apply`.

## After a Spotify update

Spotify updates can overwrite Spicetify's changes or rename the classes the theme relies on.

1. **Re-apply Spicetify:** `spicetify backup apply`.
2. **If Spicetify says the Spotify version and the backup version are mismatched** and refuses to back up: reinstall Spotify with the official installer, launch it once, close it, then run `spicetify backup apply` (not `restore`, there is nothing left to restore).
3. **Scoop users:** update Spicetify with `scoop update spicetify-cli`. The built-in `spicetify update` can fail on a Scoop install.
4. **If the ASCII banner disappears or a colored gradient comes back at the top of the home page,** the two rules below need the new class names Spotify generated. Both are in `user.css` (the first one in the "MAIN VIEW" section, right after the ASCII banner comment; the second one near the end of the file):
   - `[class*="T6dZs"][class*="_PZaUg"]` — the home shortcuts grid, which carries the ASCII banner
   - `[class*="dqwQh"]` — the colored header of the home page, made transparent

   To find the new names: run `spicetify enable-devtools`, restart Spotify, then press Ctrl+Shift+I (or right-click → Inspect element). Select the shortcuts grid (or the colored area at the top of the home page), copy a few characters from its new class name, and update the rule. Copy them rather than retyping: in the DevTools font, `I`/`l` and `0`/`O` look alike. Then run `spicetify apply`.

If something else breaks, please open an issue with a screenshot and your Spotify and Spicetify versions (`spicetify -v`).

## Available palettes

The `color.ini` file includes several palettes (TokyoNight, TokyoNightStorm, Catppuccin, Dracula, Gruvbox, Nord, Rosé Pine, Solarized, Everforest, and more). Switch palettes with:
```
spicetify config color_scheme <PaletteName>
spicetify apply
```

## Credits

- Base `text` theme: [spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes)
- Inspiration: [Rigellute/spotify-tui](https://github.com/Rigellute/spotify-tui)
- "Sonic Dancing" snippet (optional, install separately via Marketplace): [@uhAlexz](https://github.com/uhAlexz), via [spicetify/marketplace](https://github.com/spicetify/marketplace)

## License

[MIT](LICENSE) — same license as the base `text` theme from [spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes), which this theme is derived from.
