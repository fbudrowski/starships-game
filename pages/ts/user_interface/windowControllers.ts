import { Game } from "./objectsModel.js";
import { onClickStarship } from "./spaceshipsViews.js";
import { onClickPlanet } from "./planetsViews.js";
// import { onClickItem } from "./itemsViews.js";
import { play } from "./play.js";
import { onClickItem } from "./itemsViews.js";

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

export function untoggleWindows() {
    let windows = document.getElementsByClassName("change-window");
    let i = 0;
    for (i = 0; i < windows.length; i++) {
        (<HTMLElement>windows[i]).style.display = "none";
    }
}

export function untoggleWindowsFromChild() {
    let windows = parent.document.getElementsByClassName("change-window");
    let i = 0;
    for (i = 0; i < windows.length; i++) {
        (<HTMLElement>windows[i]).style.display = "none";
    }
}

export function setGameDuration(game_duration: number) {
    let container = document.getElementById("turns-total");
    if (container !== null && container.innerText !== `${game_duration}`) {
        container.innerText = `${game_duration}`;
    }
}
export function setCurrentTurn(current_turn: number) {
    let container = document.getElementById("turns-passed");
    if (container !== null && container.innerText !== `${current_turn}`) {
        container.innerText = `${current_turn}`;
    }
}
export function setCredits(new_credits: number) {
    let container = document.getElementById("credits");
    if (container !== null && container.innerText !== `${new_credits}`) {
        container.innerText = `${new_credits}`;
    }
}



export function generateGameHtml(game: Game) {
    setGameDuration(game.game_duration);
    setCurrentTurn(game.time_passed);
    setCredits(game.credits);
}

export function addTableRow(frameDocument, tableBody, tableRowHtml, classes,
    onClick = function () { }) {
    let newElement = frameDocument.createElement("tr");
    newElement.className = classes;
    newElement.innerHTML = tableRowHtml;
    newElement.onclick = onClick;
    // alert(newElement.onClick);
    tableBody.appendChild(newElement);
}

export function generateItemsHtml(game: Game) {
    let outside = document.getElementById("items-frame");
    if (outside === null) {
        return false;
    }
    // alert("Outside (items) it's " + outside + " contentdocument is " + (<HTMLIFrameElement>outside).contentDocument);
    let frameDocument = (<HTMLIFrameElement>document.getElementById("items-frame")).contentDocument;
    if (frameDocument === null) {
        return false;
    }
    // alert(frameDocument);
    let tableBody = frameDocument.getElementById("items-table-body");
    if (tableBody === null) {
        return false;
    }
    // alert(tableBody);
    tableBody.innerHTML = "";
    let classes = "items-table-entry data-table-entry";

    for (let item in game.items) {
        let oneBasedIndex: number = Number(game.items[item]) + 1;
        let tableRow = `
        <td class="order-column"><i class="fas fa-boxes"></i> ${oneBasedIndex}</td>
        <td class="name-column">${item}</td>
        
        `;
        // let onClick = () => { alert("Clicked " + item) };
        let onClick = () => { onClickItem(item); };

        addTableRow(frameDocument, tableBody, tableRow, classes, onClick);
    }
}

export function tickStarshipsView(game: Game) {
    let frameDocument = (<HTMLFrameElement>document.getElementById("starships-frame")).contentDocument;
    let tableBody = frameDocument.getElementById("starships-table-body");
}

export function generateStarshipsHtml(game: Game) {
    let frameDocument = (<HTMLIFrameElement>document.getElementById("starships-frame")).contentDocument;
    let tableBody = frameDocument.getElementById("starships-table-body");
    if (tableBody === null) {
        return false;
    }
    let classes = "starships-table-entry data-table-entry";
    tableBody.innerHTML = " ";
    let oneBasedIndex = 1;
    for (let starship in game["starships"]) {
        let position = game["starships"][starship].position;
        let coords = `(${game["planets"][position].x}, ${game["planets"][position].y})`;
        let capacity = game["starships"][starship].cargo_hold_size;
        let held = game.starships[starship].cargo_used;
        let remainingTime = game.starships[starship].travel_remaining_time;
        let onClick = () => { onClickStarship(starship); };
        let tableRow = `
        <td class="order-column"><i class="fas fa-rocket"></i> ${oneBasedIndex}</td>
        <td class="name-column starship-name-column" id="${starship}-name-field">${starship}</td>
        <td class="name-column" id="${starship}-remaining-time-field">${(remainingTime > 0 ? "&rarr; (" + remainingTime + " s) " : "&darr; ") + position}</td>
        <td class="coord-column" id="${starship}-coords-field">${coords}</td>
        <td class="capacity-column" id="${starship}-held-capacity-field">${held}/${capacity}</td>
        `;
        addTableRow(frameDocument, tableBody, tableRow, classes, onClick);
        oneBasedIndex++;
    }
}

export function generatePlanetsHtml(game: Game) {
    let outside = document.getElementById("planets-frame");
    // alert("Outside it's " + outside);
    let frameDocument = (<HTMLIFrameElement>document.getElementById("planets-frame")).contentDocument;
    let tableBody = frameDocument.getElementById("planets-table-body");
    if (tableBody === null) {
        return false;
    }
    let classes = "planets-table-entry data-table-entry";
    tableBody.innerHTML = " ";
    let oneBasedIndex = 1;
    for (let planet in game["planets"]) {
        let coords = `(${game["planets"][planet].x}, ${game["planets"][planet].y})`;
        let onClick = () => { onClickPlanet(planet); };
        let ships = `<i class="fas fa-rocket"></i>`;
        let starships = "";
        let starshipCount = 0;
        for (let starship in game.starships) {
            if (starshipCount > 3) {
                starships += "...";
                break;
            }
            if (game.starships[starship].position === planet) {
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
        let availableItems = game.planets[planet]["available_items"];
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
