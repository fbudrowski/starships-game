"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
;
;
;
;
;
function generateModel(initialState) {
    let game;
    game.game_duration = initialState['game_duration'];
    game.time_passed = 0;
    game.credits = initialState['credits'];
    for (let item in initialState['items']) {
        game.items[item] = initialState['items'][item];
    }
    for (let planet in initialState['planets']) {
        let oldPlanetVal = initialState['planets'][planet];
        game.planets[planet].name = planet;
        game.planets[planet].x = oldPlanetVal.x;
        game.planets[planet].y = oldPlanetVal.y;
        game.planets[planet].starships = [];
        for (let item in oldPlanetVal.available_items) {
            let itemValue = oldPlanetVal.available_items[item];
            game.planets[planet].available_items[item].name = item;
            game.planets[planet].available_items[item].buy_price = itemValue.buy_price;
            game.planets[planet].available_items[item].sell_price = itemValue.sell_price;
            game.planets[planet].available_items[item].available = itemValue.available;
        }
    }
    for (let starship in initialState['starships']) {
        let oldStarshipVal = initialState['starships'][starship];
        game.starships[starship].name = starship;
        game.starships[starship].position = oldStarshipVal.position;
        game.starships[starship].cargo_hold_size = oldStarshipVal.cargo_hold_size;
        game.starships[starship].cargo_used = 0;
        game.starships[starship].current_x = game.planets[game.starships[starship].position].x;
        game.starships[starship].current_y = game.planets[game.starships[starship].position].y;
        game.starships[starship].travel_remaining_time = 0;
    }
    localStorage.setItem('game', JSON.stringify(game));
    alert(JSON.stringify(game));
}
exports.generateModel = generateModel;
function buyItems(game, starship, item) {
}
exports.buyItems = buyItems;
//# sourceMappingURL=objectsModel.js.map