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

   Want another palette than `TokyoNight`? See [Changing the palette or theme](#changing-the-palette-or-theme).
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

## Changing the palette or theme

All the colors live in `color.ini`, one palette per `[Section]`. The value you give to `color_scheme` must match a section name **exactly** — same capitalization, no spaces, no accents (`RosePine`, not `Rosé Pine`; `CatppuccinMocha`, not `Catppuccin`).

### Switch to another palette

1. Pick a name from the list below, or list them straight from your install:
   ```powershell
   Select-String -Path "$(spicetify -c | Split-Path)\Themes\TUI\color.ini" -Pattern '^\[(.+)\]' | ForEach-Object { $_.Matches[0].Groups[1].Value }
   ```
2. Set it and apply (example with Dracula):
   ```
   spicetify config color_scheme Dracula
   spicetify apply
   ```
3. Check with `spicetify config` that `current_theme` is `TUI`, `color_scheme` is the palette you chose, and that `inject_css` and `replace_colors` are both `1`.

Available palettes: `TokyoNight` (default in this guide), `TokyoNightStorm`, `CatppuccinMocha`, `CatppuccinMacchiato`, `CatppuccinLatte`, `Dracula`, `Gruvbox`, `Kanagawa`, `Nord`, `Rigel`, `RosePine`, `RosePineMoon`, `RosePineDawn`, `Solarized`, `EverforestDarkMedium`, `ForestGreen`, `Spotify`, `Spicetify`.

**Nothing changed after `spicetify apply`?**

- The name doesn't match a section of `color.ini` exactly (see the note above).
- `replace_colors` is `0`: run `spicetify config replace_colors 1 inject_css 1`, then `spicetify apply`.
- You edited `color.ini` in a downloaded copy of the repo instead of the one Spicetify reads: it must be in `%appdata%\spicetify\Themes\TUI\` (`spicetify -c | Split-Path` prints the config folder).
- Spotify didn't reload: close it completely (system tray included), reopen it, or run `spicetify apply` again.

### Create your own palette

Copy an existing block of `color.ini`, rename the `[Section]`, and change the values (hex colors, **without** the `#`):

```ini
[MyPalette]
accent             = ff79c6
accent-active      = ff79c6
accent-inactive    = 1e1e2e
banner             = ff79c6
border-active      = ff79c6
border-inactive    = 313244
header             = 585b70
highlight          = 585b70
main               = 1e1e2e
notification       = 89b4fa
notification-error = f38ba8
subtext            = a6adc8
text               = cdd6f4
```

Then `spicetify config color_scheme MyPalette` and `spicetify apply`. All 13 keys must be present. Roughly: `main` is the background, `text`/`subtext` the text colors, and `accent` the highlight color.

### Use a different theme (not TUI)

```
spicetify config current_theme <ThemeFolderName>
spicetify config color_scheme <a palette from that theme's color.ini>
spicetify config extensions noControls.js-
spicetify apply
```

The third line matters: `noControls.js` hides the native window buttons, and other themes don't make room for them — see [Getting the native buttons back](#getting-the-native-buttons-back). To remove Spicetify's changes entirely, run `spicetify restore` (and `spicetify backup apply` to bring them back).

## Credits

- Base `text` theme: [spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes)
- Inspiration: [Rigellute/spotify-tui](https://github.com/Rigellute/spotify-tui)
- "Sonic Dancing" snippet (optional, install separately via Marketplace): [@uhAlexz](https://github.com/uhAlexz), via [spicetify/marketplace](https://github.com/spicetify/marketplace)

## License

[MIT](LICENSE) — same license as the base `text` theme from [spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes), which this theme is derived from.
