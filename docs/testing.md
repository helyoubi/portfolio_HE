# Agent : Tests

**À consulter pour :** ajouter/modifier un test Jest, debug d'un test, comprendre la philosophie de test du projet.

## Stack

- **Runner** : Jest avec `--experimental-vm-modules` (ES modules natifs)
- **Environnement** : jsdom (DOM en mémoire)
- **Format** : fichiers `tests/*.test.mjs` (extension `.mjs` obligatoire)
- **Commande** : `npm test` | `npm test -- --testNamePattern="xxx"`

## Philosophie

Tests **simples et utiles** plutôt qu'exhaustifs :
- Vérifier que les modules chargent sans erreur
- Vérifier la structure des données (`portfolioData.json`)
- Vérifier les fonctions critiques (langue, thème, modal)
- Pas de mock complexe — préférer des vérifications d'existence

## Squelette d'un test

```js
import { fonctionATester } from '../scripts/monModule.js';

describe('monModule', () => {
  test('exporte fonctionATester', () => {
    expect(typeof fonctionATester).toBe('function');
  });

  test('comportement attendu sur input X', () => {
    document.body.innerHTML = '<div id="cible"></div>';
    fonctionATester();
    expect(document.getElementById('cible').textContent).toBe('...');
  });
});
```

## Tests existants

| Fichier | Couvre |
|---|---|
| `dataLoader.test.mjs` | Chargement et rendu des données |
| `formHandler.test.mjs` | Formulaire de contact |
| `hamburgerMenu.test.mjs` | Menu mobile |
| `languageManager.test.mjs` | Switch FR/EN |
| `main.test.mjs` | Smooth scroll, scroll-to-top |
| `pageLoader.test.mjs` | Chargement pages dynamiques |
| `portfolioData.test.mjs` | Schéma du JSON (lengths FR=EN) |
| `themeToggle.test.mjs` | Switch thème |

## Règles invariantes

1. **Si on ajoute une fonction exportée critique → un test** (au moins existence + cas nominal)
2. **Si on modifie le schéma de `portfolioData.json`** → mettre à jour `portfolioData.test.mjs`
3. **CI exécute `npm test`** — un test cassé bloque le merge

## Anti-patterns

- Tests d'UI pixel-perfect (fragile, peu utile en static site)
- Mock d'APIs internes (préférer tester le vrai comportement)
- Tests qui dépendent d'un ordre d'exécution
- Fichiers `.test.js` (non détectés par la config Jest)
