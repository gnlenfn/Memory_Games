function saveRecord(parsed) {
    RANK_KEY = getLevel();
    parsed.sort();
    if(parsed.length > 5) {
        parsed.pop();
    }
    localStorage.setItem(RANK_KEY, JSON.stringify(parsed));
}

function addList(record) {
    const ranks = document.querySelector("#ranking-list");
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

    RANK_KEY = getLevel();
    const savedRanking = localStorage.getItem(RANK_KEY);
    const parsedRanking = (savedRanking) ? JSON.parse(savedRanking) : [];

    parsedRanking.sort();
    parsedRanking.slice(0, 5).forEach(addList)
}

function newRecord() {
    RANK_KEY = getLevel();
    let ranking = localStorage.getItem(RANK_KEY);
    let parsed;

    let record = `${document.querySelector("#sec").innerText}:` +
        `${document.querySelector("#micro").innerText}`;

    if (getLevel() === '3') {
        record = `${document.querySelector("#min").innerText}:` + record;
    }
    if (ranking === null) {
        parsed = [];
    } else {
        parsed = JSON.parse(ranking);
    }
    parsed.push(record);

    saveRecord(parsed);
    showRankings();
}

