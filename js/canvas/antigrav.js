var t = document.getElementById("canvasContainer");
while (t.firstChild) {
    t.removeChild(t.firstChild);
}
t.style.backgroundColor = "black";

// Create Video Element for the Gradient
var v = document.createElement("video");
// Pointing to the asset on GitHub (assuming Antigravity_Rip folder is uploaded to root)
v.src = "Dash-Gradient.mp4";
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

// Create Image Element for the Agents (Overlay)
var img = document.createElement("img");
img.src = "root_background-agents.png";
img.style.width = "100%";
img.style.height = "100%";
img.style.objectFit = "cover";
img.style.position = "absolute";
img.style.top = "0";
img.style.left = "0";
img.style.zIndex = "1"; // On top of video, behind UI
img.style.opacity = "0.8"; // Adjust transparency if needed

t.appendChild(v);

// Create Second Image Element for another Agents overlay
var img2 = document.createElement("img");
img2.src = "background-agents.png";
img2.style.width = "100%";
img2.style.height = "100%";
img2.style.objectFit = "cover";
img2.style.position = "absolute";
img2.style.top = "0";
img2.style.left = "0";
img2.style.zIndex = "0.5"; // Behind the first image, on top of video
img2.style.opacity = "0.6"; // Slightly more transparent than the first

t.appendChild(img2);
t.appendChild(img);