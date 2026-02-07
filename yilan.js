let snake, food, dx, dy, score, snakeInterval, snakeSpeed;

function startSnakeGame() {
    const canvas = document.getElementById('gameCanvas');
    score = 0;
    document.getElementById('score').innerText = score; // Skoru sıfırla
    dx = 20; 
    dy = 0;
    snakeSpeed = 150; // Başlangıçta daha yavaş (150ms)
    snake = [{x: 200, y: 200}, {x: 180, y: 200}, {x: 160, y: 200}];
    
    createFood();
    resetInterval(); // Oyunu başlatan döngü
    window.onkeydown = changeDirection;
}

// Hızı güncellemek için döngüyü yenileyen fonksiyon
function resetInterval() {
    if(snakeInterval) clearInterval(snakeInterval);
    snakeInterval = setInterval(drawSnakeFrame, snakeSpeed);
}

function drawSnakeFrame() {
    if (checkGameOver()) {
        clearInterval(snakeInterval);
        showGameOver(score);
        return;
    }
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Arka planı temizle
    ctx.fillStyle = "#000a0c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Elma Çiz (Kırmızı)
    ctx.fillStyle = "#ff0044";
    ctx.fillRect(food.x, food.y, 18, 18);

    // Yılanın kafasını hesapla
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // Elma yeme kontrolü
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        document.getElementById('score').innerText = score;
        
        // Hızlanma: Her elma yediğinde hızı 3ms artır (bekleme süresini düşür)
        if (snakeSpeed > 40) { // Limit: 40ms'den daha hızlı olmasın (oynanabilirlik için)
            snakeSpeed -= 3; 
            resetInterval(); 
        }
        createFood();
    } else {
        snake.pop(); // Elma yemediği sürece kuyruğu sil
    }

    // Yılanı Çiz (Yeşil Renk Tonları)
    snake.forEach((part, index) => {
        // Baş kısmı açık yeşil, gövde koyu yeşil
        ctx.fillStyle = (index === 0) ? "#2ecc71" : "#27ae60";
        ctx.fillRect(part.x, part.y, 18, 18);
        
        // Boğumlar için ince çerçeve
        ctx.strokeStyle = "#000a0c";
        ctx.strokeRect(part.x, part.y, 18, 18);
    });
}

function checkGameOver() {
    const canvas = document.getElementById('gameCanvas');
    // Kendine çarpma kontrolü
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    // Duvarlara çarpma kontrolü
    return snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height;
}

function createFood() {
    food = { 
        x: Math.floor(Math.random() * (400 / 20)) * 20, 
        y: Math.floor(Math.random() * (400 / 20)) * 20 
    };
    // Elma yılanın gövdesinde çıkarsa tekrar oluştur
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) createFood();
    });
}

function changeDirection(e) {
    // 37:Sol, 38:Üst, 39:Sağ, 40:Alt
    if (e.keyCode === 37 && dx === 0) { dx = -20; dy = 0; }
    if (e.keyCode === 38 && dy === 0) { dx = 0; dy = -20; }
    if (e.keyCode === 39 && dx === 0) { dx = 20; dy = 0; }
    if (e.keyCode === 40 && dy === 0) { dx = 0; dy = 20; }
}