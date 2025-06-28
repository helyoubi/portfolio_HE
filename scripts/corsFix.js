// Fix for local file CORS issue
window.addEventListener('DOMContentLoaded', () => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.contentWindow.Promise = Promise;
});
