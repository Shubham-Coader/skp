var canvas;
var a;

var head;
var apple;
var body;

var dots;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var Game = true;

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 400;
const C_WIDTH = 500;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

//startiate....
function start() {
    
    canvas = document.getElementById('myCanvas');
    a = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}    

function loadImages() {
    
    head = new Image();
    head.src = 'snake.jpg';
    
    body = new Image();
    body.src = 'ball.jpg';
    
    apple = new Image();
    apple.src = 'apple.jpg';
}

function createSnake() {

    dots = 3;

    for (var i = 0; i < dots; i++) {
        x[i] = 50 - i * 10;
        y[i] = 50;
    }
}

//appering apple in the ground coding...
function locateApple() {

    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
} 

function doDrawing() {
    
    a.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    
    if (Game) {
		
        a.drawImage(apple, apple_x, apple_y);

        for (var i = 0; i < dots; i++) {
            
            if (i == 0) {
				
                a.drawImage(head, x[i], y[i]);
            } else {
				
                a.drawImage(body, x[i], y[i]);
            }
        }    
    } else {
		
        gameOver();
    }
}

function gameOver() {
    
    a.fillStyle = 'white';
    a.textBaseline = 'middle';
    a.textAlign = 'center';
    a.font = 'normal bold 30px serif';
    
    a.fillText('Game over!! Ghar ja munna...', C_WIDTH/2, C_HEIGHT/2);
}

function checkApple() {

    if ((x[0] == apple_x) && (y[0] == apple_y)) {
		
        dots++;
        locateApple();
    }
}

function move() {

    for (var i = dots; i > 0; i--) {
		
		x[i] = x[(i - 1)];
        y[i] = y[(i - 1)];
    }

    if (leftDirection) {
		
        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {
        
		x[0] += DOT_SIZE;
    }

    if (upDirection) {
        
		y[0] -= DOT_SIZE;
    }

    if (downDirection) {
        
		y[0] += DOT_SIZE;
    }
}    

function Collision() {

    for (var i = dots; i > 0; i--) {
		
        if ((i > 4) && (x[0] == x[i]) && (y[0] == y[i])) {
			
            Game = false;
        }
    }

    if (y[0] >= C_HEIGHT) {
		
        Game = false;
    }

    if (y[0] < 0) {
		
       Game = false;
    }

    if (x[0] >= C_WIDTH) {
		
      Game = false;
    }

    if (x[0] < 0) {
		
      Game = false;
    }
}

function gameCycle() {
    
    if (Game) {
		
        checkApple();
        Collision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

//Key-board coding...
onkeydown = function(e) {
    
    var key = e.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) {
		
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {
		
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {
		
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {
		
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
};    