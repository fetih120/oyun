let currentActiveGame = ""; 

function selectGame(game) {
    currentActiveGame = game;
    const canvas = document.getElementById('gameCanvas');
    const uiGame = document.getElementById('ui-game');
    const scoreBoard = document.getElementById('score-board');
    const gameOverScreen = document.getElementById('game-over-screen');
    const ctx = canvas.getContext('2d');

    // Mevcut tüm döngüleri temizle
    let id = window.setInterval(function() {}, 0);
    while (id--) window.clearInterval(id);

    gameOverScreen.style.display = "none";
    uiGame.innerHTML = "";
    canvas.style.display = "none";
    scoreBoard.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('score').innerText = "0";

    if (game === 'snake') {
        canvas.style.display = "block";
        scoreBoard.style.display = "block";
        startSnakeGame();
    } 
    else if (game === 'race') {
        canvas.style.display = "block";
        scoreBoard.style.display = "block";
        startRaceGame();
    } 
    else if (game === 'memory') {
        uiGame.innerHTML = "";
        startMemoryGame();
    }
    else if (game === 'logic') {
        uiGame.innerHTML = "<h3>ZEKA SORUSU</h3><p>Hangi şehirde 10 tane 'A' vardır?</p><button onclick='alert(\"Cevap: Adanaaa (Adana ve 9 tane a harfi) veya Şaka bir yana: AFYONKARAHİSAR (Tam 10 harfli ve mantık sorusu!)\")'>Cevabı Gör</button>";
    }
}

function showGameOver(finalScore) {
    // Tüm hareketleri durdur
    let id = window.setInterval(function() {}, 0);
    while (id--) window.clearInterval(id);

    document.getElementById('final-score').innerText = finalScore;
    document.getElementById('game-over-screen').style.display = "block";
}