import { toggleWindow, toggleWindowFromChild, addTableRow } from "./windowControllers.js";
import { getGame } from "./objectsModel.js";
export function toggleStarshipsWindow() {
    let starshipsWindow = document.getElementById("starships-window");
    toggleWindow(starshipsWindow);
}
export function setTravelingStarshipWindow(starship) {
    let frameDocument = parent.document.getElementById("traveling-starship-frame").contentDocument;
    // alert(frameDocument);
    let game = getGame();
    let ship = game.starships[starship];
    // alert("Gets going: starship is " + starship + " ship is " + ship + " shipid " + ship.id);
    let innerHTML = `
        <tr class="multiline-data-table-entry multiline-data-table-entry-start"
        data-ship-id="${ship.id}">
            <td class="data-table-ship-logo"><i class="fas fa-rocket"></i>${ship.id}</td>
            <td class="data-table-ship-name">${ship.name}</td>
            <td class="data-table-ship-location">(${ship.target_x}, ${ship.target_y})</td>
            <td class="data-table-ship-load">${ship.cargo_used}/${ship.cargo_hold_size}</td>
            <td class="data-table-planetary-location" colspan="4">${ship.travel_remaining_time === 0 ? "&darr" : "&rarr"}; <i class="fas fa-globe"></i>${ship.travel_remaining_time === 0 ? "Staying in " + ship.position : "Will come in" + ship.travel_remaining_time + "time units to" + ship.position}</td>
        </tr>
        <tr class="multiline-data-table-entry">
            <td colspan="8" class="in-table-breaker">Items to trade:</td>
        </tr>
    `;
    let tableBody = frameDocument.getElementById("one-starship-table-body");
    // alert(element);
    tableBody.innerHTML = innerHTML;
    let planetItems = game.planets[ship.position].available_items;
    let lastElem = null;
    for (let planetItem in planetItems) {
        let realItem = planetItems[planetItem];
        let itemHtml = `
        <td></td>
        <td>${realItem.name}</td>
        <td><i class="fas fa-rocket"></i>${(planetItem in ship.held_items) ? ship.held_items[planetItem] : 0}</td>
        <td><i class="fas fa-globe"></i>${realItem.available}</td>
        <td><button class="action-button">Sell</button></td>
        <td>¢${realItem.sell_price}</td>
        <td>¢${realItem.buy_price}</td>
        <td><button class="action-button">Buy</button></td>
        `;
        addTableRow(frameDocument, tableBody, itemHtml, "multiline-data-table-entry");
    }
    let lastChild = tableBody.lastChild;
    lastChild.classList.add("multiline-data-table-entry-end");
}
export function toggleTravelingStarshipWindow() {
    let travelingStarshipWindow = window.parent.document.getElementById("traveling-starship-window");
    toggleWindowFromChild(travelingStarshipWindow);
}
export function onClickStarship(starship) {
    toggleTravelingStarshipWindow();
    setTravelingStarshipWindow(starship);
}
//# sourceMappingURL=spaceshipsViews.js.map