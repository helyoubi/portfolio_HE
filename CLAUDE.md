# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- **Install dependencies**: `npm install` (only needed for testing - this is a static site)
- **Run tests**: `npm test` (executes Jest tests in ES module mode)
- **Deploy**: Push to GitHub Pages (no build step required)

### Testing
- Tests are located in `tests/` directory with `.mjs` extension
- Uses Jest with jsdom environment for DOM testing
- Tests use ES module syntax and simple existence checks
- Run single test: `npm test -- --testNamePattern="test_name"`

## Architecture Overview

This is a **static portfolio website** built with vanilla HTML, CSS, and JavaScript using ES modules. The site is deployed on GitHub Pages with no build process.

### Key Architectural Patterns

**Data-Driven Rendering**: All content (certifications, experience, projects) is stored in `data/portfolioData.json` with multilingual support (en/fr). The JavaScript modules dynamically render this data into the DOM.

**Modular JavaScript**: 
- `dataLoader.js` - Fetches and processes portfolio data
- `main.js` - DOM interactions, smooth scrolling, section reveals
- `themeToggle.js` - Dark/light theme management with localStorage
- `formHandler.js` - Contact form integration with Formspree

**Progressive Enhancement**: The site loads with basic HTML structure, then JavaScript modules enhance it with dynamic content, theme switching, and interactive features.

### Data Structure Convention
- All data in `portfolioData.json` must have both `en` and `fr` language arrays
- Dates formatted appropriately per language (e.g., "April 04, 2025" for EN, "Avril 04, 2025" for FR)
- Trainings/certifications sorted by date (most recent first)
- Badge assets require both `badgeImg` and `badgeUrl` properties

### CSS Architecture
- `main.css` - Base styles and components
- `themes.css` - Dark/light theme variables and styles
- `layout.css` - Responsive layout and grid systems
- Uses CSS custom properties for theme switching

### Testing Philosophy
- Simple existence checks rather than complex UI/event testing
- Tests verify module loading and basic functionality
- All test files use `.mjs` extension for ES module compatibility

## Integration Points

- **Formspree**: Contact form posts directly to external service
- **Font Awesome**: Icons loaded via CDN
- **GitHub Actions**: CI/CD pipeline runs HTML validation and Jest tests
- **PWA Support**: Includes service worker (`sw.js`) and manifest for offline functionality

## File Structure Highlights

```
├── index.html              # Main entry point with navigation anchors
├── data/portfolioData.json # All content data (multilingual)
├── scripts/                # ES modules for functionality
├── styles/                 # CSS architecture (main, themes, layout)
├── assets/                 # Images, badges, certificates
├── tests/                  # Jest test files (.mjs format)
└── .github/workflows/      # CI/CD pipeline
```

## Development Notes

- Site uses ES modules exclusively - import/export syntax required
- No build step or bundling - files served directly
- Theme preference persisted in localStorage
- Language switching updates all content dynamically
- Service worker caches assets for offline functionality
- All external links use `target="_blank" rel="noopener noreferrer"`
- Use Context7 to check up-to-date docs when needed for implementing new libraries or frameworks, or adding features.