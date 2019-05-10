export {Item, Items, Planet, Planets, HeldItems, Starship, Starships, Game, generateModel, buyItems};

interface Item{
    name: string,
    available: number,
    buy_price: number,
    sell_price: number,
};
interface Items{
    [item_name: string]: Item,
};

interface Planet{
    name: string,
    available_items: Items,
    x: number,
    y: number,
    starships: string[],
};
interface Planets{
    [planet: string]: Planet,
};

interface HeldItems{
    [itemType: string]: number;
};

interface Starship{
    name: string
    position: string,
    cargo_hold_size: number,
    cargo_used: number,
    held_items: HeldItems,
    travel_remaining_time: number,
    current_x: number,
    current_y: number,
};

interface Starships{
    [starship: string]: Starship,
};

interface Game{
    starships: Starships,
    planets: Planets,
    items: Items,
    game_duration: number,
    time_passed: number,
    credits: number,
}

function generateModel(initialState){
    alert("Generating model");
    let game : Game = {game_duration: 0, time_passed: 0, credits: 0, items: Object(), planets: Object(), starships: Object()} ;
    game.game_duration = initialState['game_duration'];
    game.time_passed = 0;
    game.credits = initialState['credits'];
    for (let item in initialState['items']){
        game.items[item] = initialState['items'][item];
    }
    for (let planet in initialState['planets']){
        let oldPlanetVal = initialState['planets'][planet];
        game.planets[planet]= {
            name: planet,
            available_items: Object(),
            x: oldPlanetVal.x,
            y: oldPlanetVal.y,
            starships: [],
        };
        for (let item in oldPlanetVal.available_items){
            let itemValue = oldPlanetVal.available_items[item];
            game.planets[planet].available_items[item] = {
                name: item,
                buy_price: itemValue.buy_price,
                sell_price: itemValue.sell_price,
                available: itemValue.available,
            }
        }
    }
    for (let starship in initialState['starships']){
        let oldStarshipVal = initialState['starships'][starship];
        game.starships[starship] = {
            name: starship,
            position: oldStarshipVal.position,
            cargo_hold_size: oldStarshipVal.cargo_hold_size,
            cargo_used: 0,
            current_x: game.planets[oldStarshipVal.position].x,
            current_y: game.planets[oldStarshipVal.position].y,
            travel_remaining_time: 0,
            held_items: Object(),
        }
    }
    localStorage.setItem('game', JSON.stringify(game));
    alert(JSON.stringify(game));
}


function buyItems(game: Game, starship: string, item: string, ){
    
}
