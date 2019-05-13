import { toggleWindow, toggleWindowFromChild, addTableRow, generateStarshipsHtml } from "./windowControllers.js";
import { getGame, sellItems, buyItems, travel, returnGame } from "./objectsModel.js";
import { getPlanetSelectionList } from "./planetsViews.js";
export function toggleStarshipsWindow() {
    let starshipsWindow = document.getElementById("starships-window");
    toggleWindow(starshipsWindow);
}
export function setTravelingStarshipWindow(starship) {
    sessionStorage.setItem("current_starship", starship);
    let frameDocument = parent.document.getElementById("traveling-starship-frame").contentDocument;
    // alert(frameDocument);
    let game = getGame();
    let ship = game.starships[starship];
    // alert("Gets going: starship is " + starship + " ship is " + ship + " shipid " + ship.id);
    let planetsOptions = getPlanetSelectionList(game);
    let innerHTML = `
        <tr class="multiline-data-table-entry multiline-data-table-entry-start"
        data-ship-id="${ship.id}">
            <td class="data-table-ship-logo"><i class="fas fa-rocket"></i>${ship.id}</td>
            <td class="data-table-ship-name">${ship.name}</td>
            <td class="data-table-ship-location">(${ship.target_x}, ${ship.target_y})</td>
            <td class="data-table-ship-load">${ship.cargo_used}/${ship.cargo_hold_size}</td>
            <td class="data-table-planetary-location" colspan="4">${ship.travel_remaining_time === 0 ?
        "&darr" : "&rarr"}; <i class="fas fa-globe"></i> ${ship.travel_remaining_time === 0 ?
        "Staying in " + ship.position : "Comes in " + ship.travel_remaining_time + " s to " + ship.position}</td>
        </tr>
        <tr class="multiline-data-table-entry">
            <td colspan="4"></td>
            <td colspan="3">Move to: ${planetsOptions}</td>
            <td><button class="action-button" id="travel-confirmation-button">OK</button></td>
        </tr>
        <tr class="multiline-data-table-entry">
            <td colspan="8" class="in-table-breaker">Items to trade:</td>
        </tr>
    `;
    let tableBody = frameDocument.getElementById("one-starship-table-body");
    // alert(element);
    tableBody.innerHTML = innerHTML;
    let travelButton = frameDocument.getElementById("travel-confirmation-button");
    travelButton.onclick = () => {
        game = getGame();
        let selection = frameDocument.getElementById("planet-selection-list");
        travel(game, starship, selection.value);
        alert("Traveling to " + selection.value + " starship dist " + game.starships[starship].travel_remaining_time);
        returnGame(game);
        setTravelingStarshipWindow(starship);
        generateStarshipsHtml(game);
    };
    let planetItems = game.planets[ship.position].available_items;
    let lastElem = null;
    for (let planetItem in planetItems) {
        let realItem = planetItems[planetItem];
        let itemHtml = `
        <td></td>
        <td>${realItem.name}</td>
        <td><i class="fas fa-rocket"></i> ${(planetItem in ship.held_items) ? ship.held_items[planetItem] : 0}</td>
        <td><i class="fas fa-globe"></i> ${realItem.available}</td>
        <td><button class="action-button" id="${realItem.name}-sell-button" onclick="alert('Selling ' + '${realItem.name}')">Sell</button></td>
        <td>¢${realItem.sell_price}</td>
        <td>¢${realItem.buy_price}</td>
        <td><button class="action-button" id="${realItem.name}-buy-button">Buy</button></td>
        `;
        addTableRow(frameDocument, tableBody, itemHtml, "multiline-data-table-entry");
        let sellButton = frameDocument.getElementById(`${realItem.name}-sell-button`);
        let buyButton = frameDocument.getElementById(`${realItem.name}-buy-button`);
        sellButton.onclick = () => { sellItems(game, starship, planetItem, 1); game = getGame(); };
        buyButton.onclick = () => { buyItems(game, starship, planetItem, 1); game = getGame(); };
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