# Repository Guidelines

## Project Structure & Module Organization
- Root: `index.html`, `package.json`, `test-server.py`.
- Assets: `assets/` with `css/`, `js/`, `lottie/`, and SVGs.
- Scripts: `scripts/check-lottie-size.mjs` (asset budget checks).
- Tests: `tests/` HTML + JS pages for manual/visual verification.
- Entry JS: `assets/js/hero-lottie.js` (main controller), plus helpers in `assets/js/`.

## Build, Test, and Development Commands
- `npm run validate-assets`: Gzips Lottie JSON and checks size budgets.
- `npm test`: Runs asset validation and prints test URL hint.
- `npm run test-server` (or `python test-server.py`): Serves site at `http://localhost:8000/`.
- Windows: `start-test.bat` starts the local server.

## Coding Style & Naming Conventions
- JavaScript: ES Modules, 2‑space indent, semicolons, `camelCase` for functions/vars, `PascalCase` for classes.
- Files/paths: use `kebab-case` for filenames; group by feature under `assets/`.
- CSS: keep styles in `assets/css/`; prefer small, purposeful classes; match existing naming patterns.
- Keep public APIs minimal; add utilities in `assets/js/` with clear names.

## Testing Guidelines
- Place test pages in `tests/` and name by feature, e.g., `hero-lottie-test.html`.
- Add focused JS harnesses like `tests/hero-lottie-test.js` for interactions.
- Run locally via `npm run test-server`, then open the test page URL printed in the console.
- Ensure `npm run validate-assets` passes before submitting.

## Commit & Pull Request Guidelines
- Commits: concise imperative subject (max ~72 chars) and a brief body explaining rationale.
- Prefer Conventional Commits (e.g., `feat:`, `fix:`, `perf:`, `docs:`) for clarity.
- PRs: include purpose, screenshots or short screen capture for UI/animation changes, and links to relevant issues.
- Confirm local server render, test URLs, and asset validation status in the PR description.

## Security & Configuration Tips
- Do not commit secrets. This site fetches Lottie from CDN; for offline/dev, consider vendoring if necessary.
- Keep Lottie/poster sizes within script budgets; store new animations in `assets/lottie/`.
- Respect reduced‑motion and connection checks already implemented in `HeroLottieController`.

## Agent Workflow (Codex CLI)
- Launch session: `codex -m gpt-5 -c model_reasoning_effort=high` from `Desktop/website`.
- Use inline runs for quick tasks; keep changes minimal and focused.
- If the CLI isn’t installed, follow its install docs, then rerun the command above.

## Archived Feature Notice
- The hero Lottie implementation has been archived and is not active on the site.
- Archived files live under `archive/hero-lottie/` (assets, controller, styles, demo/tests).
- Asset budget checks (`npm run validate-assets`) are tolerant and skip when Lottie assets are absent.
- To reactivate, restore assets to `assets/lottie/`, include the controller on the target page, and review CSP policy.
