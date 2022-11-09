let timer_micro;
let timer_sec;
let timer_min;
let timer = 0;


function startTimer() {
    if(timer > 0) {
        return;
    }

    let micro = parseInt(document.getElementById("micro").innerText);
    let sec = parseInt(document.getElementById("sec").innerText);

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
        if (sec < 10) {
            sec = "0" + sec;
        }
        document.getElementById("sec").innerText = sec;
    }, 1000);
}

function resetTimer() {
    document.getElementById("micro").innerText = "00";
    document.getElementById("sec").innerText = "00";

    location.reload();

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


// button eventListener
document.querySelector('.start-button').addEventListener("click", startTimer);
document.querySelector('.start-button').addEventListener("click",
    function () {
        cards.forEach((card) => card.addEventListener("click", flipCard));
    });


// document.querySelector(".stop-button").addEventListener("click", stopTimer);

document.querySelector(".reset-button").addEventListener("click", resetTimer);



