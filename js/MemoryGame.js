const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let flippedCount = 0;
const cardsCount = 12;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCard();

    if (flippedCount === cardsCount) {
        gameEnd();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();

    flippedCount += 2;
}

function unflipCard() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 750);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

}

(function shuffle() {
    cards.forEach((card) => {
        card.style.order = Math.floor(Math.random() * 12);
    });
})();

function gameEnd() {
    stopTimer();
    setTimeout(() => alert("Done!"), 500);
    console.log("Memory Game Done");

    // disabling start button
    document.querySelector(".watch-button").disabled = true;
    newRecord();
}

function flipBoard() {
    resetBoard();
    document.querySelectorAll(".memory-card").forEach((element) =>
        element.classList.remove("flip"));
}