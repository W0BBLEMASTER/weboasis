
(function() {
    const container = document.getElementById('canvasContainer');
    if (!container) return;

    if (window.currentAnimationInterval) {
        clearInterval(window.currentAnimationInterval);
        window.currentAnimationInterval = null;
    }
    container.innerHTML = '';

    const styleId = 'road-theme-style';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            #customBackgroundIframe {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: -1;
                object-fit: cover;
                filter: sepia(100%) hue-rotate(-90deg) saturate(300%);
            }
        `;
        document.head.appendChild(style);
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'customBackgroundIframe';
    iframe.src = 'https://itwillneverbethesame.com/';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen; accelerometer; clipboard-write; web-share';
    iframe.allowFullscreen = true;
    container.appendChild(iframe);
})();
