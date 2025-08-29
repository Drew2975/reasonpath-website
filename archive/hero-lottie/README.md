# Hero Lottie (Archived)

Status: Archived (disabled on production pages).

Contents:
- `assets/js/hero-lottie.js` — controller that dynamically loads `lottie-web` and two animations.
- `assets/css/hero-lottie.css` — layout + lens mask styling.
- `assets/lottie/` — `hero-glassbox.json`, `hero-structure.json` (and optional `hero-poster.webp` if present).
- `tests/` — demo pages to exercise the animation in isolation.
- `archive_cleanup/` — historical demos and iterations.

Notes:
- The site’s CSP blocks third-party scripts by default; if re-enabling, either vendor `lottie-web` locally or adjust CSP.
- Budget checks (`npm run validate-assets`) are tolerant and skip when assets are not present at `assets/lottie/`.

Reactivate (outline):
1) Move `assets/lottie/*` back to project `assets/lottie/`.
2) Include `assets/js/hero-lottie.js` and add the required containers (`#lottie-base`, `#lottie-struct`) on the target page.
3) Decide on CSP vs vendoring for `lottie-web`.
