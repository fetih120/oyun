let snake, food, dx, dy, score, gameInterval;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const scoreBoard = document.getElementById('score-board');

function startSnakeGame() {
    scoreBoard.style.display = "block";
    score = 0;
    updateScore();
    dx = 20;
    dy = 0;
    snake = [
        {x: 200, y: 200},
        {x: 180, y: 200},
        {x: 160, y: 200}
    ];
    createFood();
    
    if(gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(drawSnakeFrame, 100);

    window.onkeydown = changeDirection;
}

function drawSnakeFrame() {
    if (checkGameOver()) {
        clearInterval(gameInterval);
        alert("OYUN BİTTİ! Skorun: " + score);
        return;
    }

    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
}

function clearCanvas() {
    ctx.fillStyle = "#000a0c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    const didEatFood = snake[0].x === food.x && snake[0].y === food.y;
    if (didEatFood) {
        score += 10;
        updateScore();
        createFood();
    } else {
        snake.pop();
    }
}

function checkGameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 20;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - 20;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * 20) * 20,
        y: Math.floor(Math.random() * 20) * 20
    };
    // Elmanın yılanın üstünde çıkmadığından emin ol
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) createFood();
    });
}

function drawFood() {
    ctx.fillStyle = "#ff0044"; // Elma rengi (Kırmızı/Magenta)
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff0044";
    ctx.fillRect(food.x, food.y, 18, 18);
    ctx.shadowBlur = 0;
}

function drawSnake() {
    snake.forEach((part, index) => {
        ctx.fillStyle = (index === 0) ? "#00ffff" : "#008b8b";
        ctx.fillRect(part.x, part.y, 18, 18);
    });
}

function updateScore() {
    scoreElement.innerText = score;
}

function changeDirection(event) {
    const key = event.keyCode;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if (key === 37 && !goingRight) { dx = -20; dy = 0; }
    if (key === 38 && !goingDown) { dx = 0; dy = -20; }
    if (key === 39 && !goingLeft) { dx = 20; dy = 0; }
    if (key === 40 && !goingUp) { dx = 0; dy = 20; }
}