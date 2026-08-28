// dataLoader.js
import { updateNavigationLanguage } from './hamburgerMenu.js?v=20260828T1035';

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

export async function initializePortfolio(language) {
    // Import language manager to get current language if not provided
    if (!language) {
        const { getCurrentLanguage } = await import('./languageManager.js');
        language = getCurrentLanguage();
    }
    const data = await loadPortfolioData();
    if (!data) return;

    const personalInfo = data.personalInfo;
    const experience = data.experience[language];
    const education = data.education[language];
    const aiExpertise = data.aiExpertise[language];
    const spokenLanguages = data.languages[language];
    const softSkills = data.softSkills[language];
    const careerHighlight = personalInfo.careerHighlight;
    const careerHighlightContent = careerHighlight?.[language];
    const renderAiTools = (tools) => tools.map(tool => `
        <article class="ai-tool-card">
            <div class="ai-tool-card__heading">
                <span class="ai-tool-card__mark" aria-hidden="true">${tool.name.slice(0, 2).toUpperCase()}</span>
                <div>
                    <h4>${tool.name}</h4>
                    <p class="ai-tool-card__role">${tool.role}</p>
                </div>
            </div>
            <p>${tool.description}</p>
        </article>
    `).join('');

    // Main Content
    document.getElementById('main-content').innerHTML = `
        <section id="home" class="hero">
            <div class="hero-content">
                <a href="https://www.linkedin.com/in/hamza-elyoubi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn — Hamza Elyoubi">
                    <img src="${personalInfo.profileImage}" alt="${personalInfo.name[language]}" class="profile-img">
                </a>
                <h1><span>${personalInfo.name[language]}</span></h1>
                <p class="hero-role">${personalInfo.title[language]}</p>
            </div>
            <div class="hero-details">
                ${personalInfo.titleNote ? `<p class="title-note" style="font-size:0.95em;opacity:0.8;margin-bottom:1rem;">${personalInfo.titleNote[language]}</p>` : ''}
                <p>${personalInfo.bio[language]}</p>
                <div class="hero-cta">
                    <a class="cta-btn cta-primary" href="https://www.linkedin.com/in/hamza-elyoubi/" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-linkedin" aria-hidden="true"></i>
                        <span>LinkedIn</span>
                    </a>
                    <a class="cta-btn cta-secondary" href="#contact">
                        <i class="fas fa-envelope" aria-hidden="true"></i>
                        <span>${language === 'fr' ? 'Me contacter' : 'Contact me'}</span>
                    </a>
                </div>
            </div>
            ${careerHighlight && careerHighlightContent ? `
                <aside class="career-highlight" aria-labelledby="career-highlight-title">
                    <div class="career-highlight__copy">
                        <span class="career-highlight__eyebrow">${careerHighlightContent.eyebrow}</span>
                        <h2 id="career-highlight-title">${careerHighlightContent.title}</h2>
                        <p>${careerHighlightContent.summary}</p>
                    </div>
                    <button id="career-postcard" class="career-postcard" type="button" aria-pressed="false" aria-label="${careerHighlightContent.revealLabel}">
                        <span class="career-postcard__inner">
                            <span class="career-postcard__face career-postcard__front">
                                <img src="${careerHighlight.images.front}" alt="${careerHighlightContent.frontAlt}" width="1200" height="828" decoding="async">
                            </span>
                            <span class="career-postcard__face career-postcard__back">
                                <img src="${careerHighlight.images.message}" alt="${careerHighlightContent.messageAlt}" width="1190" height="850" decoding="async">
                            </span>
                        </span>
                    </button>
                    <blockquote class="career-highlight__quote">
                        <span class="career-highlight__hint">${careerHighlightContent.hint}</span>
                        <span class="career-highlight__message">“${careerHighlightContent.quote}”</span>
                    </blockquote>
                    <div class="career-highlight__actions">
                        <button class="career-highlight__toggle" type="button" aria-controls="career-postcard">
                            <i class="fas fa-rotate" aria-hidden="true"></i>
                            <span>${careerHighlightContent.revealLabel}</span>
                        </button>
                        <button class="career-highlight__expand" type="button" aria-controls="career-lightbox" aria-expanded="false">
                            <i class="fas fa-expand" aria-hidden="true"></i>
                            <span>${careerHighlightContent.expandLabel}</span>
                        </button>
                    </div>
                </aside>
                <div id="career-lightbox" class="career-lightbox" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="career-lightbox-title" style="display: none;">
                        <div class="career-lightbox__content">
                            <div class="career-lightbox__header">
                                <h2 id="career-lightbox-title">${careerHighlightContent.frontDialogTitle}</h2>
                                <button class="career-lightbox__dismiss" type="button" aria-label="${careerHighlightContent.closeLabel}">
                                    <i class="fas fa-xmark" aria-hidden="true"></i>
                                </button>
                            </div>
                            <img class="career-lightbox__image" src="${careerHighlight.images.front}" alt="${careerHighlightContent.frontAlt}" width="1200" height="828" decoding="async">
                        </div>
                </div>
            ` : ''}
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
            <h2 class="section-title">${language === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience'}</h2>
            <div class="timeline">
                ${experience.map((exp, index) => `
                    <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                        <h3>${exp.positions ? exp.positions.map(pos => pos.title).join(', ') : exp.position}</h3>
                        <h4>${exp.company}</h4>
                        <p class="duration">${exp.positions ? exp.positions.map(pos => pos.duration).join(', ') : exp.duration}</p>
                        <div class="description">
                            ${exp.positions ? exp.positions.map(pos => pos.achievements.map(ach => `<div class="achievement">${ach}</div>`).join('')).join('') : exp.achievements.map(ach => `<div class="achievement">${ach}</div>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="ai-expertise" class="ai-expertise" aria-labelledby="ai-expertise-title">
            <header class="ai-expertise__header">
                <span class="ai-expertise__eyebrow">${aiExpertise.eyebrow}</span>
                <h2 id="ai-expertise-title" class="section-title">${aiExpertise.title}</h2>
                <p>${aiExpertise.intro}</p>
            </header>

            <div class="ai-evidence" aria-label="${aiExpertise.eyebrow}">
                ${aiExpertise.evidence.map((item, index) => `
                    <article class="ai-evidence__item">
                        <span class="ai-evidence__index" aria-hidden="true">0${index + 1}</span>
                        <div>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    </article>
                `).join('')}
            </div>

            <div class="ai-expertise__content">
                <div class="ai-tool-groups">
                    <section class="ai-tool-group ai-tool-group--professional" aria-labelledby="ai-professional-tools-title">
                        <h3 id="ai-professional-tools-title" class="ai-expertise__subheading">${aiExpertise.professionalToolsTitle}</h3>
                        <p class="ai-tool-group__note">${aiExpertise.professionalToolsNote}</p>
                        <div class="ai-tools__grid">
                            ${renderAiTools(aiExpertise.professionalTools)}
                        </div>
                    </section>

                    <section class="ai-tool-group ai-tool-group--personal" aria-labelledby="ai-personal-tools-title">
                        <h3 id="ai-personal-tools-title" class="ai-expertise__subheading">${aiExpertise.personalToolsTitle}</h3>
                        <p class="ai-tool-group__note">${aiExpertise.personalToolsNote}</p>
                        <div class="ai-tools__grid">
                            ${renderAiTools(aiExpertise.personalTools)}
                        </div>
                        <a class="ai-projects-link" href="projects.html">
                            <span class="ai-projects-link__icon" aria-hidden="true"><i class="fas fa-folder-open"></i></span>
                            <span>
                                <strong>${aiExpertise.projectsLinkLabel}</strong>
                                <small>${aiExpertise.projectsLinkHint}</small>
                            </span>
                            <i class="fas fa-arrow-right ai-projects-link__arrow" aria-hidden="true"></i>
                        </a>
                    </section>
                </div>

                <aside class="ai-guardrails">
                    <h3 class="ai-expertise__subheading">${aiExpertise.principlesTitle}</h3>
                    <ul>
                        ${aiExpertise.principles.map(principle => `
                            <li><i class="fas fa-check" aria-hidden="true"></i><span>${principle}</span></li>
                        `).join('')}
                    </ul>
                </aside>
            </div>

            <div class="ai-workflow">
                <h3 class="ai-expertise__subheading">${aiExpertise.workflowTitle}</h3>
                <ol class="ai-workflow__steps">
                    ${aiExpertise.workflow.map((step, index) => `
                        <li>
                            <span class="ai-workflow__number" aria-hidden="true">${index + 1}</span>
                            <div>
                                <h4>${step.title}</h4>
                                <p>${step.description}</p>
                            </div>
                        </li>
                    `).join('')}
                </ol>
            </div>

            <a class="ai-expertise__link" href="howto.html">
                <span>${aiExpertise.resourceLabel}</span>
                <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
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

        <!-- Trainings section moved to separate page: trainings.html -->

        <section id="skills">
            <h2 class="section-title">${language === 'fr' ? 'Compétences Techniques' : 'Technical Skills'}</h2>
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
            <h2 class="section-title">${language === 'fr' ? 'Frameworks' : 'Frameworks'}</h2>
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
            <h2 class="section-title">${language === 'fr' ? 'Outils' : 'Tools'}</h2>
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
            <h2 class="section-title">${language === 'fr' ? 'Architectures' : 'Architectures'}</h2>
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
            <h2 class="section-title">${language === 'fr' ? 'Compétences Transversales' : 'Soft Skills'}</h2>
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

        <!-- Projects section moved to separate page: projects.html -->

        <section id="languages">
            <h2 class="section-title">${language === 'fr' ? 'Langues' : 'Languages'}</h2>
            <div class="languages-container">
                ${spokenLanguages.map(spokenLanguage => `
                    <div class="language-card">
                        <h3>${spokenLanguage.name}</h3>
                        <p>${spokenLanguage.level}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="contact" class="contact">
            <h2 class="section-title">${language === 'fr' ? 'Contactez-moi' : 'Get in Touch'}</h2>
            <div class="contact-channels">
                <a class="contact-channel" href="https://www.linkedin.com/in/hamza-elyoubi/" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin" aria-hidden="true"></i>
                    <span>LinkedIn</span>
                </a>
                <span class="contact-channel contact-channel--static">
                    <i class="fas fa-location-dot" aria-hidden="true"></i>
                    <span>Nantes, France</span>
                </span>
            </div>
            <form id="contactForm" action="https://formspree.io/f/mpwqdrdd" method="POST">
                <div class="form-group">
                    <label for="name">${language === 'fr' ? 'Nom' : 'Name'}</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">${language === 'fr' ? 'Email' : 'Email'}</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">${language === 'fr' ? 'Message' : 'Message'}</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="cta-btn">${language === 'fr' ? 'Envoyer le message' : 'Send Message'}</button>
            </form>
        </section>
    `;

    const aiMotionItems = document.querySelectorAll(
        '.ai-evidence__item, .ai-tool-group, .ai-tool-card, .ai-guardrails, .ai-workflow__steps li, .ai-projects-link'
    );
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
        aiMotionItems.forEach(item => item.classList.add('is-visible'));
    } else {
        const aiMotionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -32px' });

        aiMotionItems.forEach((item, index) => {
            item.classList.add('ai-motion-item');
            item.style.setProperty('--ai-motion-delay', `${Math.min(index % 5, 4) * 45}ms`);
            aiMotionObserver.observe(item);
        });
    }

    // Set last update date and time
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        const lastUpdateDate = new Date(document.lastModified);
        const text = language === 'fr' ? 'Dernière mise à jour:' : 'Last updated:';
        lastUpdateElement.innerHTML = `${text} ${lastUpdateDate.toLocaleDateString()} ${lastUpdateDate.toLocaleTimeString()}`;
    }

    const postcard = document.querySelector('.career-postcard');
    const postcardToggle = document.querySelector('.career-highlight__toggle');
    const postcardExpand = document.querySelector('.career-highlight__expand');
    const careerLightbox = document.getElementById('career-lightbox');
    const careerLightboxDismiss = document.querySelector('.career-lightbox__dismiss');
    const careerLightboxImage = document.querySelector('.career-lightbox__image');
    const careerLightboxTitle = document.getElementById('career-lightbox-title');
    if (postcard && postcardToggle && postcardExpand && careerLightbox && careerLightboxDismiss && careerLightboxImage && careerLightboxTitle && careerHighlightContent) {
        const toggleLabel = postcardToggle.querySelector('span');
        let lightboxTrigger = null;
        const setPostcardState = (isRevealed) => {
            postcard.classList.toggle('is-revealed', isRevealed);
            postcard.setAttribute('aria-pressed', String(isRevealed));
            postcard.setAttribute('aria-label', isRevealed ? careerHighlightContent.hideLabel : careerHighlightContent.revealLabel);
            toggleLabel.textContent = isRevealed ? careerHighlightContent.hideLabel : careerHighlightContent.revealLabel;
        };
        const togglePostcard = () => setPostcardState(!postcard.classList.contains('is-revealed'));
        const openCareerLightbox = () => {
            const isRevealed = postcard.classList.contains('is-revealed');
            lightboxTrigger = document.activeElement;
            careerLightboxImage.src = isRevealed ? careerHighlight.images.message : careerHighlight.images.front;
            careerLightboxImage.alt = isRevealed ? careerHighlightContent.messageAlt : careerHighlightContent.frontAlt;
            careerLightboxImage.width = isRevealed ? 1190 : 1200;
            careerLightboxImage.height = isRevealed ? 850 : 828;
            careerLightboxTitle.textContent = isRevealed ? careerHighlightContent.messageDialogTitle : careerHighlightContent.frontDialogTitle;
            careerLightbox.style.display = 'flex';
            careerLightbox.setAttribute('aria-hidden', 'false');
            postcardExpand.setAttribute('aria-expanded', 'true');
            document.body.classList.add('career-lightbox-open');
            window.setTimeout(() => careerLightboxDismiss.focus(), 0);
        };
        const closeCareerLightbox = () => {
            careerLightbox.style.display = 'none';
            careerLightbox.setAttribute('aria-hidden', 'true');
            postcardExpand.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('career-lightbox-open');
            if (lightboxTrigger instanceof HTMLElement && document.contains(lightboxTrigger)) {
                window.setTimeout(() => lightboxTrigger.focus(), 0);
            }
        };
        postcard.addEventListener('click', togglePostcard);
        postcardToggle.addEventListener('click', togglePostcard);
        postcardExpand.addEventListener('click', openCareerLightbox);
        careerLightboxDismiss.addEventListener('click', closeCareerLightbox);
        careerLightbox.addEventListener('click', (event) => {
            if (event.target === careerLightbox) closeCareerLightbox();
        });
        careerLightbox.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                closeCareerLightbox();
            } else if (event.key === 'Tab') {
                event.preventDefault();
                careerLightboxDismiss.focus();
            }
        });

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.setTimeout(() => setPostcardState(true), 1400);
        }
    }

    // Language switcher functionality - use the new language manager
    import('./languageManager.js').then(({ initializeLanguageSwitcher, setCurrentLanguage }) => {
        // Set current language in localStorage
        setCurrentLanguage(language);
        
        // Initialize language switcher
        initializeLanguageSwitcher((newLanguage) => {
            initializePortfolio(newLanguage);
        });
    });
    
    // Update navigation language
    updateNavigationLanguage(language);
    
    // Handle URL hash after content is loaded
    setTimeout(() => {
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }, 500); // Délai pour s'assurer que le contenu est rendu
}
