class Sound {
    constructor() {
        this.score = new Audio();
        this.flap = new Audio();
        this.hit = new Audio();
        this.swooshing = new Audio();
        this.die = new Audio();

        this.score.src = "audio/sfx_point.wav";
        this.flap.src = "audio/sfx_flap.wav";
        this.flap.preload = "auto";
        this.hit.src = "audio/sfx_hit.wav";
        this.swooshing.src = "audio/sfx_swooshing.wav";
        this.die.src = "audio/sfx_die.wav";
    }

    playSound(what) {
        if (game.enableSound)
            this[what].play();
    }

    stopSound(what) {
        if (game.enableSound) {
            this[what].pause();
            this[what].currentTime = 0;
        }
    }
}