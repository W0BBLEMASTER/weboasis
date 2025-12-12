// Horses Roulette - PRJ_PYRAMID
// Randomly selects an AI Generated Video from the "Horses" collection.
// Convention: horses001.mp4 to horses010.mp4 (Scalable)

(function() {
    console.log("[HORSES] Initializing Roulette...");

    var container = document.getElementById("canvasContainer");
    if (!container) {
        console.error("[HORSES] canvasContainer not found.");
        return;
    }

    // Clear existing content
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    container.style.backgroundColor = "black";

    // Configuration
    var BASE_URL = "https://raw.githack.com/W0BBLEMASTER/weboasis/master/js/canvas/horses/"; 
    // OR use archive.org if files are heavy. For now, assuming relative githack structure.
    
    // For POC, we assume files are named horses001.mp4 ...
    var FILE_PREFIX = "horses";
    var FILE_EXT = ".mp4";
    var COUNT = 11; // Updated to 11 available files

    // Random Selection
    var id = Math.floor(Math.random() * COUNT) + 1; // 1 to COUNT
    var padId = String(id).padStart(3, '0'); // 001, 002...
    var videoSrc = BASE_URL + FILE_PREFIX + padId + FILE_EXT;

    // Fallback/Test Mode (If files aren't uploaded yet, use a placeholder or specific one)
    // videoSrc = "https://raw.githack.com/W0BBLEMASTER/weboasis/master/js/canvas/horses/assets/horses001.mp4"; 

    console.log("[HORSES] Selected: " + videoSrc);

    // Create Video Element
    var video = document.createElement("video");
    video.id = "horsesVideo";
    video.src = videoSrc;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    
    // Style for Full Background
    video.style.position = "absolute";
    video.style.top = "0";
    video.style.left = "0";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover"; // Ensures it covers the screen
    video.style.zIndex = "0";

    // Error Handling (Retry)
    video.onerror = function() {
        console.error("[HORSES] Failed to load: " + videoSrc);
        // Retry once with a different ID or fallback to static image
        // For now, let's just log it.
    };

    container.appendChild(video);
    console.log("[HORSES] Video Injected.");

})();
