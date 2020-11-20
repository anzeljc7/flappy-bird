//gloablne spremenljivke
let canvas;
let ctx;
let background;
let ground;
let readyMessage;
let gameOver;
let game;
let bird;

//tukaj se inicilaziriajo vse stvari
function init (){
    //inicializacija canvas in contexta
    canvas = document.getElementById("window");
    ctx = canvas.getContext("2d");
                                //path, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight,
    background = new Background("img/sprite.png",0, 0, 275, 225, 0, 255, 275, 225); 
    ground = new Background("img/sprite.png",276, 0, 224, 112, 0, 368, 224, 112);
    readyMessage = new Background("img/sprite.png",0, 228, 173, 152, 320/2-173/2, 85 , 173, 152);
    gameOver = new Background("img/sprite.png",175, 228, 225, 202, 320/2-225/2, 85 , 225, 202);

    game = new Game("start", 60);
    bird = new Bird("img/sprite.png",276, 112, 34, 26, 60, 150, 34, 26);

    //event listenerji
    canvas.addEventListener("click", ()=>{
        if(game.state == "start"){
            game.state="game";
            bird.period = 10;
        }
        else if(game.state == "game"){
            if(!bird.onSkyLimit())
                bird.fly();
        }
        else if(game.state == "over") {
            game.state="start";
            game.reset(bird);
            bird.period = 5;
        }
    });
    requestAnimationFrame(loop);//po tem klicu se izvaja update
}

//glavna zanka, v kateri se vse izvaja
function loop(time){
    draw();
    update();
    
    if(game.time-game.lastFrameTime < game.FRAME_MIN_TIME){ //skip the frame if the call is too early
        requestAnimationFrame(loop);
        return; // return as there is nothing to do
    }
    game.lastFrameTime = time; // remember the time of the rendered frame
    requestAnimationFrame(loop);
}

//tukaj se narišejo vsi elementi
function draw(){
    //nastavi ozadje  NUJNO MORA BITI TU, DRUGAČE TRESE
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    background.draw(ctx, 3);   //mesto
    ground.draw(ctx, 2);    //trava

    if(game.state === "start") readyMessage.draw(ctx, 1);   //sporočilo za start

    if(game.state === "over") gameOver.draw(ctx, 1);

    bird.draw(ctx);
}

//tukaj se updejtajo vsi elementi
function update(){
    if(game.state === "start" || game.state === "game"){
         if(game.frames%bird.period === 0)bird.frame++;
         else if(bird.frame===3) bird.frame=0;
    }

    if(game.state === "game"){
        bird.move();
        if(bird.onGround(ground.posY)){
            game.state = "over";
        }
        
    }
    game.frames++;
}