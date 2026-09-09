# Spicetify-tui

A Spicetify theme inspired by [spotify-tui](https://github.com/Rigellute/spotify-tui), styled after a terminal interface: panel border labels ("Nav", "Library", "Main", "Sidebar", "Playing"), Nerd Font monospace typography, an ASCII art banner on the home page, and text-glyph playback controls instead of SVG icons. The window frame itself is reworked too — thinner borders and no minimize/maximize/close buttons, for a clean, borderless look that fits tiling window managers like [komorebi](https://github.com/LGUG2Z/komorebi).

Originally based on the community [`text`](https://github.com/spicetify/spicetify-themes/tree/main/text) theme from the official `spicetify-themes` repo, heavily reworked since (progress bar, volume bar, layout, window frame, and compatibility fixes for recent Spotify updates).

*(Lisez ceci en [français](README_FRENCH.md))*

## Preview

![Home view](preview-home.png)
![Clean playlist view — no album art, terminal-style text list](preview-playlist.png)

## Requirements

- [Spicetify](https://spicetify.app/) installed and working
- The **[0xProto Nerd Font Mono](https://github.com/ryanoasis/nerd-fonts/releases/latest/download/0xProto.zip)** font installed on your system — required for the ASCII banner alignment and the control glyphs

## Installation

1. Download `user.css` and `color.ini` from this repo.
2. Create a `TUI` folder in your Spicetify Themes directory:
   - Windows: `%appdata%\spicetify\Themes\TUI\`
   - Linux/macOS: `~/.config/spicetify/Themes/TUI/`
3. Place both files inside it.
4. In a terminal:
   ```
   spicetify config current_theme TUI
   spicetify config color_scheme TokyoNight
   spicetify config inject_css 1 replace_colors 1 overwrite_assets 1
   spicetify apply
   ```
5. Install the 0xProto Nerd Font Mono font (link above) if you haven't already, then run `spicetify apply` again.

## About the window frame

This theme removes the native minimize/maximize/close buttons and slims down the window borders, matching the borderless look tiling window managers usually go for. Keep in mind what that changes in practice:

- **Closing/minimizing the app** now depends entirely on your window manager's keybinds (or the system tray icon / taskbar) — there's no button left to click.
- If you're **not** running a tiling WM (komorebi, GlazeWM, i3, etc.), test this on a machine where you can still reach the app another way before committing to it daily — Alt+F4 still works, but it's easy to feel "stuck" the first time.
- Want the native buttons back without giving up the rest of the theme? Comment out (or delete) the corresponding rule block near the top of `user.css` — it's isolated from the rest of the styling.

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
