

class Pipe extends SpriteRenderer{
    constructor(path, sX1, sY1, sX2, sY2, sWidth, sHeight,dWidth, dHeight){
        super(path, 0, 0, sWidth, sHeight);

        //lastnosti pip
        this.width = dWidth; //dimenzije v canvasu
        this.height = dHeight;

        this.which = [{sX1, sY1}, {sX2, sY2 }]; //izbiramo med zgorjno (1) in spodnjo(2) pipo

        this.positions = Array(0);   //2d tabla, ki hrani pozicije vseh pip
        this.space = 88;    //koliko prostora je med pipama

        this.maxPosY = -150; //max pozicija, do katere lahko gre gor gornja pipa
    }

    draw(ctx){      
        //na koncu zadnja 2 argumenta, se origin nastavi na sredino 
        for(let pair in this.positions){
            super.adraw(ctx, this.which[0].sX1, this.which[0].sY1, this.positions[pair]["posX"], this.positions[pair]["posY"]);
            //pri risanju spodnje pipe se odšteje od pozicije zgornje pipe njeno višino in luknjo med njima
            super.adraw(ctx, this.which[1].sX2, this.which[1].sY2, this.positions[pair]["posX"],this.positions[pair]["posY"]+this.height+this.space);
        }                                                                
    }

    move(speed){
        for(let pair in this.positions){//premika obe pipe
            this.positions[pair]["posX"] -=speed;
        }
    }

    generate(){
        this.positions.push({"posY":this.maxPosY*(Math.random()+1), "posX":322}); //zgenerira random y pozicijo
    }

    delete(){   //izbriše pipo, če je ta izven vidnega polja
        if(this.positions.length > 0){
            if(this.positions[0]["posX"] < -this.width){
        
                this.positions.shift();
            }

        }
    }
}