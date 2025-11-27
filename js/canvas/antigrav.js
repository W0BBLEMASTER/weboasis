var t = document.getElementById("canvasContainer");
while (t.firstChild) {
    t.removeChild(t.firstChild);
}
t.style.backgroundColor = "black";

// Create Video Element for the Gradient
var v = document.createElement("video");
// Pointing to the asset on GitHub (assuming Antigravity_Rip folder is uploaded to root)
v.src = "https://cdn.jsdelivr.net/gh/W0BBLEMASTER/weboasis@master/js/canvas/Dash-Gradient.mp4";
v.autoplay = true;
v.loop = true;
v.muted = true;
v.playsInline = true;
v.style.width = "100%";
v.style.height = "100%";
v.style.objectFit = "cover";
v.style.position = "absolute";
v.style.top = "0";
v.style.left = "0";
v.style.zIndex = "0"; // Behind content



t.appendChild(v);


