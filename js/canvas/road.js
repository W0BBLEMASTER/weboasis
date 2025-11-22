
(() => {
    const container = document.getElementById('canvasContainer');
    if (!container) return;

    if (window.currentAnimationInterval) {
        clearInterval(window.currentAnimationInterval);
        window.currentAnimationInterval = null;
    }
    container.innerHTML = '';

    const iframe = Object.assign(document.createElement('iframe'), {
        id: 'customBackgroundIframe',
        src: 'https://itwillneverbethesame.com/',
        frameBorder: '0',
        allow: 'autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen; accelerometer; clipboard-write; web-share',
        allowFullscreen: true,
    });

    Object.assign(iframe.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '-1',
        objectFit: 'cover',
        filter: 'sepia(100%) hue-rotate(-90deg) saturate(300%)',
    });

    container.appendChild(iframe);
})();
