import { generatePlanetsHtml, generateStarshipsHtml, generateGameHtml, generateItemsHtml, generateThankYouOverlayHtml, drawGame } from "./windowControllers";
import { setTravelingStarshipWindow, onClickStarship } from "./spaceshipsViews";
import { setOnePlanetWindow, onClickPlanet } from "./planetsViews";
import { setOneItemWindow } from "./itemsViews";
import { addToHallOfFame } from "./hallOfFame";
;
;
;
;
;
;
;
export function getGame() {
    return JSON.parse(sessionStorage.getItem('game'));
}
export function returnGame(game) {
    sessionStorage.setItem('game', JSON.stringify(game));
    localStorage.setItem('game', JSON.stringify(game));
}
export function getBestPrice(game, item) {
    let id = (item in game.items) ? game.items[item].id : 0;
    let prices = { 'best_buy': -1, 'best_sell': 0, 'best_buy_place': "", 'best_sell_place': "", 'name': item, 'id': id };
    for (let planet in game.planets) {
        if (item in game.planets[planet].available_items) {
            let itemVal = game.planets[planet].available_items[item];
            if (itemVal.available > 0 && (prices.best_buy === -1 || itemVal.buy_price < prices.best_buy)) {
                prices.best_buy = itemVal.buy_price;
                prices.best_buy_place = planet;
            }
            if (itemVal.sell_price > prices.best_sell) {
                prices.best_sell = itemVal.sell_price;
                prices.best_sell_place = planet;
            }
        }
    }
    return prices;
}
export function generateModelOnly(initialState) {
    let game = { game_duration: 0, time_passed: 0, credits: 0, items: Object(), planets: Object(), starships: Object(), player_name: "player" };
    game.game_duration = initialState['game_duration'];
    game.time_passed = 0;
    game.credits = initialState['initial_credits'];
    let indx = 0;
    for (let itemInd in initialState.items) {
        let item = initialState.items[itemInd];
        // indx++;
        game.items[item] = getBestPrice(game, item);
        game.items[item].id = Number(itemInd);
    }
    indx = 0;
    for (let planet in initialState['planets']) {
        indx++;
        let oldPlanetVal = initialState['planets'][planet];
        game.planets[planet] = {
            name: planet,
            available_items: Object(),
            x: oldPlanetVal.x,
            y: oldPlanetVal.y,
            starships: Object(),
            id: indx,
        };
        for (let item in oldPlanetVal.available_items) {
            let itemValue = oldPlanetVal.available_items[item];
            game.planets[planet].available_items[item] = {
                id: game.items[item].id,
                name: item,
                buy_price: itemValue.buy_price,
                sell_price: itemValue.sell_price,
                available: itemValue.available,
            };
        }
    }
    indx = 0;
    for (let starship in initialState['starships']) {
        indx++;
        let oldStarshipVal = initialState['starships'][starship];
        game.starships[starship] = {
            id: indx,
            name: starship,
            position: oldStarshipVal.position,
            cargo_hold_size: oldStarshipVal.cargo_hold_size,
            cargo_used: 0,
            target_x: game.planets[oldStarshipVal.position].x,
            target_y: game.planets[oldStarshipVal.position].y,
            travel_remaining_time: 0,
            starting_x: game.planets[oldStarshipVal.position].x,
            starting_y: game.planets[oldStarshipVal.position].y,
            total_travel_time: 0,
            held_items: Object(),
        };
        game.planets[game.starships[starship].position].starships[starship] = true;
    }
    for (let itemInd in initialState.items) {
        let item = initialState.items[itemInd];
        game.items[item] = getBestPrice(game, item);
    }
    return game;
}
export function generateModel(initialState) {
    let game = generateModelOnly(initialState);
    returnGame(game);
}
export function buyItems(game, starship, item, howmany) {
    if (!(starship in game.starships)) {
        return false;
    }
    let ship = game.starships[starship];
    if (ship.travel_remaining_time > 0) {
        return false;
    }
    let planet = ship.position;
    if (!(planet in game.planets)) {
        return false;
    }
    let planetItems = game.planets[planet].available_items;
    if (!(item in planetItems) ||
        planetItems[item].available < howmany ||
        ship.cargo_used + howmany > ship.cargo_hold_size ||
        planetItems[item].buy_price * howmany > game.credits) {
        return false;
    }
    game.credits -= planetItems[item].buy_price * howmany;
    if (!(item in ship.held_items)) {
        ship.held_items[item] = 0;
    }
    ship.held_items[item] += howmany;
    ship.cargo_used += howmany;
    planetItems[item].available -= howmany;
    game.starships[starship] = ship;
    // alert("Buying element " + item + " for ship " + starship + "in " + howmany + " units for " + planetItems[item].buy_price * howmany + " credits");
    game.items[item] = getBestPrice(game, item);
    return true;
}
export function buyItemsWrapper(game, starship, item, howmany) {
    game = getGame();
    let value = buyItems(game, starship, item, howmany);
    if (value === false) {
        return false;
    }
    if (sessionStorage.getItem('current_item') == item) {
        setOneItemWindow(item);
    }
    returnGame(game);
    generateItemsHtml(game);
    generatePlanetsHtml(game);
    generateStarshipsHtml(game);
    generateGameHtml(game);
    setTravelingStarshipWindow(starship);
    return true;
}
;
export function sellItems(game, starship, item, howmany) {
    if (!(starship in game.starships)) {
        return false;
    }
    let ship = game.starships[starship];
    if (ship.travel_remaining_time > 0 || !(item in ship.held_items) || ship.held_items[item] < howmany) {
        return false;
    }
    let planet = ship.position;
    if (!(planet in game.planets)) {
        return false;
    }
    let planetItems = game.planets[planet].available_items;
    if (!(item in planetItems) || (!(item in ship.held_items))) {
        return false;
    }
    game.credits += planetItems[item].sell_price * howmany;
    ship.held_items[item] -= howmany;
    planetItems[item].available += howmany;
    ship.cargo_used -= howmany;
    game.items[item] = getBestPrice(game, item);
    return true;
}
export function sellItemsWrapper(game, starship, item, howmany) {
    game = getGame();
    let success = sellItems(game, starship, item, howmany);
    if (success === false) {
        return false;
    }
    if (sessionStorage.getItem('current_item') == item) {
        setOneItemWindow(item);
    }
    returnGame(game);
    generateItemsHtml(game);
    generatePlanetsHtml(game);
    generateStarshipsHtml(game);
    generateGameHtml(game);
    setTravelingStarshipWindow(starship);
    return true;
}
;
export function travel(game, starship, target) {
    if (!(starship in game.starships) || !(target in game.planets)) {
        return false;
    }
    let ship = game.starships[starship];
    if (ship.travel_remaining_time > 0 || ship.position === target) {
        return false;
    }
    let target_coords = {
        x: game.planets[target].x,
        y: game.planets[target].y,
    };
    delete game.planets[ship.position].starships[starship];
    let distancesq = (ship.target_x - target_coords.x) * (ship.target_x - target_coords.x)
        + (ship.target_y - target_coords.y) * (ship.target_y - target_coords.y);
    let distance = Math.round(Math.sqrt(distancesq));
    ship.starting_x = ship.target_x;
    ship.starting_y = ship.starting_y;
    ship.total_travel_time = distance;
    ship.travel_remaining_time = distance;
    ship.target_x = target_coords.x;
    ship.target_y = target_coords.y;
    ship.position = target;
}
export function travelWrapper(game, starship, target) {
    let go = travel(game, starship, target);
    if (go === false) {
        return false;
    }
    returnGame(game);
    generatePlanetsHtml(game);
    generateStarshipsHtml(game);
    generateGameHtml(game);
    return true;
}
function getDistance(game, planet1, planet2) {
    let diffx = (game.planets[planet1].x - game.planets[planet2].x);
    let diffy = (game.planets[planet1].y - game.planets[planet2].y);
    return Math.sqrt(diffx * diffx + diffy * diffy);
}
export function tickTimeUnit(game, affectedStarships) {
    if (game.time_passed > game.game_duration) {
        return false;
    }
    if (game.time_passed === game.game_duration) {
        // alert("Game ends");
        stopGame();
        // alert ("Game ended");
        let result = game.credits;
        let name = sessionStorage.getItem('nickname');
        localStorage.setItem('gameover', "yes");
        generateThankYouOverlayHtml(name, result);
        addToHallOfFame(name, result);
    }
    game.time_passed++;
    // alert("Tick " + game.time_passed);
    let hasChanged = false;
    for (let starshipName in game.starships) {
        let ship = game.starships[starshipName];
        // if (ship.travel_remaining_time % 4 === 1){
        // alert("Ship " + ship.name + " has remaining travel time of " + ship.travel_remaining_time);
        // } 
        if (ship.travel_remaining_time > 0) {
            affectedStarships[starshipName] = true;
            ship.travel_remaining_time--;
            if (ship.travel_remaining_time === 0) {
                game.planets[ship.position].starships[starshipName] = true;
                // alert("Ship " + ship.name + " has arrived in " + ship.position);
            }
            hasChanged = true;
        }
    }
}
export function tickTimeUnitWrapper() {
    if (sessionStorage.getItem('changeNow') === 'one-planet') {
        sessionStorage.removeItem('changeNow');
        let newPlanet = sessionStorage.getItem('currentPlanet');
        onClickPlanet(newPlanet);
    }
    if (sessionStorage.getItem('changeNow') === 'one-ship') {
        sessionStorage.removeItem('changeNow');
        let newShip = sessionStorage.getItem('currentShip');
        onClickStarship(newShip);
    }
    drawGame(getGame());
    let speed = parseInt(sessionStorage.getItem('speed'));
    let mult = parseInt(sessionStorage.getItem('real_time_units'));
    sessionStorage.setItem('real_time_units', (mult + 1).toString());
    if (speed === 0) {
        return false;
    }
    else if (speed === 1) {
        if (mult % 4 !== 0) {
            return false;
        }
    }
    else if (speed === 2) {
        if (mult % 2 !== 0) {
            return false;
        }
    }
    let game = getGame();
    let hasChanged = false;
    let affectedStarships = new Object();
    let go = tickTimeUnit(game, affectedStarships);
    if (go === false) {
        return false;
    }
    returnGame(game);
    let currentPlanet = sessionStorage.getItem("current_planet");
    let currentStarship = sessionStorage.getItem("current_starship");
    for (let starshipName in affectedStarships) {
        let ship = game.starships[starshipName];
        if (starshipName === currentStarship) {
            setTravelingStarshipWindow(starshipName);
        }
        if (ship.position === currentPlanet) {
            setOnePlanetWindow(currentPlanet);
        }
    }
    generateGameHtml(game);
    if (Object.keys(affectedStarships).length !== 0) {
        generateStarshipsHtml(game);
        generatePlanetsHtml(game);
    }
}
export function startGame() {
    setNormalSpeed();
    sessionStorage.setItem('real_time_units', (1).toString());
    let intervalId = setInterval(() => { tickTimeUnitWrapper(); }, 250);
    sessionStorage.setItem('intervalId', intervalId.toString());
}
export function stopGame() {
    let intervalId = parseInt(sessionStorage.getItem('intervalId'));
    clearInterval(intervalId);
}
export function pauseGame() {
    sessionStorage.setItem('speed', (0).toString());
}
export function setNormalSpeed() {
    sessionStorage.setItem('speed', (1).toString());
}
export function setDoubleSpeed() {
    sessionStorage.setItem('speed', (2).toString());
}
export function setQuadrupleSpeed() {
    sessionStorage.setItem('speed', (4).toString());
}
export function startNewGame() {
    stopGame();
    localStorage.setItem('gameover', "yes");
    window.location.reload();
}
export function getBestDeal() {
    let game = getGame();
    let bestResult = -1;
    let bestShip = "";
    let bestPlanet = "";
    let bestFirstSells = [];
    let bestBuySells = [];
    let bestLastSells = [];
    for (let shipName in game.starships) {
        let starship = game.starships[shipName];
        if (starship.travel_remaining_time > 0)
            continue;
        let oldPlanet = game.planets[starship.position];
        let curResult = 0;
        let curShip = shipName;
        let curPlanet = starship.position;
        let curFirstSells = [];
        let curBuySells = [];
        let curLastSells = [];
        console.log("Advice for " + shipName);
        for (let item in starship.held_items) {
            if (oldPlanet.available_items[item] !== undefined) {
                curResult += starship.held_items[item] * oldPlanet.available_items[item].sell_price;
                curFirstSells.push({ name: name, howmany: starship.held_items[item] });
            }
        }
        if (curResult > bestResult) {
            bestResult = curResult;
            bestShip = curShip;
            bestPlanet = curPlanet;
            bestFirstSells = curFirstSells;
            bestBuySells = curBuySells;
            bestLastSells = curLastSells;
        }
        for (let newPlanetName in game.planets) {
            curResult = 0;
            curShip = shipName;
            curPlanet = newPlanetName;
            curFirstSells = [];
            curBuySells = [];
            curLastSells = [];
            if (newPlanetName === starship.position) {
                continue;
            }
            let remainingSpace = starship.cargo_hold_size - starship.cargo_used;
            let remainingCredits = game.credits;
            let newPlanet = game.planets[newPlanetName];
            let curPotentialBuySells = [];
            for (let item in game.items) {
                let oldPlanetItem = oldPlanet.available_items[item];
                let newPlanetItem = newPlanet.available_items[item];
                if (oldPlanetItem === undefined) {
                    if (newPlanetItem === undefined)
                        continue;
                    // Selling on newPlanet
                    let count = (starship.held_items[item] || 0);
                    if (count > 0) {
                        curResult += count * newPlanetItem.sell_price;
                        curLastSells.push({ name: item, howmany: count });
                    }
                }
                else if (newPlanetItem === undefined) {
                    // Selling on oldPlanet
                    let count = (starship.held_items[item] || 0);
                    if (count > 0) {
                        curResult += count * oldPlanetItem.sell_price;
                        remainingSpace += count;
                        remainingCredits += count * oldPlanetItem.sell_price;
                        curFirstSells.push({ name: item, howmany: count });
                    }
                }
                else {
                    // Can buy&sell on both planets
                    let onBoardCount = (starship.held_items[item] || 0);
                    if (oldPlanetItem.sell_price >= newPlanetItem.sell_price) {
                        // Better to sell right away
                        if (onBoardCount > 0) {
                            curResult += onBoardCount * oldPlanetItem.sell_price;
                            remainingSpace += onBoardCount;
                            remainingCredits += onBoardCount * oldPlanetItem.sell_price;
                            curFirstSells.push({ name: item, howmany: onBoardCount });
                        }
                    }
                    else {
                        // Sell remainder
                        if (onBoardCount > 0) {
                            curResult += onBoardCount * newPlanetItem.sell_price;
                            curLastSells.push({ name: item, howmany: onBoardCount });
                        }
                        // And add buy&sell to list
                        if (oldPlanetItem.available > 0 && newPlanetItem.sell_price > oldPlanetItem.buy_price) {
                            curPotentialBuySells.push({
                                name: item, upfront_cost: oldPlanetItem.buy_price, profit: newPlanetItem.sell_price - oldPlanetItem.buy_price,
                                count: oldPlanetItem.available
                            });
                        }
                    }
                }
            }
            curPotentialBuySells.sort((a, b) => {
                if (a.profit > b.profit)
                    return -1;
                if (a.profit < b.profit)
                    return 1;
                if (a.upfront_cost < b.upfront_cost)
                    return -1;
                return 1;
            });
            console.log(curPotentialBuySells);
            for (let bs of curPotentialBuySells) {
                let maxQuantity = Math.min(Math.floor(remainingCredits / bs.upfront_cost), remainingSpace, bs.count);
                if (maxQuantity <= 0) {
                    continue;
                }
                remainingCredits -= bs.upfront_cost * maxQuantity;
                remainingSpace -= maxQuantity;
                curResult += maxQuantity * bs.profit;
                curBuySells.push({ name: bs.name, howmany: maxQuantity });
            }
            if (curResult > bestResult) {
                bestResult = curResult;
                bestShip = curShip;
                bestPlanet = curPlanet;
                bestFirstSells = curFirstSells;
                bestBuySells = curBuySells;
                bestLastSells = curLastSells;
            }
        }
    }
    let answerString = "You can earn a profit of " + bestResult + ". " + "Take the ship " + bestShip + ':<br>';
    if (bestPlanet === game.starships[bestShip].position) {
        for (let firstSell of bestFirstSells) {
            answerString += `Sell ${firstSell.howmany} units of ${firstSell.name}. <br>`;
        }
    }
    else {
        for (let firstSell of bestFirstSells) {
            answerString += `Sell ${firstSell.howmany} units of ${firstSell.name}. <br>`;
        }
        for (let buySell of bestBuySells) {
            answerString += `Buy ${buySell.howmany} units of ${buySell.name}.<br>`;
        }
        answerString += `Move to ${bestPlanet}.<br>`;
        for (let buySell of bestBuySells) {
            answerString += `Sell ${buySell.howmany} units of ${buySell.name}.<br>`;
        }
        for (let sell of bestLastSells) {
            answerString += `Sell ${sell.howmany} unitso of ${sell.name}.<br>`;
        }
    }
    return answerString;
}
//# sourceMappingURL=objectsModel.js.map