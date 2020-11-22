//gloablne spremenljivke
let canvas;
let ctx;
let background;
let ground;
let readyMessage;
let gameOver;
let game;
let bird;
let pipes;
let score;
let sound;

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
    medal = new Background("img/sprite.png");

    game = new Game("start", 60);
    bird = new Bird("img/sprite.png",276, 112, 34, 26, 60, 150, 34, 26);
    pipes = new Pipe("img/sprite.png", 553, 0, 502, 0, 53, 400, 53, 400);
    score = new Score();
    sound = new Sound();

    //event listenerji
    canvas.addEventListener("click", (e)=>{
        let rect = canvas.getBoundingClientRect();
        game.mouseX = e.clientX - rect.left;
        game.mouseY = e.clientY - rect.top;

        if(game.state == "start"){
            sound.playSound("swooshing");
            game.state="game";
            bird.period = 6;
        }
        else if(game.state == "game"){
            sound.playSound("flap");
            if(!bird.onSkyLimit() && game.state!="dead")
                bird.fly(pipes);
        }
        else if(game.state == "over") {
            if(game.checkMousePos(117, 253, 83, 29))
                game.reset(bird, pipes, score);
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
    pipes.draw(ctx);
    ground.draw(ctx, 2);    //trava

    if(game.state === "start") {
        readyMessage.draw(ctx, 1);   //sporočilo za start
    }
    if(game.state === "over"){
        gameOver.draw(ctx, 1);
    }

    score.draw(ctx, game.state);
    bird.draw(ctx);
    
}

//tukaj se updejtajo vsi elementi
function update(){
    if(game.state === "start" || game.state === "game"){    //animacija se izvaja ali smo na začetku, ali pa med igro
         if(game.frames%bird.period === 0)bird.frame++;
         else if(bird.frame===3) bird.frame=0;
    }
    if(game.state === "game"){
        bird.move();
        if(bird.onGround(ground.posY)){
            game.state = "over";
            sound.playSound("die")
        }
    
        if(game.frames%90== 0){
            pipes.generate();
        }
        if(bird.touchingPipes(pipes)){
            game.state ="dead";
            sound.playSound("hit");
        }
        pipes.delete(score.value);
        
        if(bird.goThrought(pipes)){
            score.changeValue();
            sound.playSound("score");
        }

        pipes.move(1.8);
        ground.move(1.8);
    }
    else if(game.state==="dead"){
        bird.move();
        if(bird.onGround(ground.posY)){
            game.state = "over";
            sound.playSound("die");
        }
    }


    game.frames++;

    if(game.frames==91)
        game.frames = 1;

}