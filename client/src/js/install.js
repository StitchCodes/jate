const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Store event
    window.deferredPrompt = event;
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Show prompt
    promptEvent.prompt();

    // Event reset
    window.deferredPrompt = null;
});

window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
