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

export async function initializePortfolio() {
    const data = await loadPortfolioData();
    if (!data) return;

    // Main Content
    document.getElementById('main-content').innerHTML = `
        <section id="home" class="hero">
            <div class="hero-content">
                <img src="${data.personalInfo.profileImage}" alt="${data.personalInfo.name}" class="profile-img">
                <h1>Hi, I'm <span>${data.personalInfo.name}</span></h1>
                <h3>${data.personalInfo.title}</h3>
                <p>${data.personalInfo.bio}</p>
                <div class="cta-container">
                    <a href="#contact" class="cta-btn">Get in Touch</a>
                    <a href="${data.personalInfo.resume}" download class="cta-btn download-btn">
                        <i class="fas fa-download"></i> Download CV
                    </a>
                </div>
            </div>
        </section>

        <section id="experience">
            <h2 class="section-title">Professional Experience</h2>
            <div class="timeline">
                ${data.experience.map((exp, index) => `
                    <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                        <h3>${exp.positions ? exp.positions.map(pos => pos.title).join(', ') : exp.position}</h3>
                        <h4>${exp.company}</h4>
                        <p class="duration">${exp.positions ? exp.positions.map(pos => pos.duration).join(', ') : exp.duration}</p>
                        <p class="description">${exp.positions ? exp.positions.map(pos => pos.achievements.join(', ')).join(', ') : exp.achievements.join(', ')}</p>
                    </div>
                `).join('')}
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

        <section id="methodologies">
            <h2 class="section-title">Methodologies</h2>
            <div class="skills-container">
                ${data.technicalExpertise.methodologies.map(methodology => `
                    <div class="skill-card">
                        <h3>${methodology}</h3>
                        <div class="skill-icon">
                            <i class="fas fa-project-diagram"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="projects">
            <h2 class="section-title">Projects</h2>
            <div class="projects-container">
                ${data.projects.map(project => `
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
}