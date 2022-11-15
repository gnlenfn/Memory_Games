

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let flippedCount = 0;
let level = 1;
let cardsCount;
const badges = ["angular", "aurelia", "aws", "backbone", "elasticsearch", "ember", "fastapi", "go", "hadoop",
                "intellij", "kubernetes", "mongodb", "mysql", "react", "redis", "spring", "vscode", "vue"];
const MAX_LEVEL = 3;

function getLevel(){
    return level.toString();
}

function addCardsOnBoard(cardsCount) {
    let board = document.querySelector(".memory-game");
    badges.slice(0, cardsCount / 2).forEach((name) => {
        for(let i = 0; i < 2; i++){
            let badge = document.createElement("div");
            badge.classList.add("memory-card")
            badge.dataset.framework = name;

            let front = document.createElement("img");
            front.classList.add("front-face");
            front.src = "img/" + name + ".svg";

            let back = document.createElement("img");
            back.classList.add("back-face");
            back.src = "img/js-badge.svg";

            badge.appendChild(front);
            badge.appendChild(back);

            board.appendChild(badge);
        }
    })
}

function initBoard(level) {
    if(document.querySelectorAll(".memory-card")) {
        document.querySelectorAll(".memory-card").forEach(
            (card) => card.remove()
        );
    }
    if (level === 1) {
        document.querySelector(".memory-game").style.width = "320px";
        document.querySelector(".memory-game").style.height = "320px";
    } else {
        document.querySelector(".memory-game").style.width = "640px";
        document.querySelector(".memory-game").style.height = "640px";
    }
    shuffle(badges);
    cardsCount = Math.pow(2 * level, 2);
    addCardsOnBoard(cardsCount);

    let cardList = document.querySelectorAll(".memory-card");
    cardList.forEach((card) => {
        card.style.width = `calc(${100 / (2 * level )}% - 10px)`;
        card.style.height = `calc(${100 / (2 * level )}$ - 10px)`;

    })
    resetTimer();
}

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

function shuffle(arr) {
    arr.sort(() => Math.random() -0.5);
}

function gameEnd() {
    stopTimer();
    setTimeout(() => alert("Done!"), 500);
    console.log("Memory Game Done");

    onWork = false;
    document.querySelector(".left-button").addEventListener("click", prevLevel);
    document.querySelector(".right-button").addEventListener("click", nextLevel);
    // disabling start button
    document.querySelector(".watch-button").disabled = true;
    newRecord();
    flippedCount = 0;
}

function flipBoard() {
    resetBoard();
    document.querySelectorAll(".memory-card").forEach((element) =>
        element.classList.remove("flip"));
}
