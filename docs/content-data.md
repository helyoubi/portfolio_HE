# Agent : Contenu & Données

**À consulter pour :** toute modification de `data/portfolioData.json` (projets, formations, veille, expériences, sections).

## Règles invariantes

1. **Bilingue obligatoire** : chaque entrée existe dans `en` ET `fr`. Longueurs des tableaux identiques, même ordre.
2. **Source unique** : ne jamais hardcoder du contenu dans le HTML — passer par le JSON et le rendu dynamique (`scripts/dataLoader.js`).
3. **Format des dates** :
   - EN : `"July 04, 2025"`
   - FR : `"Juillet 04, 2025"`
4. **Tri** : formations/certifications triées par date décroissante (plus récent en premier).

## Schémas

### Projet
```json
{
  "title": "...",
  "description": "...",
  "technologies": ["..."],
  "AIAssistant": ["..."],
  "image": "data/projects/<slug>/cover.jpg",
  "link": "https://...",
  "gallery": ["data/projects/<slug>/01.jpg", "..."]
}
```
Images dans `data/projects/<slug>/`. Le rendu modal est automatique via [modal-gallery.md](modal-gallery.md).

### Formation
```json
{
  "institution": "...",
  "title": "...",
  "date": "Juillet 04, 2025",
  "badgeUrl": "https://...",
  "badgeImg": "assets/e-learning/<badge>.png"
}
```
`badgeImg` ET `badgeUrl` requis ensemble.

## Checklist avant commit

- [ ] Entrées ajoutées dans `en` et `fr` (même ordre, même longueur)
- [ ] Dates au bon format selon langue
- [ ] Images placées dans le bon dossier et nommées en kebab-case
- [ ] Test manuel : basculer FR ↔ EN, vérifier qu'aucune entrée ne disparaît
- [ ] Si nouvelle section : voir [navigation.md](navigation.md) et [i18n.md](i18n.md)
