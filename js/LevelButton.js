function nextLevel(){
    if(level === 3) {
        alert("It is the hardest Level!");
        return;
    }
    ++level;
    showRankings();
    initBoard(level);
    revealButton();
    createWatch();
}

function prevLevel(){
    if (level === 1) {
        alert("It is the easiest Level!");
        return;
    }
    --level;
    showRankings();
    initBoard(level)
    revealButton();
    createWatch();
}

document.querySelector(".left-button").addEventListener("click", prevLevel);
document.querySelector(".right-button").addEventListener("click", nextLevel);
