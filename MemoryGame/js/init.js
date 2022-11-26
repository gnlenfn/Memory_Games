function addListenerToButton() {
    // button eventListener
    document.querySelector('.start-button').addEventListener("click", startTimer);
    document.querySelector('.start-button').addEventListener("click", hideButton);
    document.querySelector(".start-button").addEventListener("click", function () {
        document.querySelector(".left-button").removeEventListener("click", prevLevel);
        document.querySelector(".right-button").removeEventListener("click", nextLevel);
        document.querySelectorAll(".memory-card").forEach((card) =>
            card.style.order = `${Math.floor(Math.random() * cardsCount)}`
        );
        document.querySelectorAll(".memory-card").forEach((card) =>
            card.addEventListener("click", flipCard)
        );
    });


    document.querySelector(".reset-button").addEventListener("click", resetTimer);
    document.querySelector(".reset-button").addEventListener("click", revealButton);
    document.querySelector(".reset-button").addEventListener("click", function () {
        initBoard(level)
        document.querySelector(".left-button").addEventListener("click", prevLevel);
        document.querySelector(".right-button").addEventListener("click", nextLevel);

    });

    document.querySelector(".left-button").addEventListener("click", prevLevel);
    document.querySelector(".right-button").addEventListener("click", nextLevel);
}


createWatch();
initBoard(1);
addListenerToButton();

let RANK_KEY = getLevel();
const savedRanking = localStorage.getItem(RANK_KEY);
if (savedRanking) {
    showRankings();
}
