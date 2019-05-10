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

interface ItemList {
    [item: string]: number,
}

interface Game {
    starships: Starships,
    planets: Planets,
    items: ItemList,
    game_duration: number,
    time_passed: number,
    credits: number,
}

function generateModel(initialState) {
    let game: Game = { game_duration: 0, time_passed: 0, credits: 0, items: Object(), planets: Object(), starships: Object() };
    game.game_duration = initialState['game_duration'];
    game.time_passed = 0;
    game.credits = initialState['initial_credits'];
    let indx = 0;

    for (let item in initialState['items']) {
        indx++;
        game.items[item] = indx;
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
                id: game.items[item],
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
    localStorage.setItem('game', JSON.stringify(game));
}


export function buyItems(game: Game, starship: string, item: string, howmany: number) {
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
        planetItems[item].sell_price * howmany > game.credits) {
        return false;
    }
    game.credits -= planetItems[item].sell_price * howmany;
    if (item in ship.held_items) {
        ship.held_items[item] += howmany;
    } else {
        ship.held_items[item] = howmany;
    }
    planetItems[item].available -= howmany;

    localStorage.setItem('game', JSON.stringify(game));
    return true;
};



export function sellItems(game: Game, starship: string, item: string, howmany: number) {
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
    if (!(item in planetItems) || (!(item in ship.held_items))) {
        return false;
    }
    game.credits += planetItems[item].buy_price * howmany;
    ship.held_items[item] -= howmany;

    planetItems[item].available += howmany;
    ship.cargo_used -= howmany;

    localStorage.setItem('game', JSON.stringify(game));
    return true;
};

function travel(game: Game, starship: string, target: string) {
    if (!(starship in game.starships) || !(target in game.planets)) {
        return false;
    }
    let ship = game.starships[starship];
    if (ship.travel_remaining_time > 0) {
        return false;
    }
    let target_coords = {
        x: game.planets[target].x,
        y: game.planets[target].y,
    };

    let distancesq = (ship.target_x - target_coords.x) * (ship.target_x - target_coords.x)
        + (ship.target_y - target_coords.y) * (ship.target_y - target_coords.y);

    let distance = Math.sqrt(distancesq);
    ship.travel_remaining_time = distance;
    ship.target_x = target_coords.x;
    ship.target_y = target_coords.y;
    ship.position = target;

    localStorage.setItem('game', JSON.stringify(game));
    return true;
}

export function getGame(): Game {
    return JSON.parse(localStorage.getItem('game'));
}

