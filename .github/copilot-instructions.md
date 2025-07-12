# Copilot Instructions for Hamza Elyoubi Portfolio

## Project Overview
- This is a multilingual (EN/FR) portfolio website for Hamza Elyoubi, built with vanilla HTML, CSS, and JavaScript.
- All dynamic content (certifications, trainings, experience, etc.) is loaded from `data/portfolioData.json` and rendered via JavaScript in `scripts/dataLoader.js`.
- The site supports dark/light themes, section navigation, and paginated trainings/certifications.

## Key Components
- `index.html`: Main entry point, contains section anchors and navigation menu.
- `data/portfolioData.json`: All portfolio data, including multilingual fields, badge/certificate metadata, and sorting order.
- `scripts/dataLoader.js`: Loads and renders all dynamic content, handles pagination, language switching, and section updates.
- `scripts/main.js`: Handles navigation menu highlighting, scroll-to-top, and section visibility.
- `scripts/themeToggle.js`: Manages dark/light theme switching and persists user preference.
- `scripts/formHandler.js`: Handles contact form submission (uses Formspree, no backend code).
- `styles/`: Contains all CSS, with `main.css` for layout, `themes.css` for theme variables, and `layout.css` for responsive design.

## Developer Workflows
- **Install dependencies:** `npm install` (for testing and CI only; site itself is static)
- **Run tests:** `npm test` (uses Jest, all test files are in `tests/` and use `.mjs` ES module syntax)
- **CI/CD:** GitHub Actions workflow in `.github/workflows/test.yml` runs lint, HTML validation, and Jest tests on push/PR.
- **No build step**: All files are static; deploy by pushing to GitHub Pages.

## Project Conventions
- All data for sections (certifications, trainings, etc.) must be added to `portfolioData.json` in both `en` and `fr` arrays, with dates in language-appropriate format (e.g., `April 04, 2025` for EN, `Avril 04, 2025` for FR).
- Trainings and certifications must be sorted in descending order by date (most recent first) in the JSON file.
- All new badges/certificates must include both an image (`badgeImg`) and a link (`badgeUrl`), and be referenced with a relative path from the `assets/` directory.
- Tests should be simple existence checks (DOM, function, or data presence), not complex UI or event tests.
- Use only ES module syntax in all test files (`.mjs`).

## Integration Points
- **Formspree**: Contact form posts directly to Formspree endpoint (see `formHandler.js`).
- **Font Awesome**: Used for icons, loaded via CDN in `index.html`.
- **GitHub Actions**: Workflow defined in `.github/workflows/test.yml` for CI/CD.

## Examples
- To add a new training, update both `en` and `fr` arrays in `portfolioData.json`, ensure date format matches language, and place the most recent entry at the top.
- To add a new section, update both the HTML structure and the rendering logic in `dataLoader.js`.

## References
- See `README.md` for a high-level project description and features.
- See `tests/` for Jest test patterns and structure.
- See `.github/workflows/test.yml` for CI/CD pipeline details.

---
For any unclear conventions or missing documentation, review the main JS files and `portfolioData.json` for examples of current patterns.
