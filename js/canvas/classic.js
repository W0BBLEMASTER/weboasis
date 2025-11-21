function canvasApp(){
    var canvas = document.createElement("canvas");
    var ctx=canvas.getContext('2d');
    var w=canvas.width=window.innerWidth;var h=canvas.height=window.innerHeight;
    document.getElementById("canvasContainer").appendChild(canvas);

    var yPositions=Array(300).join(0).split('');
    
    function drawScreen(){
        ctx.fillStyle='rgba(0,0,0,.07)';
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle='#0C85D3';
        ctx.font='10px Georgia';
        yPositions.map(function(y,index){
            text=String.fromCharCode(100+ Math.random()*33);
            x=(index*10);
            ctx.fillText(text,x,y);
            if(y>100+ Math.random()*30000){
                yPositions[index]=0;
            }else{
                yPositions[index]=y+ 10;
            }
        });
    }
    
    currentAnimationInterval = setInterval(drawScreen,45);
}
canvasApp();