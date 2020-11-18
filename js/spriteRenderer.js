
//ta razred je bazni in ga uporabljajo vsi elementi, saj z njim narišemo sliko
class SpriteRenderer{
    //slika, poziciji na source, velikost na source, pozicija na canvasu, velikost na kanvasu 
    constructor(path, sX, sY, sWidth, sHeight){
        const sprite = new Image();
        sprite.src = path;
        this.sprite = sprite;
        this.sX = sX;
        this.sY= sY;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
    }
    //nariše sliko
    drawSprite(ctx, posX, posY){

        console.log(posX);
        ctx.drawImage(this.sprite, this.sX, this.sY, this.sWidth, this.sHeight,  posX, posY, this.width, this.height);
    }

}
 