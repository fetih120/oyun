let carX, carY, obstacles, carSpeed, carInterval;
const carImg = new Image();
carImg.src = 'araba.png'; // Eğer klasörde araba.png yoksa mavi kutu görünecektir

function startRaceGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    
    // Başlangıç değerleri
    carX = 180; 
    carY = 320; 
    obstacles = []; 
    carSpeed = 5;
    let raceScore = 0;
    
    // Eski döngü varsa temizle
    if(carInterval) clearInterval(carInterval);

    carInterval = setInterval(() => {
        // 1. Yeni Engel Oluşturma (Rastgele)
        if (Math.random() < 0.03) {
            obstacles.push({ 
                x: Math.random() * (canvas.width - 40), 
                y: -70, 
                w: 40, 
                h: 70 
            });
        }

        // 2. Arka Planı Çiz (Asfalt)
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 3. Yol Çizgilerini Çiz
        ctx.strokeStyle = "#ffffff";
        ctx.setLineDash([20, 20]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]); // Çizgi stilini sıfırla

        // 4. Engelleri Yönet ve Çiz
        obstacles.forEach((obs, index) => {
            obs.y += carSpeed;

            // Çarpışma Kontrolü
            if (carX < obs.x + obs.w && carX + 40 > obs.x && carY < obs.y + obs.h && carY + 70 > obs.y) {
                clearInterval(carInterval); // Oyunu durdur
                showGameOver(raceScore);    // Paneli göster
            }

            // Ekrandan çıkan engelleri sil ve skor ekle
            if (obs.y > canvas.height) {
                obstacles.splice(index, 1);
                raceScore++;
                scoreElement.innerText = raceScore;
                
                // Her 10 skorda bir oyun hızlansın
                if (raceScore % 10 === 0) carSpeed += 0.5;
            }

            // Engeli Çiz (Kırmızı Araçlar)
            ctx.fillStyle = "#ff0044";
            ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
            ctx.strokeStyle = "#ffffff";
            ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
        });

        // 5. Kendi Arabamızı Çiz
        if (carImg.complete && carImg.naturalWidth !== 0) {
            ctx.drawImage(carImg, carX, carY, 40, 70);
        } else {
            // Görsel yoksa Cyan (Cam Göbeği) kutu çiz
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(carX, carY, 40, 70);
            ctx.strokeStyle = "#ffffff";
            ctx.strokeRect(carX, carY, 40, 70);
        }

    }, 1000 / 60); // 60 FPS

    // 6. Kontroller (Klavye)
    window.onkeydown = (e) => {
        if (e.key === "ArrowLeft" && carX > 0) {
            carX -= 20;
        }
        if (e.key === "ArrowRight" && carX < canvas.width - 40) {
            carX += 20;
        }
    };
}