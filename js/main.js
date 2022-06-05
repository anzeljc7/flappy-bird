function init() {


    //event listenerji

    canvas.addEventListener("click", (e) => {
        let rect = canvas.getBoundingClientRect();
        game.mouseX = e.clientX - rect.left;
        game.mouseY = e.clientY - rect.top;

        if (game.state == "game") {
            if (game.enableSound) sound.flap.cloneNode().play();
            if (!bird.onSkyLimit() && game.state != "dead") bird.fly(pipes);
        } else if (game.state == "start") {
            sound.playSound("swooshing");
            game.state = "game";
            bird.period = 6;
        } else if (game.state == "over") {
            if (game.checkMousePos(gameOver.posX + 77, gameOver.posY + 173, 79, 27))
                game.reset(bird, pipes, score, readyMessage, gameOver);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (game.isReady() && e.keyCode == "32" && !game.spaceUp) {
            game.spaceUp = true;
            if (game.enableSound) sound.flap.cloneNode().play();
            if (game.state == "game") {
                if (!bird.onSkyLimit() && game.state != "dead") bird.fly(pipes);
            } else if (game.state == "start") {
                sound.playSound("swooshing");
                game.state = "game";
                bird.period = 6;
            } else if (game.state == "over") {
                game.reset(bird, pipes, score, readyMessage, gameOver);
            }
        }
    });

    window.addEventListener("keyup", (e) => {
        if (e.keyCode == "32" && game.spaceUp) {
            game.spaceUp = false;
        }
    });

    document.getElementById("mode").addEventListener("click", () => {
        if (!game.dayMode) {
            game.modeColor = "#f3f3f3";
            document.getElementById("mode").children[0].style.transform = "rotate(0deg)";
            background = new Background("img/flapy.png", 0, 45, 287, 400, 0, 0, 287, 400);   //path, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight,
            game.dayMode = 1;
        }
        else {
            background = new Background("img/flapy.png", 292, 45, 287, 400, 0, 0, 287, 400);   //path, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight

            game.modeColor = "#999"
            document.getElementById("mode").children[0].style.transform = "rotate(360deg)";
            game.dayMode = 0;
        }
        document.getElementById("mode").children[0].style.transition = "all 1s"
        document.getElementById("mode").children[0].style.color = game.modeColor;
    });

    document.getElementById("flapy").addEventListener("click", () => {
        if (game.state == "start") {
            if (game.birdColor == 661) {
                document.getElementById("flapy").children[0].style.transform = "rotate(360deg)";
                document.getElementById("flapy").children[0].style.color = "#4BC1F8";
                game.birdColor = 517;
            }
            else if (game.birdColor == 517) {
                game.birdColor += 72;
                document.getElementById("flapy").children[0].style.transform = "rotate(0deg)";
                document.getElementById("flapy").children[0].style.color = "#FC3800";
            }
            else {
                game.birdColor = 661
                document.getElementById("flapy").children[0].style.transform = "rotate(-360deg)";
                document.getElementById("flapy").children[0].style.color = "orange";
            }


            bird = new Bird("img/flapy.png", 221, game.birdColor, 33, 23, 60, 180, 33, 23);
            document.getElementById("flapy").children[0].style.transition = "all 1s"
        }

    })

    document.getElementById("sound").addEventListener("click", () => {
        game.enableSound = !game.enableSound;
        if (game.enableSound)
            document.getElementById("sound").children[0].className = "fas fa-volume-up";
        else
            document.getElementById("sound").children[0].className = "fas fa-volume-mute";
    })

    document.getElementById("difficulty").addEventListener("click", () => {
        if (game.state == "start") {
            if (game.difficulty == 1) {
                document.getElementById("difficulty").children[0].className = "far fa-meh";
                game.difficulty++;
                game.pipeSpace = 90;
            }
            else if (game.difficulty == 2) {
                document.getElementById("difficulty").children[0].className = "far fa-frown";
                game.difficulty++;
                game.pipeSpace = 80;
            }
            else {
                document.getElementById("difficulty").children[0].className = "far fa-smile";
                game.difficulty = 1;
                game.pipeSpace = 100;
            }
            pipes = new Pipe("img/flapy.png", 112, 562, 168, 562, 53, 319, 51, 400, game.pipeSpace);
        }
    })

    requestAnimationFrame(loop); //po tem klicu se izvaja update
}

function loop(time) {
    setTimeout(function () {
        requestAnimationFrame(loop);
        // animating/drawing code goes here
        draw();
        update();

    }, 1000 / 80);



}


function draw() {
    //nastavi ozadje  NUJNO MORA BITI TU, DRUGAČE SO TRESLJAJI
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    background.draw(ctx, 2); //mesto
    pipes.draw(ctx); //pipe
    ground.draw(ctx, 2); //trava

    if (game.state == "start") readyMessage.draw(ctx, 1); //sporočilo za start

    if (game.state == "over") {
        gameOver.draw(ctx, 1); //game over

        if (score.changed) high.draw(ctx, 1); //new tag za high score

        if (score.value >= 50) medal1.draw(ctx, 1);          //medalje
        else if (score.value >= 35) medal2.draw(ctx, 1);
        else if (score.value >= 20) medal3.draw(ctx, 1);
        else if (score.value >= 10) medal4.draw(ctx, 1);
    }
    score.draw(ctx, game.state); //score, state pove kako se riše score
    bird.draw(ctx); //bird
}


function update() {
    if (game.state === "start" || game.state === "game") {
        //animacija se izvaja ali smo na začetku, ali pa med igro
        if (game.frames % bird.period === 0) bird.frame++;
        if (bird.frame === 3) bird.frame = 0;

        if (game.state === "start") {   //če je samo start, se pokaže začetni meni
            readyMessage.animatedMove();
            bird.startMoving();
        }
    }
    if (game.state === "game") {
        bird.move();
        pipes.delete(score.value);
        pipes.move(2); //speed mora biti cela številka, drugače se pipe in ground ne nariše lepo
        ground.move(2);

        if (bird.onGround(ground.posY)) {
            //če pade na tla umre
            game.state = "over";
            score.changeScoreOption(0);
            sound.playSound("die");
        }

        if (game.frames % 90 == 0) pipes.generate(); //vsakih 90 framov se nariše pipa

        if (bird.touchingPipes(pipes)) {
            //colission med pipo in flapijem + zaigra se zvok
            sound.playSound("hit");
            game.state = "dead";
        }

        if (bird.goThrought(pipes)) {
            //če gre čez pipo, dobi točko + zaigra se zvok
            score.changeValue();
            sound.playSound("score");
        }
    }
    else if (game.state == "dead") {
        //dead je state pred over
        bird.move();
        if (bird.onGround(ground.posY)) {
            game.state = "over"; //ko je mrtev in pade na tla je game over + zaigra se sound
            sound.playSound("die");
            score.changeScoreOption(0); //zamenja se način izpisovanja scora
        }
    }
    else if (game.state == "over") {
        //ko je konec igre se kliče animacija za game over okenček in score
        if (score.value > score.best) {
            //če je score večji od high scora ga nastavimo na best
            score.setBest(); //changed pove ali je potrebno narisati new zdraven best
            score.changed = true;
        }
        if (score.value == score.best) score.setBest(); //tudi če je enak ga je treba nastavit, saj se vrednost ne shrani

        gameOver.animatedMove();    //animiran prikaz scora in game over menija
        score.animatedMove();
    }

    game.frames++; //vsak krog zanke

    if (game.frames == 91) game.frames = 1; //uporablja se 1-90 framov, saj je tako najlažje za vse animacije k

}

