# Agent : Thèmes & CSS

**À consulter pour :** couleurs, variables CSS, mode dark/light, design tokens, ajout de composant CSS.

## Architecture

| Fichier | Rôle |
|---|---|
| `styles/themes.css` | Variables CSS, sélecteurs `[data-theme="light"]` / `[data-theme="dark"]` |
| `styles/main.css` | Composants de base, utilise les variables |
| `styles/layout.css` | Grid, flex, breakpoints responsifs |

## Règles invariantes

1. **Aucune couleur hardcodée** hors de `themes.css`. Toujours passer par `var(--token)`.
2. **Toute variable doit exister dans `light` ET `dark`** avec un fallback raisonnable : `var(--bg, #fff)`.
3. **Le défaut est `dark`** (cf. `themeToggle.js`).
4. **Le toggle persiste** dans `localStorage` clé `'theme'`.

## Convention de nommage des tokens

```
--bg-primary       /* fond global */
--bg-elevated      /* cartes, modales */
--text-primary     /* texte principal */
--text-muted       /* meta, captions */
--accent           /* couleur d'action / CTA */
--accent-contrast  /* texte sur fond accent */
--border           /* séparateurs */
--shadow-sm / --shadow-md / --shadow-lg
```

## Ajouter un nouveau token

1. Définir dans `:root` (valeurs dark par défaut)
2. Override dans `[data-theme="light"] { ... }`
3. Utiliser via `var(--mon-token)` partout
4. Tester le switch des deux modes

## Ajouter un composant CSS

1. Mobile-first (sans media query)
2. Media queries en `min-width` uniquement
3. Préférer Grid/Flexbox aux floats
4. Transitions sur `color`, `background`, `border-color`, `transform`, `opacity` uniquement (perf)

## Cache busting CSS

Après modification : bumper le `?v=...` dans tous les HTML qui chargent le fichier. Voir [pwa-cache.md](pwa-cache.md).

## Référence croisée

- Design tokens visuels (radius, shadows, spacing) : [ui-design.md](ui-design.md)
- Contraste & a11y : [accessibility.md](accessibility.md)
