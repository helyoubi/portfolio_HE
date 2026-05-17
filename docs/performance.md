# Agent : Performance

**À consulter pour :** optimisation images, lazy load, score Lighthouse, perf perçue.

## Objectifs

- **Lighthouse Performance ≥ 90** sur mobile
- **LCP < 2.5s**, **CLS < 0.1**, **INP < 200ms**
- Premier rendu utile en < 1.5s sur 4G

## Règles invariantes

1. **Images optimisées** : WebP ou AVIF en priorité, JPG/PNG en fallback. Compression max acceptable visuellement.
2. **`loading="lazy"`** sur toute image hors fold (sauf hero/LCP).
3. **`width` et `height`** explicites sur toutes les images → évite le CLS.
4. **Aucun JS bloquant** dans le `<head>` — `defer` ou `type="module"` (qui est defer par défaut).
5. **Polices** : préférer system fonts ou `font-display: swap`.
6. **Pas de framework JS** ajouté — le site est volontairement vanilla.

## Images

| Action | Outil |
|---|---|
| Compression | `squoosh.app`, `tinypng.com` |
| Conversion WebP | `cwebp -q 80 input.jpg -o output.webp` |
| Responsive | `<picture>` + `srcset` quand l'écart mobile/desktop est grand |

Convention de nom : `data/projects/<slug>/cover.webp`, `01.webp`, `02.webp`…

## Lazy loading

```html
<img src="..." alt="..." width="800" height="600" loading="lazy" decoding="async">
```

LCP (généralement le hero) : **PAS** de `loading="lazy"` dessus.

## Animations performantes

Animer uniquement `transform` et `opacity`. Éviter d'animer `width`, `height`, `top`, `left`, `box-shadow` (reflow/repaint coûteux).

Respecter `prefers-reduced-motion` :
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

## Service worker & cache

Voir [pwa-cache.md](pwa-cache.md). Le SW améliore les visites répétées.

## Audit

```
DevTools → Lighthouse → Mobile → Performance + Best Practices + Accessibility + SEO
```

Cibler 90+ sur chaque axe avant un commit "perf".

## Anti-patterns

- Image hero en PNG 5 Mo
- `<img>` sans `width`/`height` → CLS visible
- Scripts CDN volumineux pour 2 fonctions
- Animations sur `box-shadow` ou `filter: blur()` à chaque frame
- Charger le JSON complet sur chaque page si seules quelques sections l'utilisent
