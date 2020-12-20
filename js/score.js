class Score {
    constructor() {
        this.value = 0;
        this.best = 0;
        this.changed = false;   //da ve kdaj izpisat new

        this.posX = 320 / 2;
        this.posY = 50;

    }

    draw(ctx, state) {
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#fff";
        if (state === "game") {
            ctx.font = "bold 35px FlappyBirdy";
            ctx.fillText(this.value, this.posX, this.posY);
            ctx.strokeText(this.value, this.posX, this.posY);
        }
        else if (state === "over") {
            ctx.font = "bold 25px FlappyBirdy";
            ctx.fillText(this.value, this.posX, this.posY);
            ctx.strokeText(this.value, this.posX, this.posY);
            ctx.fillText(this.best, this.posX, this.posY + 43);
            ctx.strokeText(this.best, this.posX, this.posY + 43);
        }
    }

    changeValue() {
        this.value++;
    }

    setBest() {
        if (this.best < this.value)
            this.best = this.value;
    }

    changeScoreOption(option) {
        if (option) {
            this.posX = 320 / 2;
            this.posY = 50;
        }
        else {
            this.posX = 325;
            this.posY = 189;
            console.log(this.posY);
        }
    }

    animatedMove() {
        if (this.posX >= 225)
            this.posX -= 5;

    }
}