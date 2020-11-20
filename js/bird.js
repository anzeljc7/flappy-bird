class Bird extends SpriteRenderer{
    //privatne lastnosti
    constructor(path, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight){
        super(path,sX, sY, sWidth, sHeight, dX,dY, sWidth, sHeight, sWidth, sHeight);

        //lastnosti birda
        this.posX = dX; //poziciji v canvasu
        this.posY = dY;
        this.width = dWidth; //dimenzije v canvasu
        this.height = dHeight; 

        this.animation = [  //služi za animacijo, po njej se premikamo z frame
            {sX,sY},
            {sX,sY:sY+27},
            {sX,sY:sY+52},
            {sX,sY:sY+27},
        ]
        this.frame = 0; //kateri del animacije
        this.period = 5; //kako hitra bo animacija

        this.speed = 0; //kako hitro se premika
        this.gravity = 0.25; //kako hitro ga pritiska dol
        this.jump = 4.6;    //kako visok bo skok
    }

    draw(ctx){      
        //na koncu zadnja 2 argumenta, se origin nastavi na sredino                                                                                    
        super.adraw(ctx,this.animation[this.frame].sX, this.animation[this.frame].sY, this.posX-this.width/2, this.posY-this.height/2);  
    }

    //funkcija za letenje 
    fly(){
        this.speed =- this.jump;
    }

    //funkcija za premikanje v obe smeri 
    move(){
        this.speed+=this.gravity;
        this.posY+=this.speed;
        this.posX += 0.5;
    }

    onGround(groundPosY){ return (this.posY+this.height/2 >= groundPosY) ? 1:0}

    onSkyLimit(){ 
        return (this.posY- this.height<= 0) ? 1:0;
        
    }

    rotate(ctx){
        ctx.translate(this.posX, this.posY);
        ctx.rotate(45*Math.PI/180);
        ctx.save();
    }
}