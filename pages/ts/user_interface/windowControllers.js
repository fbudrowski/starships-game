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
function addTableRow(frameDocument, tableBody, tableRowHtml, classes, onClick) {
    if (onClick === void 0) { onClick = function () { }; }
    var newElement = frameDocument.createElement("tr");
    newElement.className = classes;
    newElement.innerHTML = tableRowHtml;
    newElement.onclick = onClick;
    // alert(newElement.onClick);
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
    var classes = "starships-table-entry data-table-entry";
    tableBody.innerHTML = " ";
    var oneBasedIndex = 1;
    var _loop_1 = function (starship) {
        var position = gameData["starships"][starship].position;
        var coords = "(" + gameData["planets"][position].x + ", " + gameData["planets"][position].y + ")";
        var capacity = gameData["starships"][starship]["cargo_hold_size"];
        var onClick = function () { onClickStarship(starship); };
        var tableRow = "\n        <td><i class=\"fas fa-rocket\"></i> " + oneBasedIndex + "</td>\n        <td>" + starship + "</td>\n        <td>&darr; " + position + "</td>\n        <td>" + coords + "</td>\n        <td>0/" + capacity + "</td>\n        ";
        addTableRow(frameDocument, tableBody, tableRow, classes, onClick);
        oneBasedIndex++;
    };
    for (var starship in gameData["starships"]) {
        _loop_1(starship);
    }
}
function generatePlanetsHtml(gameData) {
    var frameDocument = document.getElementById("planets-frame").contentDocument;
    var tableBody = frameDocument.getElementById("planets-table-body");
    var classes = "planets-table-entry data-table-entry";
    tableBody.innerHTML = " ";
    var oneBasedIndex = 1;
    for (var planet in gameData["planets"]) {
        var coords = "(" + gameData["planets"][planet].x + ", " + gameData["planets"][planet].y + ")";
        var onClick = function () { };
        var ships = "<i class=\"fas fa-rocket\"></i>";
        var starships = "";
        var starshipCount = 0;
        for (var starship in gameData["starships"]) {
            if (gameData["starships"][starship].position === planet) {
                if (starships !== "")
                    starships += ", ";
                starships += starship;
                starshipCount++;
            }
        }
        ships += " " + starshipCount;
        ships += " " + starships;
        var tableRow = "\n        <td><i class=\"fas fa-planet\"></i> " + oneBasedIndex + "</td>\n        <td class=\"bold\">" + planet + "</td>\n        <td>" + coords + "</td>\n        <td colspan=\"3\">" + ships + "</td>\n        ";
        var classes_1 = "multiline-data-table-entry multiline-data-table-entry-start";
        addTableRow(frameDocument, tableBody, tableRow, classes_1, onClick);
        oneBasedIndex++;
        var availableItems = gameData["planets"][planet]["available_items"];
        var count = Object.keys(availableItems).length;
        for (var item in availableItems) {
            var unitsAvailable = availableItems[item]["available"];
            var buy = availableItems[item]["buy_price"];
            var sell = availableItems[item]["sell_price"];
            count--;
            if (count === 0)
                classes_1 = "multiline-data-table-entry multiline-data-table-entry-end";
            else
                classes_1 = "multiline-data-table-entry";
            var rocket_count = 0;
            var tableRow_1 = "<td></td>\n            <td>" + item + "</td>\n            <td><i class=\"fas fa-globe\"></i> " + unitsAvailable + "</td>\n            <td>\u00A2" + sell + "</td>\n            <td>\u00A2" + buy + "</td>\n            <td><i class=\"fas fa-rocket\"></i> " + rocket_count + "</td>";
            addTableRow(frameDocument, tableBody, tableRow_1, classes_1, onClick);
        }
    }
}
