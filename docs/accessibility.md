# Agent : Accessibilité (A11y)

**À consulter pour :** ARIA, navigation clavier, contraste, lecteurs d'écran, focus visible.

## Standards visés

- **WCAG 2.1 niveau AA** minimum
- Naviguable au clavier uniquement (Tab/Shift+Tab/Enter/Espace/Escape)
- Lisible par lecteur d'écran (NVDA, VoiceOver)

## Règles invariantes

1. **`aria-label` sur tous les éléments interactifs sans texte visible** (boutons icône, toggles).
2. **Focus visible obligatoire** — ne JAMAIS faire `outline: none` sans alternative `:focus-visible`.
3. **Contraste texte/fond ≥ 4.5:1** (corps), ≥ 3:1 (titres ≥18pt/14pt bold).
4. **Touch targets ≥ 44×44 px**.
5. **Escape ferme** modales et menus.
6. **Tab trap** dans les modales (voir [modal-gallery.md](modal-gallery.md)).
7. **`alt` sur toute image** : descriptif si informatif, `alt=""` si purement décoratif.

## Patterns ARIA courants

| Composant | Attributs requis |
|---|---|
| Bouton hamburger | `aria-expanded`, `aria-controls`, `aria-label` |
| Modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Toggle thème | `aria-pressed` ou `aria-label` mis à jour |
| Nav principale | `<nav aria-label="...">` |
| Liens externes | `rel="noopener noreferrer"` (sécurité, pas a11y mais lié) |

## Navigation clavier — checklist

- [ ] Tab parcourt tous les éléments interactifs dans un ordre logique
- [ ] Aucun piège au clavier (sauf modal, intentionnel)
- [ ] Skip-link "Aller au contenu" en haut de page (recommandé)
- [ ] Menus/modales ferment avec Escape
- [ ] Galerie : flèches gauche/droite naviguent

## Contraste

Outils : DevTools (onglet Accessibilité), WebAIM Contrast Checker. Tester en mode dark ET light — voir [theming.md](theming.md).

## Lecteurs d'écran

- Titres hiérarchisés (`h1` unique, puis `h2`, `h3`…) — pas de saut de niveau
- Liens explicites : "Voir le projet X", pas "Cliquez ici"
- Live regions (`aria-live="polite"`) pour les messages dynamiques (succès formulaire)

## Anti-patterns

- `<div onclick>` au lieu de `<button>`
- `tabindex` positif (casse l'ordre naturel)
- Icône seule sans `aria-label`
- Animation rapide sans `prefers-reduced-motion` respecté
- Contraste insuffisant en mode dark (texte gris sur fond gris)
