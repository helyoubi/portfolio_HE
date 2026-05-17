# Agent : Modal & Galerie

**À consulter pour :** modal de projet, galerie d'images, lightbox, focus trap, navigation clavier dans une modal.

## Architecture

| Élément | Implémentation |
|---|---|
| Gestionnaire | `scripts/modalManager.js` |
| Markup | `<div>` standard (PAS `<dialog>` HTML5) |
| Affichage | `style.display = 'flex' / 'none'` |
| Données | `projects[].gallery[]` dans `portfolioData.json` |

## Règles invariantes

1. **Toujours utiliser `openModal()` / `closeModal()`** — ne jamais toggle `display` manuellement.
2. **Focus trap actif** quand la modal est ouverte (Tab/Shift+Tab restent dans la modal).
3. **Restauration du focus** sur l'élément qui a ouvert la modal à la fermeture.
4. **Scroll position préservée** (body lock + restore).
5. **Escape ferme** la modal ; **flèches gauche/droite** naviguent dans la galerie.
6. **Dots indicators** mis à jour à chaque changement d'image.

## Patterns d'inspiration

- Galerie : style **Instagram** — image dominante, dots discrets, swipe possible sur mobile
- Lightbox : transition d'entrée fluide (300ms), backdrop opaque
- Boutons prev/next : visibles au hover desktop, toujours visibles sur mobile

## Ajouter un projet avec galerie

1. Voir [content-data.md](content-data.md) pour la structure JSON
2. `gallery: []` est un tableau de chemins relatifs vers les images
3. La modal se construit automatiquement à l'ouverture

## Anti-patterns

- Utiliser `<dialog>` HTML5 (incompatible avec le code actuel)
- Oublier `closeModal()` → scroll cassé + focus perdu
- Modal sans backdrop cliquable pour fermer
- Galerie sans état "image courante" visible (dots ou compteur 1/4)

## Tests

Voir `tests/modalManager.test.mjs` si existant (sinon créer). Patterns dans [testing.md](testing.md).

## Référence croisée

- A11y modal (ARIA, focus trap) : [accessibility.md](accessibility.md)
- Patterns UI galerie : [ui-design.md](ui-design.md)
