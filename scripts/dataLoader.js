// dataLoader.js
export async function loadPortfolioData() {
    try {
        const response = await fetch('data/portfolioData.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to load portfolio data:', error);
        return null;
    }
}

export async function initializePortfolio(language = 'fr') {
    const data = await loadPortfolioData();
    if (!data) return;

    const personalInfo = data.personalInfo;
    const experience = data.experience[language];
    const education = data.education[language];
    const projects = data.projects[language];
    const softSkills = data.softSkills[language];
    const achievements = data.achievements[language];

    // Main Content
    document.getElementById('main-content').innerHTML = `
        <section id="home" class="hero">
            <div class="hero-content">
                <a href="https://www.linkedin.com/in/hamza-elyoubi/" target="_blank" rel="noopener noreferrer">
                    <img src="${personalInfo.profileImage}" alt="${personalInfo.name[language]}" class="profile-img">
                </a>
                <h1><span>${personalInfo.name[language]}</span></h1>
                <h3>${personalInfo.title[language]}</h3>
                <p class="title-note" style="font-size:0.95em;opacity:0.8;margin-bottom:1rem;">${personalInfo.titleNote ? personalInfo.titleNote[language] : ''}</p>
                <p>${personalInfo.bio[language]}</p>
                <div class="cta-container">
                    <a href="#contact" class="cta-btn">Get in Touch</a>
                    <a href="${personalInfo.resume}" download class="cta-btn download-btn">
                        <i class="fas fa-download"></i> Download CV
                    </a>
                </div>
            </div>
        </section>

        <section id="certifications" class="section visible">
            <h2 class="section-title">${language === 'fr' ? 'Certifications' : 'Certifications'}</h2>
            <div class="skills-container">
                <div class="skill-card">
                    <img src="assets/icons/github-copilot.png" alt="GitHub Copilot Certification" style="width:100px;height:auto;display:block;margin:0 auto 1rem;" onerror="this.onerror=null;this.src='assets/icons/githubcopilot_icon.png';">
                    <h3>${language === 'fr' ? 'Certification GitHub Copilot' : 'GitHub Copilot Certification'}</h3>
                    <p>${language === 'fr' ? 'Certifié par le programme de certification GitHub Copilot.' : 'Certified by GitHub Copilot Certification Program.'}</p>
                </div>
                <div class="skill-card">
                    <img src="assets/icons/l1_sofo.png" alt="SE L1 Certification" style="width:100px;height:auto;display:block;margin:0 auto 1rem;" onerror="this.onerror=null;this.src='assets/icons/placeholder.png';">
                    <h3>${language === 'fr' ? 'SE L1' : 'SE L1'}</h3>
                    <p>${language === 'fr' ? 'Certifié Ingénierie Logicielle Niveau 1.' : 'Software Engineering Level 1 Certified.'}</p>
                </div>
                <div class="skill-card">
                    <img src="assets/icons/psm1.png" alt="PSM I Certification" style="width:100px;height:auto;display:block;margin:0 auto 1rem;" onerror="this.onerror=null;this.src='assets/icons/placeholder.png';">
                    <h3>${language === 'fr' ? 'PSM I' : 'PSM I'}</h3>
                    <p>${language === 'fr' ? 'Professional Scrum Master I (PSM I) certifié par Scrum.org.' : 'Professional Scrum Master I (PSM I) Certified by Scrum.org.'}</p>
                </div>
            </div>
        </section>

        <section id="experience">
            <h2 class="section-title">Professional Experience</h2>
            <div class="timeline">
                ${experience.map((exp, index) => `
                    <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                        <h3>${exp.positions ? exp.positions.map(pos => pos.title).join(', ') : exp.position}</h3>
                        <h4>${exp.company}</h4>
                        <p class="duration">${exp.positions ? exp.positions.map(pos => pos.duration).join(', ') : exp.duration}</p>
                        <p class="description">${exp.positions ? exp.positions.map(pos => pos.achievements.join(', ')).join(', ') : exp.achievements.join(', ')}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="education">
            <h2 class="section-title">${language === 'fr' ? 'Éducation' : 'Education'}</h2>
            <div class="education-container">
                ${education.sort((a, b) => {
                    // Extract years for sorting (descending)
                    const getYear = str => {
                        const match = str.match(/(\d{4})/g);
                        return match ? Math.max(...match.map(Number)) : 0;
                    };
                    return getYear(b.degrees.join(' ')) - getYear(a.degrees.join(' '));
                }).map(edu => `
                    <div class="education-card">
                        <h3>${edu.institution}</h3>
                        <p>${edu.degrees.join(', ')}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="trainings">
            <h2 class="section-title">${language === 'fr' ? 'Formations & e-learning' : 'Professional Trainings & e-learning'}</h2>
            <div class="education-container" id="trainings-container">
                ${renderTrainings(data.trainings[language], 1, 3)}
            </div>
        </section>

        <section id="skills">
            <h2 class="section-title">Technical Skills</h2>
            <div class="skills-container">
                ${data.technicalExpertise.languages.map(skill => `
                    <div class="skill-card">
                        <h3>${skill}</h3>
                        <div class="skill-icon">
                            <i class="fas fa-code"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="frameworks">
            <h2 class="section-title">Frameworks</h2>
            <div class="skills-container">
                ${data.technicalExpertise.frameworks.map(framework => `
                    <div class="skill-card">
                        <h3>${framework}</h3>
                        <div class="skill-icon">
                            <i class="fas fa-cogs"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="tools">
            <h2 class="section-title">Tools</h2>
            <div class="skills-container">
                ${data.technicalExpertise.tools.map(tool => `
                    <div class="skill-card">
                        <h3>${tool}</h3>
                        <div class="skill-icon">
                            <i class="fas fa-wrench"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="architectures">
            <h2 class="section-title">Architectures</h2>
            <div class="skills-container">
                ${data.technicalExpertise.architectures.map(architecture => `
                    <div class="skill-card">
                        <h3>${architecture}</h3>
                        <div class="skill-icon">
                            <i class="fas fa-network-wired"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="softSkills">
            <h2 class="section-title">Soft Skills</h2>
            <div class="skills-container">
                ${softSkills.map(skill => `
                    <div class="skill-card">
                        <h3>${skill}</h3>
                        <div class="skill-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="projects">
            <h2 class="section-title">Projects</h2>
            <div class="projects-container">
                ${projects.map(project => `
                    <div class="project-card">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="languages">
            <h2 class="section-title">Languages</h2>
            <div class="languages-container">
                ${data.languages.map(language => `
                    <div class="language-card">
                        <h3>${language.name}</h3>
                        <p>${language.level}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="contact" class="contact">
            <h2 class="section-title">Get in Touch</h2>
            <form id="contactForm" action="https://formspree.io/f/mpwqdrdd" method="POST">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="cta-btn">Send Message</button>
            </form>
        </section>
    `;

    // Helper for pagination
    function renderTrainings(trainings, page = 1, perPage = 3) {
        const total = trainings.length;
        const totalPages = Math.ceil(total / perPage);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const currentTrainings = trainings.slice(start, end);

        let html = currentTrainings.map(training => `
            <div class="education-card">
                <h3>${training.institution}</h3>
                <p>${training.title}</p>
                <span style='font-size:0.95em;opacity:0.8;'>${training.date}</span>
                ${training.badgeUrl && training.badgeImg ? `<a href="${training.badgeUrl}" target="_blank" rel="noopener noreferrer"><img src="${training.badgeImg}" alt="Pluralsight Badge" style="width:80px;height:auto;margin-top:0.5rem;display:block;margin-left:auto;margin-right:auto;"></a>` : ''}
            </div>
        `).join('');

        // Pagination controls
        html += `
            <div class="pagination-controls">
                <button id="prevTrainings" ${page === 1 ? 'disabled' : ''}>&laquo; Prev</button>
                <span>Page ${page} of ${totalPages}</span>
                <button id="nextTrainings" ${page === totalPages ? 'disabled' : ''}>Next &raquo;</button>
            </div>
        `;
        return html;
    }

    // Add this after setting innerHTML to enable pagination
    setTimeout(() => {
        const trainingsContainer = document.getElementById('trainings-container');
        let currentPage = 1;
        const updateTrainings = (page) => {
            trainingsContainer.innerHTML = renderTrainings(data.trainings[language], page, 3);
            addPaginationListeners();
        };
        function addPaginationListeners() {
            const prevBtn = document.getElementById('prevTrainings');
            const nextBtn = document.getElementById('nextTrainings');
            if (prevBtn) prevBtn.onclick = () => { if (currentPage > 1) { currentPage--; updateTrainings(currentPage); } };
            if (nextBtn) nextBtn.onclick = () => { if (currentPage < Math.ceil(data.trainings[language].length / 3)) { currentPage++; updateTrainings(currentPage); } };
        }
        addPaginationListeners();
    }, 0);

    // Set last update date and time
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        const lastUpdateDate = new Date(document.lastModified);
        lastUpdateElement.innerHTML = `Last updated: ${lastUpdateDate.toLocaleDateString()} ${lastUpdateDate.toLocaleTimeString()}`;
    }

    // Language switcher functionality
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        // Set the flag based on the current language
        languageSwitcher.innerHTML = `<img src="assets/icons/${language === 'fr' ? 'en' : 'fr'}.png" alt="${language === 'fr' ? 'English' : 'French'} Flag">`;
        languageSwitcher.onclick = () => {
            const newLanguage = language === 'fr' ? 'en' : 'fr';
            initializePortfolio(newLanguage);
        };
    }
}