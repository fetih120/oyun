let carX, carY, obstacles, carSpeed, carGameInterval;
const carImg = new Image();
carImg.src = 'araba.png'; // Klasöründeki görsel adı

function startRaceGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreBoard = document.getElementById('score-board');
    const scoreElement = document.getElementById('score');
    
    scoreBoard.style.display = "block";
    let carScore = 0;
    carX = 180;
    carY = 320;
    obstacles = [];
    carSpeed = 5;

    if(carGameInterval) clearInterval(carGameInterval);

    carGameInterval = setInterval(() => {
        // 1. Mantık: Engelleri Hareket Ettir ve Yeni Engel Oluştur
        if (Math.random() < 0.03) {
            obstacles.push({ x: Math.random() * 360, y: -50, w: 40, h: 70 });
        }

        obstacles.forEach((obs, index) => {
            obs.y += carSpeed;
            // Çarpışma Kontrolü
            if (carX < obs.x + obs.w && carX + 40 > obs.x && carY < obs.y + obs.h && carY + 70 > obs.y) {
                clearInterval(carGameInterval);
                alert("KAZA YAPTIN! Skor: " + carScore);
            }
            // Ekrandan çıkan engelleri sil ve skor ekle
            if (obs.y > 400) {
                obstacles.splice(index, 1);
                carScore += 1;
                scoreElement.innerText = carScore;
                if(carScore % 10 === 0) carSpeed += 0.5; // Hızlanma
            }
        });

        // 2. Çizim
        ctx.fillStyle = "#1a1a1a"; // Asfalt rengi
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Yol çizgileri
        ctx.strokeStyle = "#ffffff";
        ctx.setLineDash([20, 20]);
        ctx.beginPath(); ctx.moveTo(200, 0); ctx.lineTo(200, 400); ctx.stroke();

        // Arabayı Çiz (Görsel yoksa dikdörtgen çiz)
        try {
            ctx.drawImage(carImg, carX, carY, 40, 70);
        } catch(e) {
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(carX, carY, 40, 70);
        }

        // Engelleri Çiz
        ctx.fillStyle = "#ff0044";
        ctx.setLineDash([]);
        obstacles.forEach(obs => ctx.fillRect(obs.x, obs.y, obs.w, obs.h));

    }, 1000/60);

    // Kontroller
    window.onkeydown = (e) => {
        if (e.key === "ArrowLeft" && carX > 0) carX -= 20;
        if (e.key === "ArrowRight" && carX < 360) carX += 20;
    };
}