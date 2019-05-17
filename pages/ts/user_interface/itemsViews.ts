import { toggleWindow, toggleWindowFromChild, addTableRow } from "./windowControllers";
import { Game, getGame, buyItemsWrapper } from "./objectsModel";
import { onClickPlanet } from "./planetsViews";

export function toggleItemsWindow(){
    let itemsWindow = document.getElementById("items-window");
    toggleWindow(itemsWindow);
}




export function setOneItemWindow(itemName: string){
    sessionStorage.setItem("current_item", itemName);
    let frameDocument = (<HTMLFrameElement>parent.document.getElementById("one-item-frame")).contentDocument;
    // alert(frameDocument);
    let game : Game = getGame();
    let itemNo = game.items[itemName].id;
    // alert("Gets going: starship is " + starship + " ship is " + ship + " shipid " + ship.id);
    interface PlanetEntry{
        name: string,
        has_buy_price: boolean,
        buy_price: number,
        sell_price: number,
        available: number,
    }
    let planetEntries = Object();
    let maxSell = {planet: "", value: -1};
    let minBuy = {planet: "", value: -1};
    for (let planet in game.planets){
        if (itemName in game.planets[planet].available_items){
            let itemsHeld = game.planets[planet].available_items[itemName];
            planetEntries[planet] = Object();
            planetEntries[planet].name = planet;
            if (itemsHeld.available > 0){
                planetEntries[planet].has_buy_price = true;
                planetEntries[planet].buy_price = itemsHeld.buy_price;
                if (itemsHeld.buy_price < minBuy.value || minBuy.value === -1){
                    minBuy.value = itemsHeld.buy_price;
                    minBuy.planet = planet;
                }
            }
            else{
                planetEntries[planet].has_buy_price = false;
            }
            planetEntries[planet].available = itemsHeld.available;
            planetEntries[planet].sell_price = itemsHeld.sell_price;
            if (itemsHeld.sell_price > maxSell.value){
                maxSell.value = itemsHeld.sell_price;
                maxSell.planet = planet;
            }
            
        }
    }
    let planetsArray : PlanetEntry[] = Object.keys(planetEntries).map(key => planetEntries[key]);
    planetsArray = planetsArray.sort((entry1, entry2) => {return entry1.buy_price === entry2.buy_price ? entry1.sell_price - entry2.sell_price : entry1.buy_price - entry2.buy_price});

    let innerHTML = `
        <tr class="multiline-data-table-entry multiline-data-table-entry-start"
        data-item-id="${itemNo}">
            <td class="data-table-item-logo"><i class="fas fa-rocket"></i>${itemNo}</td>
            <td class="data-table-item-name" colspan="2">${itemName}</td>
            <td class="data-table-item-best-buy" id="best-buy-price">Buy: ¢${minBuy.value}</td>
            <td class="data-table-item-best-buy-place" id="best-buy-planet"><i class="fas fa-globe"></i> ${minBuy.planet}</td>
            <td class="data-table-item-best-sell" id="best-sell-price">Sell: ¢${maxSell.value}</td>
            <td class="data-table-item-best-sell-place" id="best-sell-planet"><i class="fas fa-globe"></i> ${maxSell.planet}</td>
        </tr>
        <tr class="multiline-data-table-entry">
            <td colspan="8" class="in-table-breaker">Item on planets:</td>
        </tr>
    `;
    

    let tableBody = frameDocument.getElementById("one-item-table-body");
    // alert(element);
    tableBody.innerHTML = innerHTML;

    

    let lastElem = null;
    for(let i = 0; i < planetsArray.length; i++){
        let planetEntry = planetsArray[i];
        let itemHtml = `
        <td></td>
        <td>${planetEntry.name}</td>
        <td><i class="fas fa-globe"></i> ${planetEntry.available}</td>
        <td colspan="2">Sell: ¢${planetEntry.sell_price}</td>
        <td colspan="2">Buy: ¢${planetEntry.buy_price}</td>
        `;
        let onClick = () => {onClickPlanet(planetEntry.name);}
        addTableRow(frameDocument, tableBody, itemHtml, "multiline-data-table-entry", onClick);
    }
    let lastChild = <HTMLElement> tableBody.lastChild;
    lastChild.classList.add("multiline-data-table-entry-end");


}

export function toggleOneItemWindow(){
    let travelingStarshipWindow = window.parent.document.getElementById("one-item-window");
    toggleWindowFromChild(travelingStarshipWindow);
}

export function onClickItem(item : string){
    toggleOneItemWindow();
    setOneItemWindow(item);
}
