// Delegation handles forms inserted or replaced after a language switch.
document.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || form.id !== 'contactForm') return;
    event.preventDefault();
    if (form.dataset.submitting === 'true' || !form.reportValidity()) return;
    const language = document.documentElement.lang === 'en' ? 'en' : 'fr';
    const messages = {
        fr: { sending: 'Envoi en cours…', success: 'Merci, votre message a été envoyé.', error: 'Le message n’a pas pu être envoyé. Réessayez ou contactez-moi sur LinkedIn.' },
        en: { sending: 'Sending…', success: 'Thank you, your message has been sent.', error: 'Your message could not be sent. Please try again or contact me on LinkedIn.' }
    }[language];
    const button = form.querySelector('[type="submit"]');
    const label = button.textContent;
    const status = form.querySelector('[role="status"]');
    form.dataset.submitting = 'true';
    button.disabled = true;
    button.textContent = messages.sending;
    status.textContent = messages.sending;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
        const response = await fetch(form.action, {
            method: 'POST', body: new FormData(form),
            headers: { Accept: 'application/json' }, signal: controller.signal
        });
        if (!response.ok) throw new Error('Submission failed');
        status.textContent = messages.success;
        form.reset();
    } catch {
        status.textContent = messages.error;
    } finally {
        clearTimeout(timeout);
        form.dataset.submitting = 'false';
        button.disabled = false;
        button.textContent = label;
    }
});
