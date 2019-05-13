import { generatePlanetsHtml, generateStarshipsHtml, generateGameHtml, generateItemsHtml } from "./windowControllers.js";
import { setTravelingStarshipWindow } from "./spaceshipsViews.js";
import { setOnePlanetWindow } from "./planetsViews.js";
import { setOneItemWindow } from "./itemsViews.js";

export { Item, Items, Planet, Planets, HeldItems, Starship, Starships, Game, generateModel };

interface Item {
    id: number,
    name: string,
    available: number,
    buy_price: number,
    sell_price: number,
};
interface Items {
    [item_name: string]: Item,
};

interface Planet {
    id: number,
    name: string,
    available_items: Items,
    x: number,
    y: number,
    starships: Object,
};
interface Planets {
    [planet: string]: Planet,
};

interface HeldItems {
    [itemType: string]: number,
};

interface Starship {
    id: number,
    name: string,
    position: string,
    cargo_hold_size: number,
    cargo_used: number,
    held_items: HeldItems,
    travel_remaining_time: number,
    target_x: number,
    target_y: number,
};

interface Starships {
    [starship: string]: Starship,
};
interface WorldwideItem{
    name: string,
    id: number,
    best_buy: number,
    best_buy_place: string,
    best_sell: number,
    best_sell_place: string,
}

interface ItemList {
    [item: string]: WorldwideItem,
}

interface Game {
    starships: Starships,
    planets: Planets,
    items: ItemList,

    game_duration: number,
    time_passed: number,
    credits: number,
    player_name: string,
}

let gameLock = 0;
export function getGame(): Game {
    return JSON.parse(localStorage.getItem('game'));
}
export function returnGame(game : Game){
    localStorage.setItem('game', JSON.stringify(game));
}

export function getBestPrice(game: Game, item: string) : WorldwideItem{
    let id = (item in game.items) ? game.items[item].id : 0;
    let prices : WorldwideItem = {'best_buy': -1, 'best_sell': 0, 'best_buy_place': "", 'best_sell_place': "", 'name': item, 'id': id};
    for (let planet in game.planets){
        if (item in game.planets[planet].available_items){
            let itemVal = game.planets[planet].available_items[item];
            if (itemVal.available > 0 && (prices.best_buy === -1 || itemVal.buy_price < prices.best_buy)){
                prices.best_buy = itemVal.buy_price;
                prices.best_buy_place = planet;
            }
            if (itemVal.sell_price > prices.best_sell){
                prices.best_sell = itemVal.sell_price;
                prices.best_sell_place = planet;
            }
        }
    }
    return prices;
}

function generateModel(initialState) {
    let game: Game = { game_duration: 0, time_passed: 0, credits: 0, items: Object(), planets: Object(), starships: Object(), player_name: "player" };
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
            }
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
            held_items: Object(),
        }
        game.planets[game.starships[starship].position].starships[starship] = true;
    }

    returnGame(game);
    for (let itemInd in initialState.items) {
        let item = initialState.items[itemInd];
        game.items[item] = getBestPrice(game, item);
    }
    returnGame(game);

}


export function buyItems(game: Game, starship: string, item: string, howmany: number) {
    game = getGame();
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
    if (localStorage.getItem('current_item') == item){
        setOneItemWindow(item);
    }

    returnGame(game);
    generateItemsHtml(game);
    generatePlanetsHtml(game);
    generateStarshipsHtml(game);
    generateGameHtml(game);
    setTravelingStarshipWindow(starship);
    return true;
};



export function sellItems(game: Game, starship: string, item: string, howmany: number) {
    game = getGame();
    if (!(starship in game.starships)) {
        return false;
    }
    let ship = game.starships[starship];
    if (ship.travel_remaining_time > 0 || !(item in ship.held_items) || ship.held_items[item] <= 0) {
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
    if (localStorage.getItem('current_item') == item){
        setOneItemWindow(item);
    }

    returnGame(game);
    generateItemsHtml(game);
    generatePlanetsHtml(game);
    generateStarshipsHtml(game);
    generateGameHtml(game);
    setTravelingStarshipWindow(starship);
    return true;
};

export function travel(game: Game, starship: string, target: string) {
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
    ship.travel_remaining_time = distance;
    ship.target_x = target_coords.x;
    ship.target_y = target_coords.y;
    ship.position = target;


    returnGame(game);

    generatePlanetsHtml(game);
    generateStarshipsHtml(game);
    generateGameHtml(game);
    return true;
}


function getDistance(game: Game, planet1: string, planet2: string) {
    let diffx = (game.planets[planet1].x - game.planets[planet2].x);
    let diffy = (game.planets[planet1].y - game.planets[planet2].y);
    return Math.sqrt(diffx * diffx + diffy * diffy);
}

// export function moveToAnotherPlanet(game: Game, starship: string, targetPlanet: string) {
//     if (!(starship in game.starships) || !(targetPlanet in game.planets) || game.starships[starship].travel_remaining_time > 0) {
//         return false;
//     }
//     let ship = game.starships[starship];
//     let distance = getDistance(game, ship.position, targetPlanet);
//     delete game.planets[ship.position].starships[ship.name];
//     game.planets[targetPlanet].starships[ship.name] = true;

//     ship.position = targetPlanet;
//     ship.travel_remaining_time = Math.round(distance);
//     ship.target_x = game.planets[targetPlanet].x;
//     ship.target_y = game.planets[targetPlanet].y;

//returnGame(game);
//     return true;
// }

export function tickTimeUnit(game: Game) {
    game.time_passed++;
    // alert("Tick " + game.time_passed);
    let hasChanged = false;
    let affectedStarship = Object();
    for (let starshipName in game.starships) {
        let ship = game.starships[starshipName];
        // if (ship.travel_remaining_time % 4 === 1){
            // alert("Ship " + ship.name + " has remaining travel time of " + ship.travel_remaining_time);
        // } 
            
        if (ship.travel_remaining_time > 0) {
            affectedStarship[starshipName] = true;
            ship.travel_remaining_time--;
            if (ship.travel_remaining_time === 0) {
                game.planets[ship.position].starships[starshipName] = true;
                alert("Ship " + ship.name + " has arrived in " + ship.position);
            }
            hasChanged = true;
        }
    }
    returnGame(game);

    let currentPlanet = localStorage.getItem("current_planet");
    let currentStarship = localStorage.getItem("current_starship");

    if (hasChanged){
        for (let starshipName in affectedStarship) {
            let ship = game.starships[starshipName];
            if (starshipName === currentStarship) {
                setTravelingStarshipWindow(starshipName);
            }
            if (ship.position === currentPlanet) {
                setOnePlanetWindow(currentPlanet);
            }
        }
    }
    generateGameHtml(game);
    if (hasChanged) {
        generateStarshipsHtml(game);
        generatePlanetsHtml(game);
    }
}

export function startGame(){
    let intervalId = setInterval(() => {tickTimeUnit(getGame());}, 1000);
    localStorage.setItem('intervalId', intervalId.toString());
}
export function stopGame(){
    let intervalId =  parseInt(localStorage.getItem('intervalId'));
    clearInterval(intervalId);
}


