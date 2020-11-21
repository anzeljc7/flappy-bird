class Bird extends SpriteRenderer{
    //privatne lastnosti
    constructor(path, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight){
        super(path,0, 0, sWidth, sHeight);

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

        this.rotate = 0;    //kako močno ga zarotira (0.125 je 45 stopinj, 0.25 je 90)
        this.radius = 12;   //služi za collision z pipami
    }

    draw(ctx){      
        //na koncu zadnja 2 argumenta, se origin nastavi na sredino 
        ctx.save();
        ctx.translate(this.posX, this.posY);
        ctx.rotate((this.rotate*360*Math.PI)/180);                                                                     
        //height in width morata biti - in deljeno z 2, saj zarotiramo celoten kanvas (torej flappy mora biti čisto levo zgoraj)        
        super.adraw(ctx,this.animation[this.frame].sX, this.animation[this.frame].sY, -this.width/2, -this.height/2);
        ctx.restore();     
    }

    //funkcija za letenje 
    fly(pipes){
        this.speed =- this.jump;
    }

    //funkcija za premikanje (padanje dol in preverjanje kako se mora rotirat bird)
    move(){
        this.speed+=this.gravity;
        this.posY+=this.speed;

        if(this.speed < 0)
            this.rotate = -0.115;
        else if(this.speed >= this.jump)
            this.rotate = 0.25;
        else if(this.speed < this.jump)
            this.rotate = 0.115;
        
    
    }

    onGround(groundPosY){ return (this.posY+this.height/2 >= groundPosY) ? 1:0}

    onSkyLimit(){ 
        return (this.posY- this.height<= 0) ? 1:0;
        
    }

    touchingPipes(pipes){
        for(let pair =0; pair <pipes.positions.length; pair++){
            console.log("pair", pair);
            console.log("pipel", pipes.positions.length);
            if((this.posX + this.radius > pipes.positions[pair]["posX"] && this.posX - this.radius < pipes.positions[pair]["posX"]+pipes.width) 
            && (this.posY - this.radius < pipes.positions[pair]["posY"]+pipes.height || this.posY + this.radius > pipes.positions[pair]["posY"] + pipes.height + pipes.space))
                return 1;
            else
                return 0;
        
        }
        
           
        return 0;
    }

}