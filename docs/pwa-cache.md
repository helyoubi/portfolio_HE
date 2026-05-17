# Agent : PWA, Service Worker & Cache busting

**À consulter pour :** service worker, manifest, stratégie de cache, version `?v=...`, déploiement.

## Architecture

| Élément | Fichier |
|---|---|
| Service worker | `sw.js` |
| Manifest PWA | `manifest.json` |
| Script de bump | `update-cache-version.js` |
| Commande | `npm run update-cache` puis `npm run deploy` |

## Règles invariantes

1. **Bumper le `?v=...` à CHAQUE modification de CSS/JS** — sinon les visiteurs gardent la vieille version en cache.
2. **Format** : `?v=YYYYMMDDTHHM` (ex. `?v=20260517T1432`).
3. **Toujours mettre à jour TOUS les HTML** qui chargent le fichier modifié (`index.html`, `projects.html`, `trainings.html`, `veille.html`, `howto.html`).
4. **Ne pas cacher les redirects** (cf. commit `610289c`) — le SW filtre les `response.redirected`.
5. **Tester en mode incognito** avant deploy pour valider un cache vierge.

## Workflow de déploiement

```bash
npm run update-cache   # bump auto via update-cache-version.js
git add -A
git commit -m "chore: bump cache version"
git push               # GitHub Pages déploie
```

## Que cache le SW ?

- Assets statiques (CSS, JS, images, icons)
- Pages HTML principales
- Manifest, fontawesome CDN (optionnel selon stratégie)

**Ne PAS cacher** :
- `data/portfolioData.json` si l'on veut un contenu toujours frais (ou stratégie network-first)
- Réponses Formspree
- Réponses avec `response.redirected === true`

## Manifest checklist

- [ ] `name`, `short_name`, `description`
- [ ] `icons` : 192×192 + 512×512 min, format PNG
- [ ] `theme_color`, `background_color` cohérents avec [theming.md](theming.md)
- [ ] `start_url`, `display: "standalone"`

## Tests locaux

```powershell
# servir le site localement (sinon SW ne s'active pas via file://)
.\start-server.bat
# puis ouvrir http://localhost:<port>
```

## Anti-patterns

- Modifier un CSS sans bumper le `?v` → bug "ça marche chez moi"
- Bumper uniquement un HTML sur plusieurs (inconsistance entre pages)
- Cacher agressivement `index.html` (impossible de pousser une mise à jour)
