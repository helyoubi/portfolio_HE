# Agent : UI & Design moderne

**À consulter pour :** tout changement visuel, nouveau composant, refonte de section, animation, layout.

## Philosophie

Inspiration directe des apps grand public : **Instagram, Facebook, Reddit, TikTok, X, LinkedIn**. Le visiteur doit reconnaître des patterns familiers : feeds verticaux, cartes nettes, micro-interactions, contraste fort, typographie généreuse.

## Principes non négociables

1. **Mobile-first** — concevoir d'abord pour 360–414 px, puis élargir.
2. **Hiérarchie claire** — un titre dominant, du whitespace, jamais plus de 2 niveaux de focus visuel par écran.
3. **Densité maîtrisée** — préférer cartes espacées (Instagram) plutôt que listes denses (Reddit old).
4. **Micro-interactions** — hover/tap subtils (scale 1.02, transition 150ms), feedback immédiat sur action.
5. **Pas de design AI générique** — éviter les dégradés violet/bleu standards, les emojis décoratifs, les "glassmorphism" partout.

## Patterns à reproduire

| Inspiration | Pattern à reprendre |
|---|---|
| Instagram | Cartes projet style "post" : image dominante + meta légères en dessous. Galerie swipe avec dots. |
| Facebook | Header sticky compact, navigation par icônes claires, sections "à la une" en haut. |
| Reddit | Vote/badge visuels pour mettre en avant un élément (ex. certif récente). |
| TikTok | Scroll vertical fluide, sections plein écran possibles, transitions snappy. |
| LinkedIn | Section expérience timeline verticale, badges de compétences. |

## Tokens visuels (référence rapide)

- **Border-radius** : 8px (cartes), 12px (modales), 999px (badges/pills, boutons CTA)
- **Shadows** : `0 1px 2px rgba(0,0,0,.06)` (cards), `0 8px 32px rgba(0,0,0,.2)` (modales)
- **Transitions** : `150ms ease-out` (hover), `300ms cubic-bezier(.2,.8,.2,1)` (entrée)
- **Espacement** : multiples de 4px (4, 8, 12, 16, 24, 32, 48, 64)
- **Touch targets** : min 44×44 px

## Typographie

- Titres : poids 700+, line-height 1.1–1.2
- Corps : 16px min, line-height 1.5–1.65
- Échelle modulaire 1.25 (Major Third)

## Anti-patterns à bannir

- Texte centré sur des paragraphes longs
- Plus de 3 polices différentes
- Boutons sans état hover/focus/active visible
- Animations >400ms sur interaction (sensation de lag)
- Couleurs hardcodées : passer par les variables de [theming.md](theming.md)

## Checklist avant validation

- [ ] Testé mobile (DevTools 375px) + desktop (1440px)
- [ ] Hover, focus-visible, active visibles
- [ ] Respect des tokens (radius, shadow, spacing)
- [ ] Accessibilité : voir [accessibility.md](accessibility.md)
- [ ] Mode dark ET light fonctionnels ([theming.md](theming.md))
