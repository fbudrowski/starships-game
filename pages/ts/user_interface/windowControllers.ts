import { Game } from "./objectsModel.js";
import { onClickStarship} from "./spaceshipsViews.js";
import { onClickPlanet } from "./planetsViews.js";

export function toggleWindow(window: HTMLElement) {
    let windows = document.getElementsByClassName("change-window");
    let i = 0;
    if (window.style.display != "block") {
        for (i = 0; i < windows.length; i++) {
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "block";
    }
    else {
        for (i = 0; i < windows.length; i++) {
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "none";
    }
}
export function toggleWindowFromChild(window: HTMLElement) {
    let windows = parent.document.getElementsByClassName("change-window");
    let i = 0;
    if (window.style.display != "block") {
        for (i = 0; i < windows.length; i++) {
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "block";
    }
    else {
        for (i = 0; i < windows.length; i++) {
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "none";
    }
}

export function untoggleWindows(){
    let windows = document.getElementsByClassName("change-window");
    let i = 0;
    for (i = 0; i < windows.length; i++) {
        (<HTMLElement>windows[i]).style.display = "none";
    }
}

export function untoggleWindowsFromChild(){
    let windows = parent.document.getElementsByClassName("change-window");
    let i = 0;
    for (i = 0; i < windows.length; i++) {
        (<HTMLElement>windows[i]).style.display = "none";
    }
}

export function setGameDuration(game_duration: number) {
    let container = document.getElementById("turns-total");
    container.innerText = `${game_duration}`;
}
export function setCurrentTurn(current_turn: number) {
    let container = document.getElementById("turns-passed");
    container.innerText = `${current_turn}`;
}
export function setCredits(new_credits: number) {
    let container = document.getElementById("credits");
    container.innerText = `${new_credits}`;
}


export function generateGameHtml(gameData : Game) {
    setGameDuration(gameData["game_duration"]);
    setCurrentTurn(gameData.time_passed);
    setCredits(gameData.credits);
}

export function addTableRow(frameDocument, tableBody, tableRowHtml, classes,
                     onClick = function () {}) {
    let newElement = frameDocument.createElement("tr");
    newElement.className = classes;
    newElement.innerHTML = tableRowHtml;
    newElement.onclick = onClick;
    // alert(newElement.onClick);
    tableBody.appendChild(newElement);
}

export function generateItemsHtml(gameData) {
    let frameDocument = (<HTMLFrameElement>document.getElementById("items-frame")).contentDocument;
    // alert(frameDocument);
    let tableBody = frameDocument.getElementById("items-table-body");
    // alert(tableBody);
    tableBody.innerHTML = " ";
    let classes = "items-table-entry data-table-entry";

    for (let index in gameData["items"]) {
        let oneBasedIndex: number = Number(index) + 1;
        let tableRow = `
        <td class="order-column"><i class="fas fa-boxes"></i> ${oneBasedIndex}</td>
        <td class="name-column">${gameData["items"][index]}</td>
        `;
        addTableRow(frameDocument, tableBody, tableRow, classes);
    }
}

export function generateStarshipsHtml(gameData) {
    let frameDocument = (<HTMLFrameElement>document.getElementById("starships-frame")).contentDocument;
    let tableBody = frameDocument.getElementById("starships-table-body");
    let classes = "starships-table-entry data-table-entry";
    tableBody.innerHTML = " ";
    let oneBasedIndex = 1;
    for (let starship in gameData["starships"]) {
        let position = gameData["starships"][starship].position;
        let coords = `(${gameData["planets"][position].x}, ${gameData["planets"][position].y})`;
        let capacity = gameData["starships"][starship]["cargo_hold_size"];
        let onClick = () => { onClickStarship(starship); };
        let tableRow = `
        <td class="order-column"><i class="fas fa-rocket"></i> ${oneBasedIndex}</td>
        <td class="name-column">${starship}</td>
        <td class="name-column">&darr; ${position}</td>
        <td class="coord-column">${coords}</td>
        <td class="capacity-column">0/${capacity}</td>
        `;
        addTableRow(frameDocument, tableBody, tableRow, classes, onClick);
        oneBasedIndex++;
    }
}

export function generatePlanetsHtml(gameData) {
    let frameDocument = (<HTMLFrameElement>document.getElementById("planets-frame")).contentDocument;
    let tableBody = frameDocument.getElementById("planets-table-body");
    let classes = "planets-table-entry data-table-entry";
    tableBody.innerHTML = " ";
    let oneBasedIndex = 1;
    for (let planet in gameData["planets"]) {
        let coords = `(${gameData["planets"][planet].x}, ${gameData["planets"][planet].y})`;
        let onClick = () => {onClickPlanet(planet);};
        let ships = `<i class="fas fa-rocket"></i>`;
        let starships = "";
        let starshipCount = 0;
        for (let starship in gameData["starships"]) {
            if (gameData["starships"][starship].position === planet) {
                if (starships !== "") starships += ", ";
                starships += starship;
                starshipCount++;
            }
        }
        ships += " " + starshipCount;
        ships += ": " + starships;
        let tableRow = `
        <td class="order-column"><i class="fas fa-planet"></i> ${oneBasedIndex}</td>
        <td class="name-column bold">${planet}</td>
        <td class="resources-column">${coords}</td>
        <td colspan="3">${ships}</td>
        `;

        let classes = "multiline-data-table-entry multiline-data-table-entry-start";
        addTableRow(frameDocument, tableBody, tableRow, classes, onClick);
        oneBasedIndex++;
        let availableItems = gameData["planets"][planet]["available_items"];
        let count = Object.keys(availableItems).length;

        for (let item in availableItems) {
            let unitsAvailable = availableItems[item]["available"];
            let buy = availableItems[item]["buy_price"];
            let sell = availableItems[item]["sell_price"];

            count--;
            if (count === 0) classes = "multiline-data-table-entry multiline-data-table-entry-end";
            else classes = "multiline-data-table-entry";
            let rocket_count = 0;
            let tableRow = `<td class="order-column"></td>
            <td class="name-column">${item}</td>
            <td class="resources-column"><i class="fas fa-globe"></i> ${unitsAvailable}</td>
            <td>¢${sell}</td>
            <td>¢${buy}</td>
            <td class="resources-column"><i class="fas fa-rocket"></i> ${rocket_count}</td>`;
            addTableRow(frameDocument, tableBody, tableRow, classes, onClick);
        }
    }
}
