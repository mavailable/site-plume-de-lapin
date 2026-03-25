# Polices à télécharger

Les polices doivent être hébergées localement (RGPD — pas de Google Fonts CDN).

## Bitter (titres)
- **Poids** : 600 (SemiBold), 700 (Bold)
- **Source** : https://fonts.google.com/specimen/Bitter
- **Fichiers à placer dans** `public/fonts/` :
  - `bitter-600.woff2`
  - `bitter-700.woff2`

## DM Sans (corps)
- **Poids** : 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Source** : https://fonts.google.com/specimen/DM+Sans
- **Fichiers à placer dans** `public/fonts/` :
  - `dm-sans-400.woff2`
  - `dm-sans-500.woff2`
  - `dm-sans-600.woff2`

## Comment télécharger

Option 1 — google-webfonts-helper :
https://gwfh.mranftl.com/fonts/bitter?subsets=latin
https://gwfh.mranftl.com/fonts/dm-sans?subsets=latin

Option 2 — fontsource :
```bash
npm install @fontsource/bitter @fontsource/dm-sans
```
Puis copier les fichiers woff2 depuis node_modules.
