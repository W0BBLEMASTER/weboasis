var t = document.getElementById("canvasContainer");
while (t.firstChild) {
    t.removeChild(t.firstChild);
}
t.style.backgroundColor = "black";
var i = document.createElement("iframe");
i.src = "file:///C:/Users/OMNIBOX-1/Downloads/Stuff4Gemini/Antigravity_Rip/index.html";
i.style.width = "100%";
i.style.height = "100%";
i.style.border = "none";
i.style.position = "absolute";
i.style.top = "0";
i.style.left = "0";
i.style.zIndex = "0";
t.appendChild(i);