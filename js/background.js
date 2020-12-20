class Background extends SpriteRenderer {
    //path - pot, s oznaka pomenijo vrednosti na sliki, d vrednosti pa na canvasu
    constructor(path, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
        super(path, sX, sY, sWidth, sHeight);

        //lastnosti backgrounda
        this.posX = dX;
        this.posY = dY;
        this.width = dWidth;
        this.height = dHeight;
    }

    //tu se ponovi klic za risanje spritov tolikokrat, kolikor zahtevamo
    draw(ctx, times) {
        //v for pogoju se ponavlja drawSprite, noter dobi na katere kordinate mora sliko narisat
        for (let i = 0; i < times; i++) {
            super.draw(ctx, (this.posX + i * this.sWidth), this.posY);
        }
    }

    move(speed) {
        this.posX = (this.posX - speed) % (this.width / 2); //ko pride do max -x pozicije gre spet nazaj na 0, zato se uporablja %
    }

    animatedMove() {         //če je manjše od željene pozicije se premika
        if (this.posY < 85)
            this.posY += 15;
    }

}