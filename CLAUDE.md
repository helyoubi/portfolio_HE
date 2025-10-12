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

## Key Features & Functionalities

### 1. **Dynamic Content Management**
- **Data Source**: Single source of truth in [data/portfolioData.json](data/portfolioData.json)
- **Multilingual Content**: All sections support English (en) and French (fr) language arrays
- **Dynamic Rendering**: Content loaded via [scripts/dataLoader.js](scripts/dataLoader.js) at runtime
- **Page-Specific Loading**: Main portfolio (index.html), trainings page, and projects page each load relevant data sections

### 2. **Theme System**
- **Implementation**: [scripts/themeToggle.js](scripts/themeToggle.js)
- **Themes**: Dark (default) and Light mode
- **Persistence**: Theme preference stored in `localStorage` with key `'theme'`
- **CSS Architecture**: Theme variables defined in [styles/themes.css](styles/themes.css) using `data-theme` attribute
- **Toggle Mechanism**: Icon switches between sun/moon based on current theme

### 3. **Language Switching**
- **Implementation**: [scripts/languageManager.js](scripts/languageManager.js)
- **Supported Languages**: French (fr - default), English (en)
- **Persistence**: Language stored in `localStorage` with key `'language'`
- **Dynamic Updates**: All content sections reload when language switches
- **Navigation Translation**: Menu items translate via [scripts/hamburgerMenu.js](scripts/hamburgerMenu.js):updateNavigationLanguage()

### 4. **Responsive Navigation**
- **Hamburger Menu**: [scripts/hamburgerMenu.js](scripts/hamburgerMenu.js) handles mobile navigation
- **Features**:
  - Toggle on/off via hamburger icon click
  - Auto-close on navigation link click (100ms delay)
  - Auto-close on outside click or Escape key
  - Body scroll lock when menu is open
  - Mobile viewport height fix for proper rendering

### 5. **Project Modal System**
- **Implementation**: [scripts/modalManager.js](scripts/modalManager.js)
- **Features**:
  - Full project details display (title, description, technologies, AI assistants used)
  - Image gallery with lightbox functionality
  - Gallery navigation (prev/next arrows, dot indicators)
  - Keyboard navigation support (Tab trap, Escape to close, Arrow keys for gallery)
  - Focus management (stores and restores focus when closing)
  - Scroll position preservation
  - Body scroll lock during modal display
  - Responsive and touch-friendly

### 6. **Form Integration**
- **Implementation**: [scripts/formHandler.js](scripts/formHandler.js)
- **Service**: Formspree for contact form submissions
- **Features**: Form validation, submission feedback, error handling

### 7. **User Experience Enhancements**
- **Smooth Scrolling**: Anchor links with smooth scroll behavior ([scripts/main.js](scripts/main.js):22-36)
- **Scroll-to-Top Button**: Appears after 300px scroll ([scripts/main.js](scripts/main.js):38-52)
- **Section Reveal on Scroll**: Sections become visible with animation when scrolled into view ([scripts/main.js](scripts/main.js):54-66)
- **Copilot Credit**: Dynamic footer attribution showing GitHub Copilot usage

### 8. **PWA & Offline Support**
- **Service Worker**: [sw.js](sw.js) for asset caching
- **Manifest**: Web app manifest for installability
- **Caching Strategy**: Assets cached for offline functionality

### 9. **Analytics Integration**
- **Google Analytics**: Placeholder implementation in [index.html](index.html):17-24
- **Note**: Update GA tracking ID before deployment

### 10. **Version Control & Cache Busting**
- **Query Parameters**: All CSS/JS files include `?v=timestamp` for cache busting
- **Example**: `main.css?v=20250907T192`
- **Meta Tags**: Cache control headers prevent unwanted caching during development

## Development Notes

- Site uses ES modules exclusively - import/export syntax required
- No build step or bundling - files served directly
- Theme preference persisted in localStorage with key `'theme'`
- Language preference persisted in localStorage with key `'language'`
- Language switching updates all content dynamically via data re-rendering
- Service worker caches assets for offline functionality
- All external links use `target="_blank" rel="noopener noreferrer"`
- Modal system uses `display: flex/none` for showing/hiding (not `<dialog>` element)
- Focus trap implemented in modal for accessibility
- Use Context7 to check up-to-date docs when needed for implementing new libraries or frameworks, or adding features

## Common Operations

### Adding a New Project
1. Add project object to both `en` and `fr` arrays in `data/portfolioData.json` under `projects`
2. Include: `title`, `description`, `technologies[]`, `AIAssistant[]`, `image`, `link`, `gallery[]`
3. Place project images in `data/projects/[project-name]/` directory
4. Project will automatically render on projects page with modal functionality

### Adding a New Training/Certification
1. Add training object to both `en` and `fr` arrays in `data/portfolioData.json` under `trainings`
2. Include: `institution`, `title`, `date` (formatted per language), `badgeUrl`, `badgeImg`
3. Ensure date format matches language convention (e.g., "July 04, 2025" for EN, "Juillet 04, 2025" for FR)
4. Training will automatically render on trainings page, sorted by date

### Modifying Multilingual Content
1. Always update BOTH `en` and `fr` arrays when changing content
2. Keep array lengths identical for both languages
3. Test language switching after modifications to ensure no broken references

### Theme Customization
1. Define CSS custom properties in [styles/themes.css](styles/themes.css)
2. Use `[data-theme="light"]` and `[data-theme="dark"]` selectors
3. All theme variables should have fallback values

### Adding a New Section
1. Add data structure to [data/portfolioData.json](data/portfolioData.json) with `en` and `fr` keys
2. Create rendering function in [scripts/dataLoader.js](scripts/dataLoader.js)
3. Add navigation link to [index.html](index.html) with appropriate `data-section` attribute
4. Add translation entries in [scripts/hamburgerMenu.js](scripts/hamburgerMenu.js):updateNavigationLanguage()
5. Style the section in [styles/main.css](styles/main.css) or relevant CSS file

## Useful Tips for Future Development

### LocalStorage Keys Reference
- `'theme'` - Stores current theme ('light' or 'dark')
- `'language'` - Stores current language ('en' or 'fr')

### Modal System
- Modal uses regular `<div>` elements, not `<dialog>` HTML5 elements
- Display controlled via `style.display = 'flex'` or `'none'`
- Always call `closeModal()` to properly restore scroll position and focus

### Cache Busting Strategy
- Update version query parameter when making CSS/JS changes
- Format: `?v=YYYYMMDDTHHM` (timestamp)
- Update in all HTML files that reference the modified resource

### Accessibility Considerations
- All interactive elements have `aria-label` attributes
- Modal implements focus trap for keyboard navigation
- Escape key closes modals and menus
- Tab navigation properly trapped within modals

### Mobile Considerations
- Viewport height calculated dynamically for mobile browsers
- Touch-friendly target sizes (min 44x44px)
- Hamburger menu handles orientation changes
- Body scroll locked during modal/menu display