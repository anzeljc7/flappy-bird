
function init (){
    //globalne spremenljivke so v drugi datoteki

    //event listener za klik miške
    window.addEventListener("click", (e)=>{
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

    //event listener za release miške
    window.addEventListener("mouseup", ()=>{
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
        gameOver.draw(ctx, 1);  //game over
        if(score.changed){
            high.draw(ctx, 1);  //new za high score
        }
    }
    score.draw(ctx, game.state);    //game.state pove kako se riše score    
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

        if(bird.onGround(ground.posY)){ //če pade na tla umre
            game.state = "over";
            score.changeScoreOption(0);
            sound.playSound("die")
        }
    
        if(game.frames%90== 0)  //vsakih 90 framov se nariše pipa
            pipes.generate();
        
        if(bird.touchingPipes(pipes)){     //colission med pipo in flapijem + zaigra se zvok
            sound.playSound("hit");
            game.state ="dead";
        }

        if(bird.goThrought(pipes)){     //če gre čez pipo, dobi točko + zaigra se zvok
            score.changeValue();
            sound.playSound("score");
        }
    }   
    else if(game.state=="dead"){            //dead je state pred over
        bird.move();
        if(score.value > score.best){       //če je score večji od high scora ga nastavimo na best
            score.setBest();                //changed pove ali je potrebno narisati new zdraven best
            score.changed = true;
        }
        else if(score.value == score.best)  //tudi če je enak ga je treba nastavit, saj se vrednost ne shrani
             score.setBest();
        if(bird.onGround(ground.posY)){     
            game.state = "over";            //ko je mrtev in pade na tla je game over + zaigra se sound
            sound.playSound("die");
            score.changeScoreOption(0);     //zamenja se način izpisovanja scora
        }
    }   
    else if(game.state == "over"){          //ko je konec igre se kliče animacija za game over okenček in score
        gameOver.animatedMove();
        score.animatedMove();
    }


    game.frames++;

    if(game.frames==91)     //uporablja se 1-90 framov, saj je tako najlažje za vse animacije ko
        game.frames = 1;

}




/*  
STAREJŠI SPRITE SHEET   
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