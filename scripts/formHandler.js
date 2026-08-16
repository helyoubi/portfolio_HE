document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            const lang = localStorage.getItem('language') || 'fr';
            const messages = {
                fr: {
                    success: 'Message envoyé avec succès !',
                    error: 'Oups ! Un problème est survenu lors de l\'envoi de votre message.'
                },
                en: {
                    success: 'Message sent successfully!',
                    error: 'Oops! There was a problem sending your message.'
                }
            };
            const t = messages[lang] || messages.fr;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert(t.success);
                    form.reset();
                } else {
                    alert(t.error);
                }
            } catch (error) {
                alert(t.error);
            }
        });
    }
});