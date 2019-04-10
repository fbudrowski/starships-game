function toggleWindow(window) {
    var windows = document.getElementsByClassName("change-window");
    var i = 0;
    if (window.style.display != "block") {
        for (i = 0; i < windows.length; i++) {
            windows[i].style.display = "none";
        }
        window.style.display = "block";
    }
    else {
        for (i = 0; i < windows.length; i++) {
            windows[i].style.display = "none";
        }
        window.style.display = "none";
    }
}
function toggleWindowFromChild(window) {
    var windows = parent.document.getElementsByClassName("change-window");
    var i = 0;
    if (window.style.display != "block") {
        for (i = 0; i < windows.length; i++) {
            windows[i].style.display = "none";
        }
        window.style.display = "block";
    }
    else {
        for (i = 0; i < windows.length; i++) {
            windows[i].style.display = "none";
        }
        window.style.display = "none";
    }
}
function setGameDuration(game_duration) {
    var container = document.getElementById("turns-total");
    container.innerText = "" + game_duration;
}
function setCurrentTurn(current_turn) {
    var container = document.getElementById("turns-passed");
    container.innerText = "" + current_turn;
}
function setCredits(new_credits) {
    var container = document.getElementById("credits");
    container.innerText = "" + new_credits;
}
function generateGameHtml(gameData) {
    setGameDuration(gameData["game_duration"]);
    setCurrentTurn(0);
    setCredits(gameData["initial_credits"]);
}
function generateItemsHtml(gameData) {
    var frameDocument = document.getElementById("items-frame").contentDocument;
    var tableBody = frameDocument.getElementById("items-table-body");
    tableBody.innerHTML = " ";
    for (var index in gameData["items"]) {
        var newElement = frameDocument.createElement("tr");
        var oneBasedIndex = Number(index) + 1;
        newElement.className = "items-table-entry data-table-entry";
        newElement.innerHTML = "\n        <td><i class=\"fas fa-boxes\"></i> " + oneBasedIndex + "</td>\n        <td>" + gameData["items"][index] + "</td>\n        ";
        tableBody.appendChild(newElement);
    }
}
