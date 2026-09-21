# Spicetify-tui

🇬🇧 [English version](README.md)

Un thème Spicetify inspiré de [spotify-tui](https://github.com/Rigellute/spotify-tui), façon interface terminal : bordures, labels de panneaux ("Nav", "Library", "Main", "Sidebar", "Playing"), police monospace Nerd Font, bannière ASCII sur l'accueil, contrôles de lecture en glyphes texte. Le cadre de la fenêtre lui-même est retravaillé : bordures amincies et suppression des boutons réduire/agrandir/fermer, pour un rendu épuré et sans bordure qui s'accorde bien avec les gestionnaires de fenêtres en tiling comme [komorebi](https://github.com/LGUG2Z/komorebi).

Basé à l'origine sur le thème communautaire [`text`](https://github.com/spicetify/spicetify-themes/tree/main/text) du dépôt officiel `spicetify-themes`, largement retravaillé (barre de progression, barre de volume, mise en page, cadre de fenêtre, correctifs de compatibilité avec les mises à jour récentes de Spotify).


> Développé et testé sous Windows 11 avec Spotify 1.3.1 et Spicetify 2.45.1. Les mises à jour de Spotify renomment régulièrement ses classes CSS internes : si quelque chose ne s'affiche plus correctement après une mise à jour, voir [Après une mise à jour de Spotify](#après-une-mise-à-jour-de-spotify).

## Aperçu

![Vue d'accueil](preview-home.png)
![Vue playlist épurée — sans pochettes, liste texte façon terminal](preview-playlist.png)

## Prérequis

- [Spicetify](https://spicetify.app/) installé et fonctionnel (2.45.1 testé)
- Spotify desktop installé avec l'installeur officiel — Spicetify ne prend pas en charge la version du Microsoft Store
- La police **[0xProto Nerd Font Mono](https://github.com/ryanoasis/nerd-fonts/releases/latest/download/0xProto.zip)** installée sur le système — indispensable à l'alignement de la bannière ASCII et aux glyphes des contrôles

## Contenu du dépôt

| Fichier | Rôle | Destination |
|---|---|---|
| `user.css` | Les styles du thème | `Themes/TUI/` |
| `color.ini` | Les palettes de couleurs | `Themes/TUI/` |
| `noControls.js` | Extension qui supprime les contrôles natifs de la fenêtre ([détails](#lextension-nocontrolsjs)) | `Extensions/` |

Ces deux dossiers se trouvent dans ton répertoire de configuration Spicetify : `%appdata%\spicetify\` sous Windows, `~/.config/spicetify/` sous Linux/macOS. `spicetify -c` affiche le chemin du fichier `config-xpui.ini`, qui se trouve dans ce même répertoire.

## Installation

1. Installe la police **0xProto Nerd Font Mono** (lien ci-dessus) si ce n'est pas déjà fait.
2. Télécharge `user.css`, `color.ini` et `noControls.js` de ce dépôt.
3. Copie-les dans ton répertoire de configuration Spicetify. Depuis le dossier qui contient les fichiers téléchargés, dans PowerShell :
   ```powershell
   $cfg = spicetify -c | Split-Path
   New-Item -ItemType Directory -Force "$cfg\Themes\TUI", "$cfg\Extensions" | Out-Null
   Copy-Item .\user.css, .\color.ini "$cfg\Themes\TUI\"
   Copy-Item .\noControls.js "$cfg\Extensions\"
   ```
   Ou à la main : `user.css` et `color.ini` vont dans un nouveau dossier `Themes/TUI/`, `noControls.js` va dans `Extensions/`.
4. Active le thème et l'extension :
   ```
   spicetify config current_theme TUI
   spicetify config color_scheme TokyoNight
   spicetify config inject_css 1 replace_colors 1 overwrite_assets 1
   spicetify config extensions noControls.js
   ```
   `spicetify config extensions noControls.js` ajoute l'extension à ta liste, elle ne remplace pas les extensions que tu utilises déjà.

   Envie d'une autre palette que `TokyoNight` ? Voir [Changer de palette ou de thème](#changer-de-palette-ou-de-thème).
5. Applique :
   ```
   spicetify apply
   ```
   Si Spicetify se plaint d'une sauvegarde manquante (première utilisation, ou juste après une réinstallation de Spotify), lance plutôt `spicetify backup apply`.
6. Vérifie avec `spicetify config` que `current_theme` vaut `TUI` et que `extensions` contient `noControls.js`.

> **Utilisateurs de Scoop** — garde les fichiers dans le répertoire de configuration ci-dessus, pas dans `scoop\apps\spicetify-cli\<version>\Themes` : ce dossier est propre à une version de Spicetify et n'est pas repris quand Scoop installe la suivante. Si Spicetify indique que `noControls.js` est introuvable après une mise à jour, copie-le aussi dans `scoop\apps\spicetify-cli\<version>\Extensions` (cela a réglé le problème lors des tests).

## L'extension `noControls.js`

Le thème est pensé pour une fenêtre sans boutons natifs réduire/agrandir/fermer. `noControls.js` est la petite extension qui les supprime, et `user.css` s'occupe de la mise en page : il met `--global-nav-margin-top` à `0px` et fait disparaître l'espace que Spotify réserve à ces boutons en haut à droite de la fenêtre (la règle `.main-globalNav-contentRightSpacer` vers la fin du fichier).

Comme cet espace n'existe plus, les boutons natifs risquent de chevaucher les icônes en haut à droite si l'extension n'est pas chargée. Installe donc l'extension (étapes 3 et 4 ci-dessus) ou suis la procédure [Récupérer les boutons natifs](#récupérer-les-boutons-natifs).

## À propos du cadre de fenêtre

Ce thème supprime les boutons natifs réduire/agrandir/fermer et amincit les bordures de la fenêtre, pour coller au rendu sans bordure typique des gestionnaires de fenêtres en tiling. Quelques conséquences pratiques à garder en tête :

- **Fermer/réduire l'appli** dépend désormais entièrement des raccourcis clavier de ton gestionnaire de fenêtres (ou de l'icône dans la barre des tâches/system tray) — il n'y a plus de bouton à cliquer.
- Si tu **n'utilises pas** de WM en tiling (komorebi, GlazeWM, i3, etc.), teste d'abord sur une machine où tu peux encore accéder à l'appli autrement avant de l'adopter au quotidien — Alt+F4 fonctionne toujours, mais on peut vite se sentir "coincé" la première fois.

### Récupérer les boutons natifs

Tu peux garder le reste du thème et rétablir les boutons :

1. Retire l'extension de ta configuration :
   ```
   spicetify config extensions noControls.js-
   ```
2. Dans `user.css`, augmente `--global-nav-margin-top` (par exemple `32px`) jusqu'à ce que la barre du haut passe sous les boutons natifs.
3. Supprime ou commente la règle `.main-globalNav-contentRightSpacer` vers la fin de `user.css`.
4. Lance `spicetify apply`.

## Après une mise à jour de Spotify

Une mise à jour de Spotify peut écraser les modifications de Spicetify ou renommer les classes dont le thème dépend.

1. **Réapplique Spicetify :** `spicetify backup apply`.
2. **Si Spicetify indique que la version de Spotify et celle de la sauvegarde ne correspondent pas** et refuse de sauvegarder : réinstalle Spotify avec l'installeur officiel, lance-le une fois, ferme-le, puis exécute `spicetify backup apply` (pas `restore`, il n'y a plus rien à restaurer).
3. **Utilisateurs de Scoop :** mets Spicetify à jour avec `scoop update spicetify-cli`. La commande intégrée `spicetify update` peut échouer sur une installation Scoop.
4. **Si la bannière ASCII disparaît ou si un dégradé coloré revient en haut de l'accueil,** les deux règles ci-dessous ont besoin des nouveaux noms de classe générés par Spotify. Elles se trouvent dans `user.css` (la première dans la section « MAIN VIEW », juste après le commentaire de la bannière ASCII ; la seconde vers la fin du fichier) :
   - `[class*="T6dZs"][class*="_PZaUg"]` — la grille de raccourcis de l'accueil, qui porte la bannière ASCII
   - `[class*="dqwQh"]` — l'en-tête coloré de l'accueil, rendu transparent

   Pour retrouver les nouveaux noms : lance `spicetify enable-devtools`, redémarre Spotify, puis appuie sur Ctrl+Shift+I (ou clic droit → Inspecter l'élément). Sélectionne la grille de raccourcis (ou la zone colorée en haut de l'accueil), copie quelques caractères de son nouveau nom de classe et mets la règle à jour. Copie-les plutôt que de les retaper : dans la police de DevTools, `I`/`l` et `0`/`O` se ressemblent. Lance ensuite `spicetify apply`.

Si autre chose ne fonctionne plus, ouvre une issue avec une capture d'écran et tes versions de Spotify et Spicetify (`spicetify -v`).

## Changer de palette ou de thème

Toutes les couleurs sont dans `color.ini`, une palette par `[Section]`. La valeur donnée à `color_scheme` doit correspondre **exactement** au nom d'une section : même casse, sans espace ni accent (`RosePine`, pas `Rosé Pine` ; `CatppuccinMocha`, pas `Catppuccin`).

### Passer à une autre palette

1. Choisis un nom dans la liste ci-dessous, ou affiche-les directement depuis ton installation :
   ```powershell
   Select-String -Path "$(spicetify -c | Split-Path)\Themes\TUI\color.ini" -Pattern '^\[(.+)\]' | ForEach-Object { $_.Matches[0].Groups[1].Value }
   ```
2. Définis-la et applique (exemple avec Dracula) :
   ```
   spicetify config color_scheme Dracula
   spicetify apply
   ```
3. Vérifie avec `spicetify config` que `current_theme` vaut `TUI`, que `color_scheme` correspond à la palette choisie, et que `inject_css` et `replace_colors` valent tous les deux `1`.

Palettes disponibles : `TokyoNight` (celle du guide), `TokyoNightStorm`, `CatppuccinMocha`, `CatppuccinMacchiato`, `CatppuccinLatte`, `Dracula`, `Gruvbox`, `Kanagawa`, `Nord`, `Rigel`, `RosePine`, `RosePineMoon`, `RosePineDawn`, `Solarized`, `EverforestDarkMedium`, `ForestGreen`, `Spotify`, `Spicetify`.

**Rien ne change après `spicetify apply` ?**

- Le nom ne correspond pas exactement à une section de `color.ini` (voir la remarque ci-dessus).
- `replace_colors` est à `0` : lance `spicetify config replace_colors 1 inject_css 1`, puis `spicetify apply`.
- Tu as modifié `color.ini` dans une copie téléchargée du dépôt et non dans celle que lit Spicetify : il doit se trouver dans `%appdata%\spicetify\Themes\TUI\` (`spicetify -c | Split-Path` affiche le dossier de configuration).
- Spotify ne s'est pas rechargé : ferme-le complètement (zone de notification comprise), rouvre-le, ou relance `spicetify apply`.

### Créer ta propre palette

Copie un bloc existant de `color.ini`, renomme la `[Section]` et change les valeurs (couleurs hexadécimales, **sans** le `#`) :

```ini
[MaPalette]
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

Puis `spicetify config color_scheme MaPalette` et `spicetify apply`. Les 13 clés doivent toutes être présentes. En gros : `main` est le fond, `text`/`subtext` les couleurs de texte, et `accent` la couleur d'accentuation.

### Utiliser un autre thème (que TUI)

```
spicetify config current_theme <NomDuDossierDuThème>
spicetify config color_scheme <une palette du color.ini de ce thème>
spicetify config extensions noControls.js-
spicetify apply
```

La troisième ligne est importante : `noControls.js` masque les boutons natifs de la fenêtre, et les autres thèmes ne leur laissent pas de place — voir [Récupérer les boutons natifs](#récupérer-les-boutons-natifs). Pour supprimer complètement les modifications de Spicetify, lance `spicetify restore` (puis `spicetify backup apply` pour les rétablir).

## Crédits

- Thème de base `text` : [spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes)
- Inspiration : [Rigellute/spotify-tui](https://github.com/Rigellute/spotify-tui)
- Snippet "Sonic Dancing" (optionnel, à installer séparément via le Marketplace) : [@uhAlexz](https://github.com/uhAlexz), via [spicetify/marketplace](https://github.com/spicetify/marketplace)

## Licence

[MIT](LICENSE) — même licence que le thème de base `text` de [spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes), dont ce thème est dérivé.
