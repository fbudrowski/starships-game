import { toggleWindowFromChild, toggleWindow, addTableRow } from "./windowControllers.js";
import { Game, getGame } from "./objectsModel.js";
import { toggleTravelingStarshipWindow, setTravelingStarshipWindow, onClickStarship } from "./spaceshipsViews.js";

export function togglePlanetsWindow() {
    let itemsWindow = document.getElementById("planets-window");
    toggleWindow(itemsWindow);
}

export function setOnePlanetWindow(planetName) {
    localStorage.setItem("current_planet", planetName);

    let frameDocument = (<HTMLFrameElement>parent.document.getElementById("one-planet-frame")).contentDocument;
    // alert(frameDocument);
    let game: Game = getGame();
    let planet = game.planets[planetName];
    // alert("Gets going: starship is " + starship + " ship is " + ship + " shipid " + ship.id);
    let starships = Object.keys(planet.starships);
    let innerHTML = `
        <tr class="multiline-data-table-entry multiline-data-table-entry-start">
            <td><i class="fas fa-globe"></i>${planet.id}</td>
            <td class="bold">${planet.name}</td>
            <td>(${planet.x}, ${planet.y})</td>
            <td colspan="3"><i class="fas fa-rocket"></i>${starships.length}: ${starships.length > 0 ? starships[0] : ""}${starships.length > 1 ? ", " + starships[1] : ""}${starships.length > 2 ? "..." : ""}
            </td>
        </tr>
        <tr class="multiline-data-table-entry">
            <td colspan="8" class="in-table-breaker">Items to trade:</td>
        </tr>
    `;
    let tableBody = frameDocument.getElementById("one-planet-table-body");
    // alert(element);
    tableBody.innerHTML = innerHTML;

    let planetItems = planet.available_items;

    for (let planetItem in planetItems) {
        let realItem = planetItems[planetItem];
        let inRockets = 0;
        for (let ship in planet.starships) {
            inRockets += (planetItem in game.starships[ship].held_items) ? game.starships[ship].held_items[planetItem] : 0;
        }
        let itemHtml = `
            <td></td>
            <td>${realItem.name}</td>
            <td><i class="fas fa-globe"></i> ${realItem.available}</td>
            <td>¢${realItem.sell_price}</td>
            <td>¢${realItem.buy_price}</td>
            <td><i class="fas fa-rocket"></i> ${inRockets}</td>
        `;
        addTableRow(frameDocument, tableBody, itemHtml, "multiline-data-table-entry");
    }
    let lastChild = <HTMLElement>tableBody.lastChild;
    lastChild.classList.add("multiline-data-table-entry-end");

    addTableRow(frameDocument, tableBody, `
    <td colspan="8" class="in-table-breaker">Ships:</td>`, "multiline-data-table-entry");

    for (let starship in planet.starships) {
        let ship = game.starships[starship];
        let itemHtml = `<td><i class="fas fa-rocket"></i>${ship.id}</td>
        <td>${ship.name}</td>
        <td>${ship.travel_remaining_time === 0 ? "&darr; " + planet.name : "in " + ship.travel_remaining_time + " time units &rarr; " + planetName}</td>
        <td>(${ship.target_x}, ${ship.target_y})</td>
        <td>${ship.cargo_used}/${ship.cargo_hold_size}</td>
        <td></td>`;
        let onclick = () => { onClickStarship(starship); };
        addTableRow(frameDocument, tableBody, itemHtml, "multiline-data-table-entry", onclick);
    }

    lastChild = <HTMLElement>tableBody.lastChild;
    lastChild.classList.add("multiline-data-table-entry-end");

}

export function toggleOnePlanetWindow() {
    let travelingStarshipWindow = window.parent.document.getElementById("one-planet-window");
    toggleWindowFromChild(travelingStarshipWindow);
}



export function onClickPlanet(planet: string) {
    toggleOnePlanetWindow();
    setOnePlanetWindow(planet);
}


export function getPlanetSelectionList(game: Game){
    let answer = `<select id="planet-selection-list">
    `;
    for(let planet in game.planets){
        // alert("planet " + planet);
        answer += ` <option value="${planet}">${planet}</option>
        `;
    }
    answer += `</select>`;
    return answer;
}
