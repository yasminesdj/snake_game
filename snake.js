// adding a board
var blockSize = 25;
var row =20;
var col = 20;
var board;
var context;
//snake 
var x = blockSize * 4;
var y = blockSize * 4;

var speedX = 0;
var speedY = 0;

var body = [];

//food
var fx ;
var fy ;

//gameover
var gameOver = false;


window.onload = function() {
    board = document.getElementById("board");
    board.height = row * blockSize;
    board.width = col * blockSize;
    context = board.getContext("2d"); // to draw on the board

    Food(); // to replace the food randomly every time while refresh
    document.addEventListener("keyup" , Direction);
    // update(); we want to call it multiple times 
    setInterval(update, 1000/10); // 1000 milliseconds 
}
function update(){
    if (gameOver){
        return;
    }
    context.fillStyle="black"; //change the color of the pen to black
    context.fillRect(0, 0, board.width, board.height); //filling 500 (25*20)

    context.fillStyle= "red"; // the color of the food 
    context.fillRect(fx , fy , blockSize, blockSize);

    if ( x == fx && y == fy ){  // same square
        body.push([fx , fy ]) //grow the segment 
        Food();

    }
    for (let i= body.length-1; i>0 ; i-- ){
        body[i]= body[i-1];
    }
    if(body.length){
        body[0] = [x,y];
    }

    context.fillStyle= "green"; //the color of the snake 
    x += speedX * blockSize;
    y += speedY * blockSize;
    context.fillRect(x,y, blockSize, blockSize); // coordinates + width+height 
    for(let i = 0 ; i< body.length ; i++){
        context.fillRect(body[i][0],body[i][1], blockSize, blockSize);
    }

    // conditions of the game over
    if( x < 0 || x > col*blockSize || y < 0 || y > row*blockSize){
        gameOver = true;
        alert("GAME OVER");
    }
    
 for(let i= 0; i < body.length; i++){ 
    if(x == body[i][0] && y == body[i][1]){
        gameOver = true;
        alert("GAME OVER"); 
    }
 }
   
}
function Direction(e) {
    if (e.code == "ArrowUp" && speedY != 1) { //if you go up
        speedX = 0;
        speedY = -1;

    }
   else if (e.code == "ArrowDown" && speedY != -1){ //if you go Down
        speedX = 0;
        speedY = 1;

    }
    else if (e.code == "ArrowLeft" && speedX != 1){ //if you go left
        speedX = -1;
        speedY = 0;

    }
   else if (e.code == "ArrowRight" && speedX != -1){ //if you go right
        speedX = 1;
        speedY = 0;

    }
   

}

function Food() {
    fx = Math.floor(Math.random() * col) * blockSize;
    fy = Math.floor(Math.random() * row) * blockSize;  // we dont need to initialize fx and fy anymore 

}