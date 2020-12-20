//globalne spremenljivke
let canvas = document.getElementById("window");
let ctx = canvas.getContext("2d");

//elementi v igri
let pipes = new Pipe("img/flapy.png", 112, 562, 168, 562, 53, 319, 51, 400, 100);  //sx1  sy1  sx2  sy2 sWidth sHeight dWidth dHeight
let ground = new Background("img/flapy.png", 584, 0, 336, 111, 0, 369, 336, 111);
let readyMessage = new Background("img/flapy.png", 527, 517, 196, 183, 320 / 2 - 196 / 2, -183, 196, 183);
let gameOver = new Background("img/flapy.png", 292, 517, 233, 200, 320 / 2 - 233 / 2, -200, 233, 200);
let background = new Background("img/flapy.png", 0, 45, 287, 400, 0, 0, 287, 400);
let bird = new Bird("img/flapy.png", 221, 661, 33, 23, 60, 180, 33, 23);
let medal3 = new Background("img/flapy.png", 33, 517, 44, 44, 320 / 2 - 233 / 2 + 30, 85 + 93, 43, 43);
let medal2 = new Background("img/flapy.png", 77, 517, 43, 43, 320 / 2 - 233 / 2 + 30, 85 + 93, 43, 43);
let medal1 = new Background("img/flapy.png", 121, 517, 43, 43, 320 / 2 - 233 / 2 + 30, 85 + 93, 43, 43);
let medal4 = new Background("img/flapy.png", 165, 517, 43, 43, 320 / 2 - 233 / 2 + 30, 85 + 93, 43, 43);
let high = new Background("img/flapy.png", 0, 517, 31, 15, 320 / 2 - 233 / 2 + 141, 85 + 109, 31, 15);
let game = new Game("start", 60);
let score = new Score();
let sound = new Sound();
