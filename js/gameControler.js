
class Game{
    constructor(state, FPS){
        this.state = state;
        this.FRAMES_PER_SECOND = FPS;

        this.frames = 1;
        this.lastFrameTime = 0;
        this.FRAME_MIN_TIME = (1000/60) * (60 / this.FRAMES_PER_SECOND) - (1000/60) * 0.5;
        this.mouseX = 0;
        this.mouseY = 0;
    }


    reset(bird, pipes, score, readyMessage, gameOver){
        bird.posY = 180;
        bird.speed = 0;
        bird.rotate = 0;
        bird.posX = 60; 
        bird.period = 5;
        this.state = "start";
        pipes.positions = [];

        readyMessage.posY = -readyMessage.height;
        gameOver.posY = - gameOver.height;

        score.value =0;
        score.changed = false;
        score.changeScoreOption(1);
    }
    checkMousePos(posX, posY, width, height){
        return (this.mouseX > posX && this.mouseX < posX+width && this.mouseY > posY && this.mouseY < posY+height);
    }

}