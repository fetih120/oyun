function selectGame(game) {
    const canvas = document.getElementById('gameCanvas');
    const uiGame = document.getElementById('ui-game');
    const scoreBoard = document.getElementById('score-board');

    // Aktif tüm döngüleri (Interval) durdur
    let id = window.setInterval(function() {}, 0);
    while (id--) {
        window.clearInterval(id);
    }

    // Ekranı temizle
    uiGame.innerHTML = "";
    canvas.style.display = "none";
    scoreBoard.style.display = "none";
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (game === 'snake') {
        canvas.style.display = "block";
        if (typeof startSnakeGame === "function") {
            startSnakeGame();
        } else {
            uiGame.innerHTML = "Hata: yilan.js yüklenemedi!";
        }
    } 
    else if (game === 'race') {
        canvas.style.display = "block";
        if (typeof startRaceGame === "function") {
            startRaceGame();
        } else {
            uiGame.innerHTML = "Hata: araba.js yüklenemedi!";
        }
    } 
    else if (game === 'memory') {
        uiGame.innerHTML = "<h3>Hafıza Oyunu Çok Yakında!</h3>";
    } 
    else if (game === 'logic') {
        uiGame.innerHTML = "<h3>Zeka Sorusu: Hangi ayda 28 gün vardır?<br><br>Cevap: Hepsinde!</h3>";
    }
}