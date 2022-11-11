const ranks = document.querySelector("#ranking-list");
const RANK_KEY = "ranks";

let ranking = localStorage.getItem(RANK_KEY);
let parsed = ranking ? JSON.parse(ranking) : [];


function saveRecord() {
    parsed.sort();
    localStorage.setItem(RANK_KEY, JSON.stringify(parsed));

}

function addList(record) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = record;

    li.appendChild(span);
    ranks.appendChild(li);
}

function showRankings() {
    const root = document.querySelector(".ranking-list")
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }

    const savedRanking = localStorage.getItem(RANK_KEY);
    const parsedRanking = JSON.parse(savedRanking);

    parsedRanking.sort();
    parsedRanking.slice(0, 5).forEach(addList)
}

function newRecord() {

    const record = `${document.querySelector("#sec").innerText}:` +
                   `${document.querySelector("#micro").innerText}`;

    if(ranking === null){
        parsed = [];
    } else {
        parsed = JSON.parse(ranking);
    }
    parsed.push(record);

    saveRecord();
    showRankings();
}

// Record exists
const savedRanking = localStorage.getItem(RANK_KEY);
if (savedRanking) {
    showRankings();
}