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
function addTableRow(frameDocument, tableBody, tableRowHtml, classes) {
    var newElement = frameDocument.createElement("tr");
    newElement.className = classes;
    newElement.innerHTML = tableRowHtml;
    tableBody.appendChild(newElement);
}
function generateItemsHtml(gameData) {
    var frameDocument = document.getElementById("items-frame").contentDocument;
    var tableBody = frameDocument.getElementById("items-table-body");
    tableBody.innerHTML = " ";
    var classes = "items-table-entry data-table-entry";
    for (var index in gameData["items"]) {
        var oneBasedIndex = Number(index) + 1;
        var tableRow = "\n        <td><i class=\"fas fa-boxes\"></i> " + oneBasedIndex + "</td>\n        <td>" + gameData["items"][index] + "</td>\n        ";
        addTableRow(frameDocument, tableBody, tableRow, classes);
    }
}
function generateStarshipsHtml(gameData) {
    var frameDocument = document.getElementById("starships-frame").contentDocument;
    var tableBody = frameDocument.getElementById("starships-table-body");
    var classes = "items-table-entry data-table-entry";
    alert(frameDocument);
    alert(tableBody);
    tableBody.innerHTML = " ";
    var oneBasedIndex = 1;
    for (var starship in gameData["starships"]) {
        alert("Kurwa " + starship + ";; ");
        var position = gameData["starships"][starship].position;
        var coords = "(" + gameData["planets"]["position"].x + ", " + gameData["planets"]["position"].y + ")";
        var capacity = gameData["starships"][starship]["cargo_hold_size"];
        var tableRow = "\n        <td><i class=\"fas fa-rocket\"></i> " + oneBasedIndex + "</td>\n        <td>" + starship + "</td>\n        <td>&darr; " + position + "</td>\n        <td>&darr; " + coords + "</td>\n        <td>0/" + capacity + "</td>\n        ";
        addTableRow(frameDocument, tableBody, tableRow, classes);
        oneBasedIndex++;
    }
}
