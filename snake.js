// adding a board
var blockSize = 25;
var row =20;
var col = 20;
var board;
var context;
//snake 
var x = blockSize * 4;
var y = blockSize * 4;
//food
var fx ;
var fy ;



window.onload = function() {
    board = document.getElementById("board");
    board.height = row * blockSize;
    board.width = col * blockSize;
    context = board.getContext("2d"); // to draw on the board
    Food(); // to replace the food randomly every time while refresh
    update();
}
function update(){
    context.fillStyle="black"; //change the color of the pen to black
    context.fillRect(0, 0, board.width, board.height); //filling 500 (25*20)

    context.fillStyle= "green" //the color of the snake 
    context.fillRect(x,y, blockSize, blockSize); // coordinates + width+height 

    context.fillStyle= "red"; // the color of the food 
    context.fillRect(fx , fy , blockSize, blockSize);
}

function Food() {
    fx = Math.floor(Math.random() * col) * blockSize;
    fy = Math.floor(Math.random() * row) * blockSize;  // we dont need to initialize fx and fy anymore 

}