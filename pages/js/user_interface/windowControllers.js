import { generateModel, getGame } from "./objectsModel";
import { onClickStarship } from "./spaceshipsViews";
import { onClickPlanet } from "./planetsViews";
import { onClickItem } from "./itemsViews";
import { getHallOfFame } from "./hallOfFame";
export function toggleWindow(window) {
    let windows = document.getElementsByClassName("change-window");
    let i = 0;
    if (window.style.display != "block") {
        for (i = 0; i < windows.length; i++) {
            windows[i].style.display = "none";
        }
        if (window.classList.contains('slide-in-top')) {
            window.classList.remove('slide-in-top');
        }
        window.classList.add('slide-in-top');
        window.style.display = "block";
    }
    else {
        for (i = 0; i < windows.length; i++) {
            windows[i].style.display = "none";
        }
        window.style.display = "none";
    }
}
export function toggleWindowFromChild(window) {
    let windows = parent.document.getElementsByClassName("change-window");
    let i = 0;
    if (window.style.display != "block") {
        for (i = 0; i < windows.length; i++) {
            windows[i].style.display = "none";
        }
        if (window.classList.contains('slide-in-top')) {
            window.classList.remove('slide-in-top');
        }
        window.classList.add('slide-in-top');
        window.style.display = "block";
    }
    else {
        for (i = 0; i < windows.length; i++) {
            windows[i].style.display = "none";
        }
        window.style.display = "none";
    }
}
export function untoggleWindows() {
    let windows = document.getElementsByClassName("change-window");
    let i = 0;
    for (i = 0; i < windows.length; i++) {
        windows[i].style.display = "none";
    }
}
export function untoggleWindowsFromChild() {
    let windows = parent.document.getElementsByClassName("change-window");
    let i = 0;
    for (i = 0; i < windows.length; i++) {
        windows[i].style.display = "none";
    }
}
export function setGameDuration(game_duration) {
    let container = document.getElementById("turns-total");
    if (container !== null && container.innerText !== `${game_duration}`) {
        container.innerText = `${game_duration}`;
    }
}
export function setCurrentTurn(current_turn) {
    let container = document.getElementById("turns-passed");
    if (container !== null && container.innerText !== `${current_turn}`) {
        container.innerText = `${current_turn}`;
    }
}
export function setCredits(new_credits) {
    let container = document.getElementById("credits");
    if (container !== null && container.innerText !== `${new_credits}`) {
        container.innerText = `${new_credits}`;
    }
}
export function generateGameHtml(game) {
    setGameDuration(game.game_duration);
    setCurrentTurn(game.time_passed);
    setCredits(game.credits);
}
export function addTableRow(frameDocument, tableBody, tableRowHtml, classes, onClick = function () { }) {
    let newElement = frameDocument.createElement("tr");
    newElement.className = classes;
    newElement.innerHTML = tableRowHtml;
    newElement.onclick = onClick;
    // alert(newElement.onClick);
    tableBody.appendChild(newElement);
}
export function generateItemsHtml(game) {
    let outside = document.getElementById("items-frame");
    if (outside === null) {
        return false;
    }
    // alert("Outside (items) it's " + outside + " contentdocument is " + (<HTMLIFrameElement>outside).contentDocument);
    let frameDocument = document.getElementById("items-frame").contentDocument;
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
        let oneBasedIndex = game.items[item].id + 1;
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
export function tickStarshipsView(game) {
    let frameDocument = document.getElementById("starships-frame").contentDocument;
    let tableBody = frameDocument.getElementById("starships-table-body");
}
export function generateStarshipsHtml(game) {
    let frameDocument = document.getElementById("starships-frame").contentDocument;
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
export function generatePlanetsHtml(game) {
    let outside = document.getElementById("planets-frame");
    // alert("Outside it's " + outside);
    let frameDocument = document.getElementById("planets-frame").contentDocument;
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
                if (starships !== "")
                    starships += ", ";
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
            if (count === 0)
                classes = "multiline-data-table-entry multiline-data-table-entry-end";
            else
                classes = "multiline-data-table-entry";
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
        innerHTML += `</tr>`;
    }
    if (elemCount < 10) {
        for (let i = elemCount; i < 10; i++) {
            innerHTML += `<tr><td>NA</td><td></td><td></td></tr>`;
        }
    }
    element.innerHTML = innerHTML;
}
export function setMapBoxContainer() {
    let container = document.getElementById('map-box-container');
    container.innerHTML = "";
    let proxy = 'https://cors-anywhere.herokuapp.com/', target = 'https://aqueous-lake-83440.herokuapp.com/states';
    let content = "";
    let fillContainer = (value) => {
        // console.log("Fetched object" + value);
        let obj = JSON.parse(value);
        // console.log(obj);
        for (let elem of obj) {
            let name = elem.name;
            let ships = elem.starship_count;
            let planets = elem.planet_count;
            let items = elem.items_count;
            let money = elem.init_money;
            let duration = elem.default_duration;
            let description = elem.short_description;
            container.innerHTML +=
                `<input type="radio" class="map-box-checker" style="" id="map-box-${name}" name="map-selection" checked>
            <label for="map-box-${name}">
                <div class="map-box">
                    <p>${name}</p>
                    <p class="map-box-description">${description}</p>
                    <p class="map-box-description">
                        <i class="fas fa-rocket"></i> ${ships}, 
                        <i class="fas fa-globe"></i> ${planets}, 
                        <i class="fas fa-boxes"></i> ${items}, 
                        ¢${money}, 
                        <i class="fas fa-clock"></i> ${duration}</p>
                </div>
            </label>`;
        }
    };
    fetch(proxy + target).then((receivedValue) => {
        // console.log(receivedValue);
        // console.log(receivedValue.body);
        let bodyVal = receivedValue.body;
        let reader = bodyVal.getReader();
        reader.read().then(function processText({ done, value }) {
            if (done) {
                // console.log("Stream complete");
                fillContainer(content);
                return;
            }
            let decoded = new TextDecoder("utf-8").decode(value);
            // console.log("Got chunk of " + value.length + " with " + value + " of type "+ typeof(value));
            // console.log("Decoded is  "+ decoded);
            content += decoded;
            return reader.read().then(processText);
        });
        // container.innerHTML +=
        //     `<input type="radio" style="display: none;" id="map-box-${value}" name="map-selection" checked>
        //     <label for="map-box-1">
        //         <div class="map-box">
        //             <p>Name</p>
        //             <p class="map-box-description">Easy map with many profits.</p>
        //             <p class="map-box-description"><i class="fas fa-rocket"></i> 10, <i class="fas fa-globe"></i> 20, <i class="fas fa-boxes"></i> 5, ¢1990, <i class="fas fa-clock"></i> 200</p>
        //         </div>
        //     </label>`;
    }, (reason) => { });
}
export function generateThankYouOverlayHtml(name, result) {
    let congrats = document.getElementById('end-game-congrats-p');
    congrats.innerHTML = `Dear ${name}, you scored ${result} !`;
    let overlay = document.getElementById('end-screen-overlay');
    overlay.style.display = "block";
}
export function drawGame(game) {
    let outside = document.getElementById("main-field");
    let frameDocument = outside.contentDocument;
    let map = frameDocument.getElementById("real-map");
    map.innerHTML = "";
    for (let ship in game.starships) {
        let starship = game.starships[ship];
        let row = starship.target_x;
        let column = starship.target_y;
        if (starship.total_travel_time) {
            let timeFraction = starship.travel_remaining_time / starship.total_travel_time;
            row = starship.target_x + timeFraction * (starship.starting_x - starship.target_x);
            column = starship.target_y + timeFraction * (starship.starting_y - starship.target_y);
        }
        map.innerHTML += `
        <p id="ship-minimap-wrapper-${ship}" 
        style="top: ${row}%; left: ${column}%; width: 10px; height: 10px; margin: 0; position: absolute; z-index: 10000; 
        ${starship.travel_remaining_time ? '' : ''}">
            <svg height="10" width="10" style="top: 0%; left: 0%; z-index: 9000;" id="ship-minimap-${ship}">
                <circle cx="5" cy="5" r="4" stroke="black" stroke-width="0.5" fill="red"onclick = "
                sessionStorage.setItem('currentShip', '${ship}');
                sessionStorage.setItem('changeNow', 'one-ship');"/>
            </svg>
        </p>`;
    }
    for (let planetName in game.planets) {
        let planet = game.planets[planetName];
        let row = planet.x;
        let column = planet.y;
        map.innerHTML += `
        <p id="planet-minimap-wrapper-${planetName}" 
        style="top: ${row}%; left: ${column}%; width: 10px; height: 10px; margin: 0; position: absolute; z-index: 10000;">
            <svg height="10" width="10" style="top: 0%; left: 0%; z-index: 14000;" id="planet-minimap-${planetName}">
                <circle cx="5" cy="5" r="4" stroke="black" id="planet-circle-${planetName}" stroke-width="0.5" fill="${Object.keys(planet.starships).length == 0 ? 'white' : 'yellow'}" onclick="
                    sessionStorage.setItem('currentPlanet', '${planetName}');
                    sessionStorage.setItem('changeNow', 'one-planet');"/>
            </svg>
        </p>`;
    }
}
export function setUpGame(initialStateString) {
    let initialState = JSON.parse(initialStateString);
    generateModel(initialState);
    let model = getGame();
    // alert("Generating game");
    generateGameHtml(model);
    // alert("Generating items");
    generateItemsHtml(model);
    // alert("Generating starships");
    generateStarshipsHtml(model);
    // alert("Generating planets");
    generatePlanetsHtml(model);
    // alert("Generated all");
}
//# sourceMappingURL=windowControllers.js.map