# Hamza Elyoubi - Portfolio

Welcome to my professional portfolio. It presents my experience as a Senior Java Software Engineer and Tech Lead, including my expertise in AI-assisted software engineering with GitHub Copilot, Codex, Claude Code, and Cursor. The portfolio is built with HTML, CSS, and JavaScript and hosted on GitHub Pages.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Developer Workflows](#developer-workflows)
- [Project Conventions](#project-conventions)
- [Integration Points](#integration-points)
- [Setup](#setup)
- [Usage](#usage)
- [Contact](#contact)

## About

I am Hamza Elyoubi, a Technical Leader with over 8 years of experience in software development. I am a Certified Scrum Master (PSM1) specializing in Java ecosystems, team leadership, and AI-assisted engineering. Currently, I lead technical teams at Capgemini while remaining actively involved in software delivery.

## Features

- **Multilingual (EN/FR)**: All content is available in English and French, with language switching.
- **Dynamic Data Loading**: Certifications, trainings, experience, and more are loaded from `data/portfolioData.json` and rendered via JavaScript.
- **Dark/Light Theme**: Toggle between dark and light themes, with user preference saved.
- **Section Navigation**: Smooth navigation menu with active highlighting and jump-to-section.
- **Paginated Trainings/Certifications**: Trainings and certifications are paginated and sorted by date (most recent first).
- **Badge & Menu Styling**: Modern, responsive badge and menu styles for both themes.
- **Professional Experience**: Timeline of positions and achievements.
- **Technical Skills & Projects**: Overview of skills, frameworks, and project showcases.
- **Generative AI Expertise**: Professional practices, tools, delivery workflow, and engineering guardrails for AI-assisted development.
- **Contact Form**: Contact via Formspree integration.

## Technologies Used

- **HTML5**
- **CSS3** (with `main.css`, `themes.css`, `layout.css`)
- **JavaScript** (modular, with `dataLoader.js`, `main.js`, `themeToggle.js`, `formHandler.js`)
- **Font Awesome** (icons)
- **Formspree** (contact form)
- **Jest** (testing)
- **GitHub Actions** (CI/CD)

## Project Structure

- `index.html`: Main entry point, contains navigation and section anchors.
- `data/portfolioData.json`: All portfolio data, multilingual, sorted by date.
- `scripts/`: JS for data loading, navigation, theme, and form handling.
- `styles/`: CSS for layout, themes, and responsiveness.
- `assets/`: Images, badges, and certificates.
- `tests/`: Jest test files (`.mjs` ES modules, simple existence checks).
- `.github/workflows/test.yml`: CI/CD pipeline for lint, HTML validation, and Jest tests.

## Developer Workflows

- **Install dependencies:** `npm install` (for testing/CI only; site is static)
- **Run tests:** `npm test` (Jest, all tests in `tests/`)
- **No build step:** Deploy by pushing to GitHub Pages.

## Project Conventions

- All data (certifications, trainings, etc.) must be in both `en` and `fr` arrays, with language-appropriate date formats (e.g., `April 04, 2025` for EN, `Avril 04, 2025` for FR).
- Trainings/certifications sorted by date, most recent first.
- Badges/certificates require both `badgeImg` and `badgeUrl`, referenced from `assets/`.
- Tests are simple existence checks, not complex UI/event tests.
- Use only ES module syntax in test files (`.mjs`).

## Integration Points

- **Formspree**: Contact form posts directly to Formspree endpoint.
- **Font Awesome**: Icons via CDN in `index.html`.
- **GitHub Actions**: Workflow in `.github/workflows/test.yml` for CI/CD.

## Contact

For questions or feedback, use the contact form on the site or reach out via LinkedIn.
