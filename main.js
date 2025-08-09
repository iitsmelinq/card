const elements = [
    { symbol: "H", name: "Hydrogen" },
    { symbol: "He", name: "Helium" },
    { symbol: "Li", name: "Lithium" },
    { symbol: "C", name: "Carbon" },
    { symbol: "N", name: "Nitrogen" },
    { symbol: "O", name: "Oxygen" },
    { symbol: "Na", name: "Sodium" },
    { symbol: "Mg", name: "Magnesium" },
    { symbol: "Al", name: "Aluminium" },
    { symbol: "Si", name: "Silicon" }
];

// สร้างคู่การ์ด (symbol, name)
let cards = [];
elements.forEach(el => {
    cards.push({ content: el.symbol, type: "symbol", id: el.symbol });
    cards.push({ content: el.name, type: "name", id: el.symbol });
});

// สุ่มลำดับการ์ด
cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

// สร้างการ์ดบนกระดาน
cards.forEach(cardData => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = cardData.id;
    card.dataset.type = cardData.type;
    card.textContent = "?";

    card.addEventListener("click", () => flipCard(card, cardData.content));
    gameBoard.appendChild(card);
});

function flipCard(card, content) {
    if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    card.textContent = content;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    checkMatch();
}

function checkMatch() {
    lockBoard = true;

    if (firstCard.dataset.id === secondCard.dataset.id && firstCard.dataset.type !== secondCard.dataset.type) {
        // จับคู่ได้
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCount++;

        if (matchedCount === elements.length) {
            setTimeout(() => alert("🎉 คุณจับคู่ครบทั้งหมดแล้ว!"), 300);
        }
        resetTurn();
    } else {
        // ไม่ตรง
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.textContent = "?";
            secondCard.textContent = "?";
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
