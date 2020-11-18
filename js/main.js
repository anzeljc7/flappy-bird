//gloablne spremenljivke
let canvas;
let ctx;
let background;
let ground;

//tukaj se inicilaziriajo vse stvari
function init (){
    //inicializacija canvas in contexta
    canvas = document.getElementById("window");
    ctx = canvas.getContext("2d");
    
    background = new Background("img/sprite.png",0, 0, 275, 225, 0, 255, 275, 225);   //sprite, sX, sY, sWidth, sHeight, dX, dY
    ground = new Background("img/sprite.png",276, 0, 224, 112, 0, 368, 224, 112);
    loop();//po tem klicu se izvaja update
}

//glavna zanka, v kateri se vse izvaja
function loop(){
     //nastavi ozadje  NUJNO MORA BITI TU, DRUGAČE TRESE
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    draw();
    update();
    requestAnimationFrame(loop);
}

//tukaj se narišejo vsi elementi
function draw(){
    //ozadje
    background.draw(ctx, 3);
    ground.draw(ctx, 2);
}

//tukaj se updejtajo vsi elementi
function update(){
    //ozadje

}