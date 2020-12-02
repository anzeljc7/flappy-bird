class Bird extends SpriteRenderer{
    //privatne lastnosti
    #up = 0.5;

    constructor(path, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight){
        super(path,0, 0, sWidth, sHeight);

        //lastnosti birda
        this.posX = dX; //poziciji v canvasu
        this.posY = dY;
        this.width = dWidth; //dimenzije v canvasu
        this.height = dHeight; 

        this.animation = [  //služi za animacijo, po njej se premikamo z frame
            {X:sX,Y:sY},
            {X:sX,Y:(sY+sHeight+1)},
            {X:sX,Y:(sY+2*sHeight+2)},
            {X:sX,Y:(sY+sHeight+1)},
        ]
        this.frame = 0; //kateri del animacije
        this.period = 5; //kako hitra bo animacija

        this.speed = 0; //kako hitro se premika
        this.gravity = 0.24; //kako hitro ga pritiska dol
        this.jump = 4.6;    //kako visok bo skok

        this.rotate = 0;    //kako močno ga zarotira (0.125 je 45 stopinj, 0.25 je 90)
        this.radius = 12;   //služi za collision z pipami
    }

    draw(ctx){      
        //na koncu zadnja 2 argumenta, se origin nastavi na sredino 
        ctx.save();
        ctx.translate(this.posX, this.posY);
        ctx.rotate((this.rotate*360*Math.PI)/180);                                                                     
        //height in width morata biti - in deljeno z 2, saj zarotiramo celoten kanvas (torej flappy mora biti čisto levo zgoraj)        
        super.adraw(ctx,this.animation[this.frame].X, this.animation[this.frame].Y, -this.width/2, -this.height/2);
        ctx.restore();     
    }
    startMoving(){
        this.posY+=this.#up;
        if(this.posY > 185 || this.posY < 175)
            this.#up = -this.#up
    }

    //funkcija za letenje 
    fly(){
        this.speed =- this.jump;
    }

    //funkcija za premikanje (padanje dol in preverjanje kako se mora rotirat bird)
    move(){
        this.speed+=this.gravity;
        this.posY+=this.speed;

        if(this.speed < 0)
            this.rotate = -0.055;
        else if(this.speed >0.15){
            if(this.rotate <0.25)
                this.rotate += 0.012;
        }
    }

    //ali je bird na tleh
    onGround(groundPosY){ return (this.posY+this.height/2 >= groundPosY) ? 1:0}

    //flappy nesme iti neskončno v nebo
    onSkyLimit(){ 
        return (this.posY- this.height<= 0) ? 1:0;
        
    }


    touchingPipes(pipes){
        if(pipes.positions.length > 0)
            if((this.posX + this.radius > pipes.positions[0]["posX"] && this.posX - this.radius < pipes.positions[0]["posX"]+pipes.width) 
                && (this.posY - this.radius < pipes.positions[0]["posY"]+pipes.height || this.posY + this.radius > pipes.positions[0]["posY"] + pipes.height + pipes.space))
                    return 1;
        
        return 0;
    }

    goThrought(pipes){
        if(pipes.positions.length >0)
            return(this.posX >= pipes.positions[0]["posX"]+pipes.width/2 && this.posX <= 1.8+pipes.positions[0]["posX"]+pipes.width/2);
        
        else
            return 0;
    }

}