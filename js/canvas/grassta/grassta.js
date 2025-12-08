function canvasApp(){
    var canvas = document.getElementById("matrixCanvas"); // Changed to target matrixCanvas
    var ctx=canvas.getContext('2d');
    var w=canvas.width=window.innerWidth;var h=canvas.height=window.innerHeight;

    var yPositions=Array(300).join(0).split('');
    var charColors = Array(300).fill(0); // To store color index for each character
    var colors = ['#0F0', '#F00', '#FF0']; // Green, Red, Yellow

    function drawScreen(){
        ctx.fillStyle='rgba(0,0,0,.07)';
        ctx.fillRect(0,0,w,h);
        ctx.font='10px Georgia';

        yPositions.map(function(y,index){
            var text=String.fromCharCode(100+ Math.random()*33);
            var x=(index*10);

            // Set color for this character
            ctx.fillStyle = colors[charColors[index] % colors.length];

            // Draw white outline
            ctx.strokeStyle = '#FFF'; // White outline
            ctx.lineWidth = 1;
            ctx.strokeText(text, x, y);

            // Draw black fill inside the outline (or as part of the outline effect)
            ctx.fillStyle = '#000'; // Black fill for inner outline effect
            ctx.fillText(text, x, y);

            // Draw the colored text over it
            ctx.fillStyle = colors[charColors[index] % colors.length]; // Reapply character color
            ctx.fillText(text, x, y);

            if(y > 100 + Math.random()*30000){ // Character falls off screen or randomly resets
                yPositions[index]=0;
                charColors[index] = 0; // Reset color index
            }else{
                yPositions[index]=y+ 10;
                charColors[index]++; // Cycle color
            }
        });
    }
    
    currentAnimationInterval = setInterval(drawScreen,45);
}
canvasApp();