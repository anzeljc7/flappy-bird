
class Score{
    constructor(){
        this.value = 0;
        this.best = 0;
    }

    draw(ctx, state){
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#fff";
        if(state === "game"){
            ctx.font = "bold 35px FlappyBirdy";
            ctx.fillText(this.value, 320/2, 50);
            ctx.strokeText(this.value, 320/2, 50);
        }
        else if(state === "over"){
            ctx.font = "bold 25px FlappyBirdy";
            ctx.fillText(this.value, 225,183);
            ctx.strokeText(this.value,225,183);
            ctx.fillText(this.best, 225,226);
            ctx.strokeText(this.best, 225,226);
        }
    }
    
    changeValue(){
        this.value++;
    }

    setBest(){
        if(this.best <this.value)
            this.best = this.value;
    }
}