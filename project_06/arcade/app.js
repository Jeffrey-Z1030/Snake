//board

const blockSize = 25;
const rows = 20;
const cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var movementX = 0;
var movementY = 0;


var body = [];

//food
var foodX ;
var foodY ;

var gameOver = false;

window.onload = function () {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");


    placeFood();
   // update();
   document.addEventListener("keyup",changeDirection);
    setInterval(update, 1000/10);
}

function update(){
    if(gameOver){
        return;
    }

  //  hitSelf();
    // Self collision not working.


    context.fillStyle = "black"
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle= "red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX == foodX && snakeY == foodY) {
        body.push([foodX,foodY]);
        placeFood();
    }

    context.fillStyle= "blue";
    snakeX += movementX * blockSize;
    snakeY += movementY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i = 0; i < body.length; ++i){
        context.fillRect(body[i][0], body[i][1], blockSize,blockSize);
    }

    for(let i = body.length - 1; i > 0; --i){
        body[i] = body[i - 1];
    }
    if(body.length){
        body[0] = [snakeX,snakeY];
    }

 //   context.fillStyle= "red";
 //   context.fillRect(foodX,foodY,blockSize,blockSize);

 //gameover
 if(snakeX < 0 || snakeX > cols * blockSize -1 || snakeY < 0 || snakeY > rows*blockSize -1){
    gameOver = true;
    alert("Game Over");
}

   // if bump into self

 /*    for(let i = 0; i < body.length; ++i ){
    if(snakeX[i] && snakeY[i] == body[i]){
        gameOver = true;
        alert("Game Over");
    }
}
*/

}

/*

function hitSelf(){
    const snakeBody = [...body];
    const head = snakeBody.shift()
    for(let i = 0 ; i < body.length; ++i){
        if(snakeBody = body[i][0]){
            alert("GameOver");
        }
    }


}
*/


function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(event){
    if(event.code == "ArrowUp" && movementY != 1){
        movementX = 0;
        movementY = -1;

    }
   else if(event.code == "ArrowDown" && movementY != -1){
        movementX = 0;
        movementY = 1;

    }
   else if(event.code == "ArrowRight" && movementX != -1){
        movementX = 1;
        movementY = 0;

    }
   else if(event.code == "ArrowLeft" && movementX != 1){
        movementX = -1;
        movementY = 0;

    }
}