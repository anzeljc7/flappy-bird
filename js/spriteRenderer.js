
//ta razred je bazni in ga uporabljajo vsi elementi, saj z njim narišemo sliko
class SpriteRenderer{
    //slika, poziciji na source, velikost na source
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
    draw(ctx, posX, posY){
        //vse lasnotsi iz canvasa ima vsak posamezen element (background, bird) posebej
        ctx.drawImage(this.sprite, this.sX, this.sY, this.sWidth, this.sHeight,  posX, posY, this.width, this.height);
    }

    //nariše sliko z animacijo
    adraw(ctx, sX, sY, posX, posY){
        //vse lasnotsi iz canvasa ima vsak posamezen element (background, bird) posebej
        ctx.drawImage(this.sprite, sX, sY, this.sWidth, this.sHeight,  posX, posY, this.width, this.height);
    }

}
 