// adding a board
var blockSize = 25;
var row = 20;
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
var fx;
var fy;

//gameover
var gameOver = false;

// Load background image
var backgroundImage = new Image();
backgroundImage.src = "assets/mc bluee.png";

window.onload = function () {
    board = document.getElementById("board");
    board.height = row * blockSize;
    board.width = col * blockSize;
    context = board.getContext("2d"); // to draw on the board

    Food(); // to replace the food randomly every time while refresh
    document.addEventListener("keyup", Direction);
    // update(); we want to call it multiple times
    setInterval(update, 1000 / 10); // 1000 milliseconds 
};

function update() {
    if (gameOver){
        return;
    }

    // Draw the background
    context.drawImage(backgroundImage, 0, 0, board.width, board.height);

    // Draw food
    context.fillStyle = "red"; // the color of the food 
    context.beginPath();
    context.arc(fx + blockSize / 2, fy + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
    context.fill();

    // Check if snake eats the food
    if (x === fx && y === fy) {   // same square
        body.push([fx, fy]);   //grow the segment 
        Food();
    }

    // Move the body segments
    for (let i = body.length - 1; i > 0; i--) {
        body[i] = body[i - 1];
    }
    if (body.length) {
        body[0] = [x, y];
    }

    // Move snake head
    x += speedX * blockSize;
    y += speedY * blockSize;

    // Wrap the snake around the board
    if (x < 0) x = (col - 1) * blockSize;
    if (x >= col * blockSize) x = 0;
    if (y < 0) y = (row - 1) * blockSize;
    if (y >= row * blockSize) y = 0;

    // Draw the snake body
    drawSnake();

    // Draw the snake head
    drawSnakeHead();

    // Check for self-collision
    checkCollision();
}

function drawSnake() {
    context.fillStyle = "#0079FE";
    if (body.length) {
        // Draw the first segment (the one closest to the head)
        drawRoundedRect(body[0][0], body[0][1], blockSize, blockSize, blockSize / 2);
    }
    for (let i = 1; i < body.length; i++) {
        let segmentX = body[i][0];
        let segmentY = body[i][1];
        // Draw each body segment as a rounded rectangle
        drawRoundedRect(segmentX, segmentY, blockSize, blockSize, blockSize / 2);
    }
}

function drawRoundedRect(x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
}

function drawSnakeHead() {
    context.fillStyle = "#006EE7";
    context.beginPath();
    context.arc(x + blockSize / 2, y + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
    context.fill();

    // Draw the eyes (white)
    context.fillStyle = "white";
    context.beginPath();
    context.arc(x + blockSize / 4, y + blockSize / 4, blockSize / 8, 0, 2 * Math.PI); // Left eye
    context.fill();
    context.beginPath();
    context.arc(x + (3 * blockSize) / 4, y + blockSize / 4, blockSize / 8, 0, 2 * Math.PI); // Right eye
    context.fill();

    // Draw the pupils (black)
    context.fillStyle = "black";
    context.beginPath();
    context.arc(x + blockSize / 4, y + blockSize / 4, blockSize / 16, 0, 2 * Math.PI); // Left pupil
    context.fill();
    context.beginPath();
    context.arc(x + (3 * blockSize) / 4, y + blockSize / 4, blockSize / 16, 0, 2 * Math.PI); // Right pupil
    context.fill();
}

function checkCollision() {
    for (let i = 0; i < body.length; i++) {
        if (x === body[i][0] && y === body[i][1]) {
            gameOver = true;
            alert("GAME OVER");
        }
    }
}

function Direction(e) {
    if (e.code == "ArrowUp" && speedY != 1) {   //if you go up
        speedX = 0;
        speedY = -1;
    } else if (e.code == "ArrowDown" && speedY != -1) {  //if you go Down
        speedX = 0;
        speedY = 1;
    } else if (e.code == "ArrowLeft" && speedX != 1) { //if you go left
        speedX = -1;
        speedY = 0;
    } else if (e.code == "ArrowRight" && speedX != -1) { //if you go right
        speedX = 1;
        speedY = 0;
    }
}

function Food() {
    fx = Math.floor(Math.random() * col) * blockSize;
    fy = Math.floor(Math.random() * row) * blockSize; // we dont need to initialize fx and fy anymore 

}
