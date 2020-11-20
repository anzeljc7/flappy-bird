
class Game{
    constructor(state, FPS){
        this.state = state;
        this.FRAMES_PER_SECOND = FPS;

        this.frames = 1;
        this.lastFrameTime = 0;
        this.FRAME_MIN_TIME = (1000/60) * (60 / this.FRAMES_PER_SECOND) - (1000/60) * 0.5;
    }


    reset(bird){
        bird.posY = 150;
        bird.speed = 0;
    }

}