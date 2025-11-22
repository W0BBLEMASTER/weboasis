function runRoadAnimation() {
    var canvasContainer = document.getElementById('canvasContainer');

    // Clear any existing content and animation intervals
    if (window.currentAnimationInterval) {
        clearInterval(window.currentAnimationInterval);
        window.currentAnimationInterval = null;
    }
    if (canvasContainer) {
        while (canvasContainer.firstChild) {
            canvasContainer.removeChild(canvasContainer.firstChild);
        }
    }

    // Create the iframe
    var iframe = document.createElement('iframe');
    iframe.id = 'customBackgroundIframe';
    iframe.src = 'https://itwillneverbethesame.com/';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen; accelerometer; clipboard-write; web-share';
    iframe.allowFullscreen = true;
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.zIndex = '-1';
    iframe.style.objectFit = 'cover';
    iframe.style.filter = 'sepia(100%) hue-rotate(-90deg) saturate(300%)';

    // Append the iframe
    if (canvasContainer) {
        canvasContainer.appendChild(iframe);
    }
}
