#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Generate new version timestamp
const newVersion = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').substring(0, 12);

console.log(`Updating cache version to: ${newVersion}`);

// Files to update
const filesToUpdate = [
    'index.html',
    'projects.html',
    'trainings.html',
    'howto.html',
    'veille.html',
    'sw.js'
];

// Update each file
filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
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