let timer_micro;
let timer_sec;
let timer_min;
let timer = 0;
let onWork = false;

function createWatch() {
    let timer = document.querySelector(".stop-watch #record");

    if(getLevel() === MAX_LEVEL.toString() && !document.querySelector("#min")){
        let min = document.createElement("span");
        const colon = document.createElement("span");
        colon.innerText = ":";
        colon.id = "min-colon";

        min.id = "min";
        min.innerText = "00";
        timer.insertBefore(min, document.querySelector("#sec"));
        timer.insertBefore(colon, document.querySelector("#sec"));
    } else if (getLevel() < MAX_LEVEL && document.querySelector("#min")) {
        document.querySelector("#min").remove();
        document.querySelector("#min-colon").remove();
    }

    if (document.querySelector("#sec") === null) {
        let sec = document.createElement("span");
        const colon = document.createElement("span");
        colon.innerText = ":";

        sec.id = "sec";
        sec.innerText = "00";
        timer.appendChild(sec);
        timer.appendChild(colon);
    }

    if (document.querySelector("#micro") === null) {
        let micro = document.createElement("span");
        micro.id = "micro";
        micro.innerText = "00";
        timer.appendChild(micro);
    }
}

function startTimer() {
    onWork = true;
    if(timer > 0) {
        return;
    }
    let min;
    let micro = parseInt(document.getElementById("micro").innerText);
    let sec = parseInt(document.getElementById("sec").innerText);
    if (getLevel() === MAX_LEVEL.toString()) {
        min = parseInt(document.getElementById("min").innerText);
    }

    timer_micro = setInterval(function () {
        micro++;
        if(micro === 100){
            micro = "00";
        } else if(micro < 10) {
            micro = "0" + micro;
        }
        document.getElementById("micro").innerText = micro;
    }, 10);

    timer_sec = setInterval(function () {
        sec++;
        if (sec === 60) {
            sec = (document.querySelector("#min")) ? "00" : sec;
        } else if (sec < 10) {
            sec = "0" + sec;
        }
            document.getElementById("sec").innerText = sec;
    }, 1000);

    timer_min = setInterval(function () {
        min++;
        if (min < 10) {
            min = "0" + min;
        }
        document.getElementById("min").innerText = min;
    }, 60000);
}

function resetTimer() {
    document.getElementById("micro").innerText = "00";
    document.getElementById("sec").innerText = "00";
    if(document.getElementById("min")){
        document.getElementById("min").innerText = "00";
    }

    // location.reload();
    flipBoard();
    stopTimer();
}

function stopTimer() {
    clearInterval(timer_micro);
    clearInterval(timer_sec);
    clearInterval(timer_min);

    timer--;
    if(timer < 0){
        timer = 0;
    }
}

function hideButton() {
    const btnStart = document.querySelector(".start-button");
    const btnReset = document.querySelector(".reset-button");
    btnStart.style.visibility = "hidden";
    btnReset.style.visibility = "visible";
}

function revealButton() {
    const btnStart = document.querySelector(".start-button");
    const btnReset = document.querySelector(".reset-button");
    btnStart.style.visibility = "visible";
    btnReset.style.visibility = "hidden";
}

function addListenerToButton() {
    // button eventListener
    document.querySelector('.start-button').addEventListener("click", startTimer);
    document.querySelector('.start-button').addEventListener("click",
        function () {
            document.querySelectorAll(".memory-card").forEach((card) => card.addEventListener("click", flipCard));
        });
    document.querySelector('.start-button').addEventListener("click", hideButton);
    document.querySelector(".start-button").addEventListener("click",
        function () {
            document.querySelectorAll(".memory-card").forEach((card) => {
                card.style.order = `${Math.floor(Math.random() * cardsCount)}`;
            });
        });
    document.querySelector(".start-button").addEventListener("click", function () {
        document.querySelector(".left-button").removeEventListener("click", prevLevel);
        document.querySelector(".right-button").removeEventListener("click", nextLevel);

    });

    document.querySelector(".reset-button").addEventListener("click", resetTimer);
    document.querySelector(".reset-button").addEventListener("click", revealButton);
    document.querySelector(".reset-button").addEventListener("click", function () {
        initBoard(level);
    })
    document.querySelector(".reset-button").addEventListener("click", function () {
        document.querySelector(".left-button").addEventListener("click", prevLevel);
        document.querySelector(".right-button").addEventListener("click", nextLevel);

    });
}


// addListenerToButton()



