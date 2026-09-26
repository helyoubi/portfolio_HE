// Shared by the live page and its HTML preview to keep both in sync.
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

export function renderHomeHighlights(data, language) {
    const copy = data.homepage[language];
    return {
        stats: `<dl class="hero-proof">${copy.stats.map(item => `
            <div><dt>${escapeHtml(item.label)}</dt><dd>${escapeHtml(item.value)}</dd></div>
        `).join('')}</dl>`,
        projects: `<section class="featured-work" aria-labelledby="featured-work-title">
            <header class="featured-work__header">
                <div><h2 id="featured-work-title">${escapeHtml(copy.title)}</h2><p>${escapeHtml(copy.intro)}</p></div>
                <a href="projects.html">${escapeHtml(copy.allProjects)}</a>
            </header>
            <div class="featured-work__grid">${copy.projects.map(item => {
                const project = data.projects[language].find(project => project.title === item.title);
                return `<article class="featured-work__card">
                    <img class="featured-work__image" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" width="800" height="500" loading="lazy" decoding="async">
                    <div class="featured-work__body">
                        <p class="featured-work__category">${escapeHtml(project.category)}</p>
                        <h3>${escapeHtml(project.title)}</h3>
                        <p>${escapeHtml(project.summary)}</p>
                        <p class="featured-work__detail">${escapeHtml(item.detail)}</p>
                        <ul class="project-stack">${project.technologies.slice(0, 3).map(technology => `<li>${escapeHtml(technology)}</li>`).join('')}</ul>
                        <a href="projects.html">${escapeHtml(copy.viewProject)} ${escapeHtml(project.title)}</a>
                    </div>
                </article>`;
            }).join('')}</div>
        </section>`
    };
}
