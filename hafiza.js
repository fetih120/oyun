let cards = [];
let flippedCards = [];
let matchedCount = 0;
const symbols = ['🌐', '🎮', '🚀', '💎', '🔥', '⚡', '🌈', '🍀'];

function startMemoryGame() {
    const uiGame = document.getElementById('ui-game');
    uiGame.innerHTML = '<div id="memory-grid" class="memory-grid"></div>';
    const grid = document.getElementById('memory-grid');
    
    // Kartları oluştur ve karıştır
    cards = [...symbols, ...symbols];
    cards.sort(() => Math.random() - 0.5);
    
    flippedCards = [];
    matchedCount = 0;

    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.symbol = symbol;
        card.innerHTML = '?'; // Başlangıçta kapalı
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerHTML = card.dataset.symbol;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedCount += 2;
        if (matchedCount === cards.length) {
            alert("Tebrikler! Hafızan zehir gibi!");
            selectGame('memory'); // Oyunu sıfırla
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '?';
    }
    flippedCards = [];
}