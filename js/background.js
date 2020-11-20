class Background extends SpriteRenderer{
    //path - pot, s oznaka pomenijo vrednosti na sliki, d vrednosti pa na canvasu
    constructor(path, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight){
        super(path,sX, sY, sWidth, sHeight, dX,dY, sWidth, sHeight, sWidth, sHeight);

        //lastnosti backgrounda
        this.posX = dX;
        this.posY = dY;
        this.width = dWidth;
        this.height = dHeight;
    }
    
    //tu se ponovi klic za risanje spritov tolikokrat, kolikor zahtevamo
    draw(ctx, times){
        //v for pogoju se ponavlja drawSprite, noter dobi na katere kordinate mora sliko narisat
        for(let i=0; i<times; i++){
            super.draw(ctx, (this.posX + i*this.sWidth), this.posY);
        }
    }

    setRepeat(flappyPos){
        //Dobi vrednost flappya in glede na njo potem kalkulira kako se more stvar izrisat
        if(flappyPos > vrednost){
            this.posX += this.width;
        }
    }

}