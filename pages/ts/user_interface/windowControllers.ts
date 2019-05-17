import { Game } from "./objectsModel";
import { onClickStarship } from "./spaceshipsViews";
import { onClickPlanet } from "./planetsViews";
import { onClickItem } from "./itemsViews";
import { getHallOfFame } from "./hallOfFame";

export function toggleWindow(window: HTMLElement) {
    let windows = document.getElementsByClassName("change-window");
    let i = 0;
    if (window.style.display != "block") {
        for (i = 0; i < windows.length; i++) {
            (<HTMLElement>windows[i]).style.display = "none";
        }
        if (window.classList.contains('slide-in-top')){
            window.classList.remove('slide-in-top');
        }
        window.classList.add('slide-in-top');
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
        if (window.classList.contains('slide-in-top')){
            window.classList.remove('slide-in-top');
        }
        window.classList.add('slide-in-top');
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
        let oneBasedIndex: number = game.items[item].id + 1;
        let globalItem = game.items[item];
        let tableRow = `
        <td class="order-column"><i class="fas fa-boxes"></i> ${oneBasedIndex}</td>
        <td class="name-column">${item}</td>
        <td class="best-price-column">Buy: ¢${globalItem.best_buy}</td>
        <td class="data-table-item-best-sell-place" id="best-sell-planet"><i class="fas fa-globe"></i> ${globalItem.best_buy_place}</td>
        <td class="best-price-column">Sell: ¢${globalItem.best_sell}</td>
        <td class="data-table-item-best-buy-place" id="best-buy-planet"><i class="fas fa-globe"></i> ${globalItem.best_sell_place}</td>
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

export function generateHallOfFameHtml() {
    let hall = getHallOfFame();
    let element = document.getElementById('hall-of-fame-table');
    let elemCount = hall.best_players.length;
    let innerHTML = "";
    for (let i = 0; i < elemCount; i++) {
        innerHTML += `<tr>
        <td>${i + 1}.</td>
        <td>${hall.best_players[i].name}</td>
        <td>${hall.best_players[i].score}</td>
        <td></td>`;
        innerHTML += `</tr>`
    }
    if (elemCount < 10){
        for (let i = elemCount; i < 10; i++){
            innerHTML += `<tr><td>NA</td><td></td><td></td></tr>`
        }
    }

    element.innerHTML = innerHTML;
}

export function generateThankYouOverlayHtml(name: string, result: number){
    let congrats = document.getElementById('end-game-congrats-p');
    congrats.innerHTML = `Dear ${name}, you scored ${result}!`;
    let overlay = document.getElementById('end-screen-overlay');
    overlay.style.display = "block";
}



export function drawGame(game : Game){
    let outside = document.getElementById("main-field");
    // alert(outside)
    let frameDocument = (<HTMLIFrameElement>outside).contentDocument;
    // alert(frameDocument);
    let map = frameDocument.getElementById("real-map");
    // alert("map " + map);
    map.innerHTML = "";
    for (let ship in game.starships){
        let starship = game.starships[ship];
        let row = starship.target_x;
        let column = starship.target_y;
        if (starship.total_travel_time){
            let timeFraction = starship.travel_remaining_time / starship.total_travel_time;
            row = starship.target_x + timeFraction * (starship.starting_x - starship.target_x);
            column = starship.target_y + timeFraction * (starship.starting_y - starship.target_y);
        }
        
        map.innerHTML += `
        <p id="ship-minimap-wrapper-${ship}" 
        style="top: ${row}%; left: ${column}%; width: 10px; height: 10px; margin: 0; position: absolute; z-index: 10000; 
        ${starship.travel_remaining_time ? '' : ''}">
            <svg height="10" width="10" style="top: 0%; left: 0%; z-index: 9000;" id="ship-minimap-${ship}">
                <circle cx="5" cy="5" r="4" stroke="black" stroke-width="0.5" fill="red" />
            </svg>
        </p>`;
        let miniwrapperName = `ship-minimap-wrapper-${ship}`;
        // alert(miniwrapperName);
        let element = frameDocument.getElementById(miniwrapperName);
        // alert(element.);
        let fun = () => {onClickStarship(ship);};
        element.onclick = fun;
    }
    for (let planetName in game.planets){
        let planet = game.planets[planetName];
        let row = planet.x;
        let column = planet.y;
        
        map.innerHTML += `
        <p id="planet-minimap-wrapper-${planet}" 
        style="top: ${row}%; left: ${column}%; width: 10px; height: 10px; margin: 0; position: absolute; z-index: 10000;">
            <svg height="10" width="10" style="top: 0%; left: 0%; z-index: 19000;" id="planet-minimap-${planet}">
                <circle cx="5" cy="5" r="4" stroke="black" id="planet-circle-${planet}" stroke-width="0.5" fill="${
                    Object.keys(planet.starships).length == 0 ? 'white' : 'yellow'}" />
            </svg>
        </p>`;
        let miniwrapperName = `planet-circle-${planet}`;
        // alert(miniwrapperName);
        let element = frameDocument.getElementById(miniwrapperName);
        // alert(element.);
        let fun = () => {onClickPlanet(planetName);};
        element.onclick = fun;
    }
}
