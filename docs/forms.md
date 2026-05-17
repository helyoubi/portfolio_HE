# Agent : Formulaires

**À consulter pour :** formulaire de contact, validation, intégration Formspree, feedback utilisateur.

## Architecture

| Élément | Implémentation |
|---|---|
| Gestionnaire | `scripts/formHandler.js` |
| Service externe | Formspree (POST direct) |
| Markup | `<form>` standard dans `index.html` |

## Règles invariantes

1. **Validation côté client AVANT envoi** — champs requis, format email, longueur min/max.
2. **Feedback utilisateur visible** : succès, erreur, état "envoi en cours" (désactiver le bouton).
3. **Ne jamais bloquer l'utilisateur** — messages clairs, ne pas vider le formulaire en cas d'erreur.
4. **Attributs HTML natifs d'abord** : `required`, `type="email"`, `minlength`, `maxlength`.
5. **Labels associés** : chaque `<input>` a un `<label for="...">` ou un `aria-label`.

## Pattern d'UX moderne

Inspirer de l'UX **Instagram DM / Reddit reply** :
- Bouton submit désactivé tant que les champs requis ne sont pas valides
- Spinner ou texte "Envoi…" sur le bouton pendant le POST
- Message de succès inline (pas d'alert()) avec icône
- Erreur en rouge sous le champ concerné, ton humain ("Hmm, cet email semble incomplet")

## Sécurité

- **Pas de secret API côté client** — Formspree utilise un endpoint public, c'est OK
- **Honeypot anti-spam** recommandé (champ caché que les bots remplissent)
- **rel="noopener noreferrer"** sur tous les liens externes

## Multilingue

Messages de validation/succès traduits via [i18n.md](i18n.md). Pas de string anglais en dur si l'utilisateur est en FR.

## Anti-patterns

- `alert()` pour feedback (intrusif, daté)
- Vider le formulaire en cas d'erreur (frustration)
- Pas d'état "loading" sur le bouton (double-clic possible)
- Validation uniquement côté serveur (mauvais retour immédiat)

## Référence croisée

- A11y formulaires : [accessibility.md](accessibility.md)
- Tokens visuels champs/boutons : [theming.md](theming.md) + [ui-design.md](ui-design.md)
