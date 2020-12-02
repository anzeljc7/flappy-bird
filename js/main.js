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
let high; 

//tukaj se inicilaziriajo vse stvari
function init (){
    //inicializacija canvas in contexta
    canvas = document.getElementById("window");
    ctx = canvas.getContext("2d");
                                //path, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight,
    background = new Background("img/flapy.png",292, 45, 287, 400, 0, 0, 287, 400); 
    ground = new Background("img/flapy.png",584, 0, 336, 111, 0, 369, 336, 111);
    readyMessage = new Background("img/flapy.png",527, 517, 196, 183, 320/2-196/2, -183 , 196, 183);
    gameOver = new Background("img/flapy.png",292, 517, 233, 200, 320/2-233/2, -200 , 233, 200);
    medal = new Background("img/sprite.png");
    high = new Background("img/flapy.png",0, 517, 31, 15, 320/2-233/2+141,85+109, 31, 15);

    game = new Game("start", 60);       //762
    bird = new Bird("img/flapy.png",230, 690, 33, 23, 60, 180, 33, 23);
                                    //sx1  sy1  sx2  sy2 sWidth sHeight dWidth dHeight
    pipes = new Pipe("img/flapy.png", 0, 646, 56, 646, 52, 319, 53, 400);
    score = new Score();
    sound = new Sound();

    //event listenerji
    canvas.addEventListener("click", (e)=>{
        let rect = canvas.getBoundingClientRect();
        game.mouseX = e.clientX - rect.left;
        game.mouseY = e.clientY - rect.top;

        if(game.state == "game"){
            sound.playSound("flap");
            if(!bird.onSkyLimit() && game.state!="dead")
                bird.fly(pipes);
        }
        else if(game.state == "start"){
            sound.playSound("swooshing");
            game.state="game";
            bird.period = 6;
        }
        else if(game.state == "over") {
            if(game.checkMousePos(gameOver.posX+77, gameOver.posY+173, 79, 27))
                game.reset(bird, pipes, score, readyMessage, gameOver);
        }

    });

    canvas.addEventListener("mouseup", ()=>{
        sound.stopSound("flap");
        console.log("stop");
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

    background.draw(ctx, 2);   //mesto
    pipes.draw(ctx);    //pipe
    ground.draw(ctx, 2);    //trava

    if(game.state == "start")
        readyMessage.draw(ctx, 1);   //sporočilo za start
    
    if(game.state == "over"){
        gameOver.draw(ctx, 1);
        if(score.changed){
            high.draw(ctx, 1);
        }
    }
    
    score.draw(ctx, game.state);
    bird.draw(ctx);


    
}

//tukaj se updejtajo vsi elementi
function update(){
    if(game.state == "start" || game.state == "game"){    //animacija se izvaja ali smo na začetku, ali pa med igro
        if(game.frames%bird.period === 0)bird.frame++;
        if(bird.frame===3) bird.frame=0;

        if(game.state == "start"){
            readyMessage.animatedMove();
            bird.startMoving();     
        }
    }
    if(game.state == "game"){
        bird.move();
        pipes.delete(score.value);
        pipes.move(2);  //speed mora biti cela številka, drugače se pipe in ground ne nariše lepo
        ground.move(2);

        if(bird.onGround(ground.posY)){
            game.state = "over";
            score.changeScoreOption(0);
            sound.playSound("die")
        }
    
        if(game.frames%90== 0)
            pipes.generate();
        
        if(bird.touchingPipes(pipes)){
            sound.playSound("hit");
            game.state ="dead";
        }
        
        if(bird.goThrought(pipes)){
            score.changeValue();
            sound.playSound("score");
        }
    }
    else if(game.state=="dead"){
        bird.move();
        if(score.value > score.best){
            score.setBest();
            score.changed = true;
        }
        else if(score.value == score.best)
             score.setBest();
        if(bird.onGround(ground.posY)){
            game.state = "over";
            sound.playSound("die");
            score.changeScoreOption(0);
        }
    }
    else if(game.state == "over"){
        gameOver.animatedMove();
        score.animatedMove();
    }


    game.frames++;

    if(game.frames==91)
        game.frames = 1;

}




/*
    ackground = new Background("img/sprite.png",0, 0, 275, 225, 0, 255, 275, 225); 
    ground = new Background("img/sprite.png",276, 0, 224, 112, 0, 368, 224, 112);
    readyMessage = new Background("img/sprite.png",0, 229, 174, 152, 320/2-174/2+10, -152 , 174, 152);
    gameOver = new Background("img/sprite.png",175, 228, 225, 202, 320/2-225/2+10, -202 , 225, 202);
    medal = new Background("img/sprite.png");

    game = new Game("start", 60);
    bird = new Bird("img/sprite.png",276, 112, 34, 26, 60, 150, 34, 26);
    pipes = new Pipe("img/sprite.png", 553, 0, 502, 0, 53, 400, 53, 400);
    score = new Score();
    sound = new Sound();


*/