# Spicetify-tui

🇬🇧 [English version](README.md)

Un thème Spicetify inspiré de [spotify-tui](https://github.com/Rigellute/spotify-tui), façon interface terminal : bordures, labels de panneaux ("Nav", "Library", "Main", "Sidebar", "Playing"), police monospace Nerd Font, bannière ASCII sur l'accueil, titres de pages en ASCII, contrôles de lecture en glyphes texte. Le cadre de la fenêtre lui-même est retravaillé : bordures amincies et suppression des boutons réduire/agrandir/fermer, pour un rendu épuré et sans bordure qui s'accorde bien avec les gestionnaires de fenêtres en tiling comme [komorebi](https://github.com/LGUG2Z/komorebi).

Basé à l'origine sur le thème communautaire [`text`](https://github.com/spicetify/spicetify-themes/tree/main/text) du dépôt officiel `spicetify-themes`, largement retravaillé (barre de progression, barre de volume, mise en page, cadre de fenêtre, correctifs de compatibilité avec les mises à jour récentes de Spotify).

En plus du thème, le dépôt fournit quelques petites **extensions Spicetify** : une qui supprime les boutons natifs de la fenêtre, une qui nettoie les fonds et les pochettes, et des **personnages animés en GIF déplaçables** (Sonic, Tails, Shadow, Miku, Tanjiro...) que tu peux déplacer, redimensionner ou désactiver.

> Développé et testé sous Windows 11 avec Spotify 1.3.6 et Spicetify 2.46.4 (octobre 2026). Les mises à jour de Spotify renomment régulièrement ses classes CSS internes et changent la structure de ses pages : si quelque chose ne s'affiche plus correctement après une mise à jour, voir [Après une mise à jour de Spotify](#après-une-mise-à-jour-de-spotify).

## Sommaire

- [Aperçu](#aperçu)
- [Prérequis](#prérequis)
- [Contenu du dépôt](#contenu-du-dépôt)
- [Installation](#installation)
- [Les extensions](#les-extensions)
  - [`noControls.js`](#nocontrolsjs)
  - [`flatBackgrounds.js`](#flatbackgroundsjs)
  - [`draggablePets.js`](#draggablepetsjs)
  - [`marketplaceTabs.js` (retirée)](#marketplacetabsjs-retirée)
- [Les personnages animés](#les-personnages-animés)
  - [Les utiliser](#les-utiliser)
  - [Où ils apparaissent](#où-ils-apparaissent)
  - [Les désactiver ou les retirer](#les-désactiver-ou-les-retirer)
- [Personnalisation](#personnalisation)
- [À propos du cadre de fenêtre](#à-propos-du-cadre-de-fenêtre)
  - [Récupérer les boutons natifs](#récupérer-les-boutons-natifs)
- [Après une mise à jour de Spotify](#après-une-mise-à-jour-de-spotify)
- [Changer de palette ou de thème](#changer-de-palette-ou-de-thème)
  - [Passer à une autre palette](#passer-à-une-autre-palette)
  - [Créer ta propre palette](#créer-ta-propre-palette)
  - [Utiliser un autre thème (que TUI)](#utiliser-un-autre-thème-que-tui)
- [Dépannage](#dépannage)
- [Crédits et droits d'auteur](#crédits-et-droits-dauteur)
- [Licence](#licence)

## Aperçu

![Vue d'accueil](preview-home.png)
![Vue playlist épurée — sans pochettes, liste texte façon terminal](preview-playlist.png)

## Prérequis

- [Spicetify](https://spicetify.app/) installé et fonctionnel (2.46.4 testé)
- Spotify desktop installé avec l'installeur officiel — Spicetify ne prend pas en charge la version du Microsoft Store
- La police **[0xProto Nerd Font Mono](https://github.com/ryanoasis/nerd-fonts/releases/latest/download/0xProto.zip)** installée sur le système — indispensable à l'alignement de la bannière ASCII et aux glyphes des contrôles
- Une connexion internet au démarrage de Spotify : `user.css` charge la police `asciid` (utilisée pour les titres ASCII des pages) depuis `fonts.cdnfonts.com`, ainsi que des polices monospace alternatives de Google Fonts

## Contenu du dépôt

| Fichier | Rôle | Destination |
|---|---|---|
| `user.css` | Les styles du thème | `Themes/TUI/` |
| `color.ini` | Les palettes de couleurs | `Themes/TUI/` |
| `noControls.js` | Extension qui supprime les contrôles natifs de la fenêtre ([détails](#nocontrolsjs)) | `Extensions/` |
| `flatBackgrounds.js` | Extension qui aplatit les fonds et masque les pochettes d'en-tête ([détails](#flatbackgroundsjs)) | `Extensions/` |
| `draggablePets.js` | Extension qui ajoute les personnages animés déplaçables ([détails](#draggablepetsjs)) | `Extensions/` |

Ces deux dossiers se trouvent dans ton répertoire de configuration Spicetify : `%appdata%\spicetify\` sous Windows, `~/.config/spicetify/` sous Linux/macOS. `spicetify -c` affiche le chemin du fichier `config-xpui.ini`, qui se trouve dans ce même répertoire.

**Quelles extensions faut-il ?**

| Extension | Nécessaire ? |
|---|---|
| `noControls.js` | Recommandée — le thème est pensé pour une fenêtre sans boutons natifs |
| `flatBackgrounds.js` | Recommandée — sans elle, les pochettes d'en-tête peuvent rester visibles et des dégradés colorés peuvent revenir sur certaines pages |
| `draggablePets.js` | Facultative — purement décorative (et le fichier le plus lourd, environ 670 Ko, car les GIF y sont embarqués) |

## Installation

1. Installe la police **0xProto Nerd Font Mono** (lien ci-dessus) si ce n'est pas déjà fait.
2. Télécharge `user.css`, `color.ini` et les extensions de ton choix (`noControls.js`, `flatBackgrounds.js`, `draggablePets.js`) de ce dépôt.
3. Copie-les dans ton répertoire de configuration Spicetify. Depuis le dossier qui contient les fichiers téléchargés, dans PowerShell :
   ```powershell
   $cfg = spicetify -c | Split-Path
   New-Item -ItemType Directory -Force "$cfg\Themes\TUI", "$cfg\Extensions" | Out-Null
   Copy-Item .\user.css, .\color.ini "$cfg\Themes\TUI\"
   Copy-Item .\noControls.js, .\flatBackgrounds.js, .\draggablePets.js "$cfg\Extensions\"
   ```
   Ou à la main : `user.css` et `color.ini` vont dans un nouveau dossier `Themes/TUI/`, les fichiers `.js` vont dans `Extensions/`. Laisse de côté les extensions dont tu ne veux pas.
4. Active le thème et les extensions :
   ```
   spicetify config current_theme TUI
   spicetify config color_scheme TokyoNight
   spicetify config inject_css 1 replace_colors 1 overwrite_assets 1
   spicetify config extensions noControls.js
   spicetify config extensions flatBackgrounds.js
   spicetify config extensions draggablePets.js
   ```
   Chaque `spicetify config extensions <fichier>` ajoute l'extension à ta liste, elle ne remplace pas les extensions que tu utilises déjà. Saute les lignes des extensions que tu n'as pas copiées.

   Envie d'une autre palette que `TokyoNight` ? Voir [Changer de palette ou de thème](#changer-de-palette-ou-de-thème).
5. Applique :
   ```
   spicetify apply
   ```
   Si Spicetify se plaint d'une sauvegarde manquante (première utilisation, ou juste après une réinstallation de Spotify), lance plutôt `spicetify backup apply`.
6. Vérifie avec `spicetify config` que `current_theme` vaut `TUI`, et avec `spicetify config extensions` que la liste contient les extensions que tu as activées.

> **Utilisateurs de Scoop** — garde les fichiers dans le répertoire de configuration ci-dessus, pas dans `scoop\apps\spicetify-cli\<version>\Themes` : ce dossier est propre à une version de Spicetify et n'est pas repris quand Scoop installe la suivante. Si Spicetify indique qu'une extension est introuvable après une mise à jour, copie-la aussi dans `scoop\apps\spicetify-cli\<version>\Extensions` (cela a réglé le problème lors des tests avec `noControls.js`).

## Les extensions

Les extensions sont de simples fichiers JavaScript que Spicetify exécute dans Spotify. Elles sont courtes et commentées (hors les données des GIF embarquées dans `draggablePets.js`), donc tu peux les lire avant de les installer. Pour en désactiver une, lance `spicetify config extensions <fichier>-` (note le `-` final) puis `spicetify apply`.

### `noControls.js`

Le thème est pensé pour une fenêtre sans boutons natifs réduire/agrandir/fermer. `noControls.js` est la petite extension qui les supprime (elle vient de la communauté Spicetify, voir [Crédits](#crédits-et-droits-dauteur)), et `user.css` s'occupe de la mise en page : il met `--global-nav-margin-top` à `0px` et fait disparaître l'espace que Spotify réserve à ces boutons en haut à droite de la fenêtre (les règles commentées « space reserved for the window buttons / controls » dans `user.css`).

Comme cet espace n'existe plus, les boutons natifs risquent de chevaucher les icônes en haut à droite si l'extension n'est pas chargée. Installe donc l'extension (étapes 3 et 4 ci-dessus) ou suis la procédure [Récupérer les boutons natifs](#récupérer-les-boutons-natifs).

Spotify peut remettre sa barre de titre après le démarrage (focus de la fenêtre, restauration après réduction, redimensionnement, sortie de veille), ce qui affiche les boutons natifs sous forme de petits traits blancs au-dessus de l'application. Dans ce dépôt, `noControls.js` les masque de nouveau à ces occasions, et toutes les 5 secondes par sécurité, au lieu de ne le faire que pendant les 10 premières secondes. Un bref éclair des boutons natifs pendant le démarrage ou le rechargement (F5) de Spotify est normal : l'extension ne peut agir qu'une fois les API de Spotify disponibles, et le CSS ne peut pas les masquer car ils ne font pas partie de la page.

### `flatBackgrounds.js`

Spotify peint ses pages avec des teintes et des dégradés qui dépendent de la pochette, et renomme à chaque mise à jour les classes CSS qui les portent. Cette extension fait ce travail sans dépendre des noms de classes :

- elle retire les teintes et dégradés du panneau principal (`#main-view`) : les barres collantes et les en-têtes reçoivent la couleur unie du thème, tout le reste devient transparent ;
- quand `--display-header-image` vaut `none` (valeur par défaut), elle masque la grande pochette en haut des pages playlist, album et artiste, en repérant l'image par sa taille et sa position plutôt que par des noms de classes ;
- elle marque le nom de l'artiste sur les pages artiste pour que `user.css` puisse lui appliquer la police des titres ASCII.

Elle ne regarde que `#main-view`, réagit aux changements de page au moment où ils se produisent (donc sans flash) et laisse tranquilles les boutons, champs, lignes et menus.

### `draggablePets.js`

Ajoute les personnages animés décrits [ci-dessous](#les-personnages-animés). Le fichier pèse environ 670 Ko car les GIF y sont embarqués en base64 ; la logique elle-même fait environ 360 lignes.

### `marketplaceTabs.js` (retirée)

Les versions précédentes de ce dépôt fournissaient `marketplaceTabs.js`, un contournement pour l'application personnalisée Marketplace qui perdait sa barre d'onglets (Extensions / Thèmes / Bribes / Applications) à partir de Spotify 1.3.3 (issues amont [#1253](https://github.com/spicetify/marketplace/issues/1253) et [#1265](https://github.com/spicetify/marketplace/issues/1265)). Avec un Marketplace à jour, les onglets s'affichent correctement sans elle (testé avec Spotify 1.3.6) : l'extension a donc été retirée du dépôt.

- **Si tu l'avais installée avec une version précédente de ce thème**, désactive-la : `spicetify config extensions marketplaceTabs.js-`, puis `spicetify apply`.
- **Si les onglets du Marketplace sont absents**, mets le Marketplace à jour en relançant son script d'installation (voir le [guide d'installation du Marketplace](https://github.com/spicetify/marketplace/wiki/Installation)). Quand il demande s'il doit remplacer ton thème local par un thème « placeholder », réponds **N** pour conserver TUI.
- **Sur un ancien Marketplace impossible à mettre à jour**, le fichier reste disponible dans l'historique Git de ce dépôt.

`user.css` met toujours en forme la grille du Marketplace (3 colonnes, texte des cartes réduit, bouton « Ajouter CSS » discret).

## Les personnages animés

`draggablePets.js` ajoute des personnages animés en GIF à l'interface. Ce sont de vrais éléments qui flottent au-dessus de Spotify : tu peux **les déplacer n'importe où**, les redimensionner et les masquer.

### Les utiliser

- **Déplacer** : clique sur un personnage et fais-le glisser n'importe où dans la fenêtre. Sa position est mémorisée (en proportion de la taille de la fenêtre).
- **Revenir à la position d'origine** : double-clic sur le personnage (seulement sa position ; sa taille reste inchangée).
- **Panneau de réglages** : clic droit sur un personnage, ou **Ctrl+Alt+P** (l'extension essaie aussi d'ajouter une entrée dans le menu du profil de Spicetify, ce qui dépend de ta version de Spotify). Le panneau, en anglais, permet de :
  - afficher ou masquer chaque personnage avec sa case à cocher ;
  - les redimensionner avec les curseurs (« Sprites » = Shadow, Tails et Sonic ensemble ; puis un curseur chacun pour Cat, Miku, Tanjiro et Ambers), de 50 % à 200 % ;
  - **Reset positions & sizes** : rétablir toutes les positions et toutes les tailles d'origine (100 %) ; les personnages masqués le restent ;
  - **Hide / show all** : tout masquer ou tout afficher d'un coup.
- **Depuis la console** (DevTools, voir [Après une mise à jour de Spotify](#après-une-mise-à-jour-de-spotify)) : `tuiPets.panel()` ouvre le panneau, `tuiPets.toggle("cat")` masque ou affiche un personnage (identifiants : `shadow`, `tails`, `sonic`, `cat`, `miku`, `tanjiro`, `ambers`), `tuiPets.reset()` fait la même chose que **Reset positions & sizes** (positions et tailles d'origine), `tuiPets.setMargin(n)` règle la distance entre Sonic/Tails et l'extrémité droite de la barre de progression (`0` par défaut, une valeur négative les pousse encore plus à droite).

Les réglages sont enregistrés dans le stockage local de Spotify, sous la clé `tui-pets-v1`.

### Où ils apparaissent

| Personnage | Position d'origine | Affiché sur |
|---|---|---|
| Shadow | Début de la barre de progression, posé dessus | toutes les pages |
| Tails, Sonic | Extrémité droite de la barre de progression | toutes les pages |
| Tanjiro | Barre de recherche, à gauche de la barre verticale | toutes les pages |
| Chat (Cat) | Accueil, haut du panneau principal, à droite des puces de filtre | accueil uniquement |
| Miku | Accueil, assise sur le bord supérieur de la tuile de raccourci en haut à droite | accueil uniquement |
| Ambers | Accueil, angle haut-droit du cadre Main | accueil uniquement |

Les positions d'origine sont calculées à partir d'éléments de la page (barre de progression, barre de recherche, tuiles de raccourci...), donc elles suivent le redimensionnement de la fenêtre. Si une mise à jour de Spotify déplace ces éléments et qu'un personnage se retrouve au mauvais endroit, déplace-le où tu veux, ou ajuste les formules dans la fonction `defaultPos` de `draggablePets.js`.

À garder en tête : les personnages se trouvent au-dessus de l'interface et **capturent la souris** quand tu les survoles. S'il en recouvre un bouton dont tu as besoin, éloigne-le ou masque-le.

### Les désactiver ou les retirer

- Temporairement : **Hide / show all** dans le panneau (ou `tuiPets.toggle(...)` pour un personnage).
- Complètement : `spicetify config extensions draggablePets.js-`, puis `spicetify apply`. Tu peux aussi supprimer le fichier de ton dossier `Extensions/`.

`user.css` ne dessine plus aucun personnage lui-même, il n'y a donc rien d'autre à retirer.

## Personnalisation

Les options en haut de `user.css` (bloc `:root`) peuvent être modifiées librement, puis lance `spicetify apply` :

| Variable | Effet |
|---|---|
| `--font-family` | Police principale (par défaut `0xProto Nerd Font Mono`) ; d'autres polices monospace sont listées en commentaire |
| `--display-card-image` | `block` / `none` : pochettes des cartes |
| `--display-coverart-image` | `block` / `none` : pochette dans la barre de lecture |
| `--display-header-image` | `block` / `none` : grande pochette en haut des pages playlist/album/artiste (`none` par défaut, masquée par `flatBackgrounds.js`) |
| `--display-sidebar-image` | `block` / `none` : pochette dans la barre latérale droite |
| `--display-tracklist-image` | `block` / `none` : vignettes dans les listes de titres (`none` par défaut) |
| `--display-spicetify-banner-ascii` | `block` / `none` : la bannière ASCII de l'accueil |
| `--banner-ascii-height` | Espace réservé à cette bannière : mets `0px` si tu la masques |
| `--tui-header-height` | Hauteur minimale des en-têtes des pages playlist/album/artiste (vers la fin du fichier) |
| `--border-radius`, `--border-width` | Forme et épaisseur des bordures des panneaux |

La taille des puces (`zoom` sur `[data-encore-id="chip"]`) et la grille du Marketplace (`minmax(150px, 1fr)`) se règlent dans les derniers blocs du fichier.

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
3. Supprime ou commente les trois règles commentées « space reserved for the window controls » / « space reserved for the window buttons » (cherche `space reserved for the window` dans `user.css`).
4. Lance `spicetify apply`.

## Après une mise à jour de Spotify

Une mise à jour de Spotify peut écraser les modifications de Spicetify, renommer les classes dont le thème dépend ou changer la structure de la page. La version actuelle du thème s'appuie sur des points d'ancrage stables (id d'éléments, `data-testid`, `aria-label`, rôles) et sur les extensions, mais quelques règles visent encore des noms de classes générés.

1. **Réapplique Spicetify :** `spicetify backup apply`.
2. **Si Spicetify indique que la version de Spotify et celle de la sauvegarde ne correspondent pas** et refuse de sauvegarder : réinstalle Spotify avec l'installeur officiel, lance-le une fois, ferme-le, puis exécute `spicetify backup apply` (pas `restore`, il n'y a plus rien à restaurer).
3. **Utilisateurs de Scoop :** mets Spicetify à jour avec `scoop update spicetify-cli`. La commande intégrée `spicetify update` peut échouer sur une installation Scoop.
4. **Si un dégradé coloré ou une teinte revient** (haut de l'accueil, haut d'une page playlist...), les règles qui les neutralisent ont besoin des nouveaux noms de classe générés par Spotify. Elles ressemblent à `[class*="dqwQh"]` et sont regroupées dans les blocs commentés « Spotify 1.3.x » vers la fin de `user.css`.
5. **Si la bannière ASCII disparaît**, regarde la règle située juste sous le commentaire « MAIN VIEW » : elle s'appuie sur `[data-testid="home-page"]`.
6. **Si les cadres des panneaux, la bannière ASCII ou la barre de lecture apparaissent en double ou mal placés**, Spotify a probablement ramené des noms de classe qui avaient disparu. Les anciennes règles par classes et les nouvelles (ids, `data-testid`) s'appliquent alors en même temps. Le bloc commenté « Anti-doublons » à la fin de `user.css` neutralise les anciennes règles ; utilise les DevTools (ci-dessous) pour voir quels éléments portent le cadre ou la bannière et complète ce bloc si besoin.

Pour retrouver les nouveaux noms de classe, active les DevTools : `spicetify config always_enable_devtools 1`, puis `spicetify apply`, redémarre Spotify et appuie sur Ctrl+Shift+I (ou clic droit → Inspecter l'élément). Sélectionne la zone colorée, copie quelques caractères de son nom de classe et mets la règle correspondante à jour. Copie-les plutôt que de les retaper : dans la police de DevTools, `I`/`l` et `0`/`O` se ressemblent. Lance ensuite `spicetify apply`.

À vérifier aussi après une mise à jour : que les onglets du Marketplace s'affichent toujours (voir [`marketplaceTabs.js` (retirée)](#marketplacetabsjs-retirée) s'ils disparaissent).

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
spicetify config extensions flatBackgrounds.js-
spicetify apply
```

La troisième ligne est importante : `noControls.js` masque les boutons natifs de la fenêtre, et les autres thèmes ne leur laissent pas de place — voir [Récupérer les boutons natifs](#récupérer-les-boutons-natifs). `flatBackgrounds.js` est écrite pour ce thème et aplatirait aussi les fonds d'un autre thème, retire-la donc elle aussi. `draggablePets.js` ne dépend pas du thème et peut rester. Pour supprimer complètement les modifications de Spicetify, lance `spicetify restore` (puis `spicetify backup apply` pour les rétablir).

## Dépannage

- **Aucun personnage n'apparaît :** vérifie que `spicetify config extensions` liste `draggablePets.js`, puis lance `spicetify apply` et redémarre Spotify. Le chat, Miku et Ambers n'apparaissent que sur l'accueil. Appuie sur Ctrl+Alt+P pour ouvrir le panneau et vérifier les cases ; **Hide / show all** a peut-être tout masqué.
- **Les personnages apparaissent en double :** tu mélanges une ancienne version de `user.css` (qui dessinait certains personnages en CSS) avec l'extension actuelle. Utilise le `user.css` de ce dépôt.
- **Un personnage est coincé au mauvais endroit :** double-clique dessus, ou utilise **Reset positions & sizes** dans le panneau.
- **Un personnage recouvre un bouton :** éloigne-le ; les personnages capturent la souris quand tu les survoles.
- **Les onglets du Marketplace sont absents :** mets le Marketplace à jour en relançant son script d'installation (voir [`marketplaceTabs.js` (retirée)](#marketplacetabsjs-retirée)).
- **De petits traits blancs apparaissent au-dessus de la fenêtre de l'application :** ce sont les boutons natifs de la fenêtre qui reviennent. Vérifie que `noControls.js` est activée et que c'est la version de ce dépôt (elle réapplique le masquage au focus, au redimensionnement et à la restauration) ; un bref éclair pendant le chargement de Spotify est normal.
- **Les cadres, la bannière ou la barre de lecture apparaissent en double après une mise à jour :** voir le point 6 de [Après une mise à jour de Spotify](#après-une-mise-à-jour-de-spotify).
- **La pochette d'en-tête ou des dégradés colorés reviennent sur les pages playlist :** `flatBackgrounds.js` n'est pas activée, ou une mise à jour de Spotify a changé un nom de classe (voir [Après une mise à jour de Spotify](#après-une-mise-à-jour-de-spotify)).
- **La console affiche des avertissements :** les DevTools peuvent lister des avertissements sur le préchargement de polices, des requêtes `sentry.io` en échec (si tu bloques la télémétrie) et des erreurs `Resolver not found` répétées venant de `noControls.js` avec les versions récentes de Spotify. Elles n'affectent pas le thème.

## Crédits et droits d'auteur

- Thème de base `text` : [spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes)
- Inspiration : [Rigellute/spotify-tui](https://github.com/Rigellute/spotify-tui)
- `noControls.js` : par OhItsTom et Podpah (une extension de la communauté Spicetify), incluse ici par commodité et modifiée pour réappliquer le masquage de la barre de titre
- Sonic sur la barre de progression : l'idée vient du snippet « Sonic Dancing » de [@uhAlexz](https://github.com/uhAlexz), via [spicetify/marketplace](https://github.com/spicetify/marketplace). Dans ce dépôt, les personnages sont dessinés par `draggablePets.js` : il n'est donc pas nécessaire d'installer ce snippet.

**À propos des GIF animés.** Les personnages appartiennent à leurs propriétaires et créateurs respectifs : Sonic, Tails et Shadow (SEGA), Hatsune Miku (Crypton Future Media), Tanjiro (*Demon Slayer*), et les autres illustrations (le chat, Ambers) viennent de leurs auteurs. Les GIF ont été pris sur des sources tierces, ne sont fournis ici que comme petits éléments décoratifs, et **ne sont pas** couverts par la licence de ce dépôt. Les trois personnages en pixel art ont été ramenés sans perte à leur taille native et les autres GIF ont été réduits pour garder l'extension légère. Si tu es titulaire de droits et souhaites qu'un GIF soit retiré, ou si tu connais l'auteur de l'un d'eux et souhaites qu'il soit crédité, ouvre une issue.

## Licence

[MIT](LICENSE) pour le code de ce dépôt — même licence que le thème de base `text` de [spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes), dont ce thème est dérivé. Les GIF animés embarqués dans `draggablePets.js` sont exclus, voir [Crédits et droits d'auteur](#crédits-et-droits-dauteur).
