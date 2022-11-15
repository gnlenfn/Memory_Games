function nextLevel(){
    if(level === MAX_LEVEL) {
        setTimeout(() => alert("It is the hardest Level!"), 200);
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
        setTimeout(() => alert("It is the easiest Level!"), 200);
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
