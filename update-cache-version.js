#!/usr/bin/env node

import fs from 'fs';
import { renderHomeHighlights } from './scripts/homeHighlights.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Keep a useful, indexable first response even when JavaScript is unavailable.
// portfolioData.json remains the source of truth; deploy already runs this script.
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/portfolioData.json'), 'utf8'));
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const profile = data.personalInfo;
const highlights = renderHomeHighlights(data, 'fr');
const homePreview = `<!-- portfolio-preview:start -->
        <section class="hero recruiter-hero" id="home">
            <div class="hero-content">
                <img src="${escapeHtml(profile.profileImage)}" alt="${escapeHtml(profile.name.fr)}" class="profile-img" width="200" height="200" fetchpriority="high">
                <h1>${escapeHtml(profile.name.fr)}</h1>
                <p class="hero-role">${escapeHtml(profile.title.fr)}</p>
            </div>
            <div class="hero-details">
                <p>${escapeHtml(profile.bio.fr)}</p>
                <p>${escapeHtml(profile.location)}</p>
                <div class="hero-cta">
                    <a class="cta-btn cta-secondary" href="projects.html">Voir mes projets</a>
                    <a class="cta-btn cta-primary hero-resume" href="${escapeHtml(profile.resume)}" target="_blank" rel="noopener noreferrer">Consulter le CV (PDF, français)</a>
                    <a class="cta-btn cta-secondary" href="https://www.linkedin.com/in/hamza-elyoubi/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
            ${highlights.stats}
        </section>
        ${highlights.projects}
        <!-- portfolio-preview:end -->`.replace(/^[ \t]+$/gm, '');

// Generate new version timestamp
const newVersion = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').substring(0, 13);

console.log(`Updating cache version to: ${newVersion}`);

// Files to update
const filesToUpdate = [
    'index.html',
    'ai.html',
    'projects.html',
    'trainings.html',
    'howto.html',
    'veille.html',
    'scripts/main.js',
    'scripts/dataLoader.js',
    'sw.js'
];

// Update each file
filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (file === 'index.html') {
            content = content.replace(/<!-- portfolio-preview:start -->[\s\S]*?<!-- portfolio-preview:end -->|<!-- Sections will be loaded dynamically -->/, homePreview);
        }
        
        // Update version parameters in all occurrences
        content = content.replace(/\?v=[\w\d]+/g, `?v=${newVersion}`);
        
        // Update service worker cache name
        if (file === 'sw.js') {
            content = content.replace(/portfolio-cache-v[\w\d]+/g, `portfolio-cache-v${newVersion}`);
        }
        
        // Update cache-bust meta tag
        content = content.replace(/name="cache-bust" content="[\w\d]+"/g, `name="cache-bust" content="${newVersion}"`);
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated ${file}`);
    } else {
        console.log(`❌ File not found: ${file}`);
    }
});

console.log('🎉 Cache version update completed!');
console.log('💡 Remember to commit and push these changes to trigger cache refresh.');
