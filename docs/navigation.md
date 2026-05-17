# Agent : Navigation & Menu

**À consulter pour :** lien de menu, hamburger mobile, sous-menus, ancre, smooth scroll, header sticky.

## Architecture

| Élément | Fichier |
|---|---|
| Menu hamburger mobile | `scripts/hamburgerMenu.js` |
| Smooth scroll & scroll-to-top | `scripts/main.js` |
| Traduction du menu | `hamburgerMenu.js → updateNavigationLanguage()` |
| Markup nav | `index.html` (et autres pages) |

## Règles invariantes

1. **Auto-close du menu mobile** : sur clic d'un lien (délai 100ms), clic extérieur, ou touche `Escape`.
2. **Body scroll lock** quand le menu est ouvert (éviter le double-scroll iOS).
3. **Sous-menus inline** dans le panneau hamburger (cf. commit `2b8ddc5`) — ne pas tenter de flyout absolu sur mobile.
4. **Touch targets ≥ 44 px** sur les liens.
5. **`aria-expanded`** mis à jour sur le bouton hamburger à chaque toggle.

## Ajouter un lien de navigation

1. Ajouter `<a>` dans la nav de chaque page (index.html, trainings.html, projects.html, veille.html, howto.html)
2. Ajouter l'entrée de traduction dans `updateNavigationLanguage()` (FR + EN) — voir [i18n.md](i18n.md)
3. Si lien d'ancre (`#section`) : le smooth scroll est automatique via `main.js`
4. Si nouvelle page : vérifier le header sticky et la cohérence visuelle

## Ajouter une nouvelle section avec ancre

1. Section avec `id="ma-section"` dans le HTML
2. Lien `<a href="#ma-section">` dans la nav
3. Le scroll smooth + le scroll-to-top fonctionnent automatiquement
4. Si la section doit déclencher l'animation reveal au scroll : classe attendue par `main.js`

## Mobile

- Le menu se ferme au resize >768px (sécurité)
- Hauteur viewport calculée dynamiquement (`--vh` custom property) pour iOS Safari
- Tester en mode paysage et portrait

## Anti-patterns

- Liens menu sans traduction
- Sous-menus en `position: absolute` qui débordent du panneau hamburger
- Oublier de fermer le menu après navigation interne (page reste avec menu ouvert)

## Référence croisée

- A11y du menu (focus trap, ARIA) : [accessibility.md](accessibility.md)
- Traductions : [i18n.md](i18n.md)
