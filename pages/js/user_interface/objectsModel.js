export { generateModel, buyItems };
;
;
;
;
;
;
;
function generateModel(initialState) {
    alert("Generating model");
    let game = { game_duration: 0, time_passed: 0, credits: 0, items: Object(), planets: Object(), starships: Object() };
    game.game_duration = initialState['game_duration'];
    game.time_passed = 0;
    game.credits = initialState['credits'];
    for (let item in initialState['items']) {
        game.items[item] = initialState['items'][item];
    }
    for (let planet in initialState['planets']) {
        let oldPlanetVal = initialState['planets'][planet];
        game.planets[planet] = {
            name: planet,
            available_items: Object(),
            x: oldPlanetVal.x,
            y: oldPlanetVal.y,
            starships: [],
        };
        for (let item in oldPlanetVal.available_items) {
            let itemValue = oldPlanetVal.available_items[item];
            game.planets[planet].available_items[item] = {
                name: item,
                buy_price: itemValue.buy_price,
                sell_price: itemValue.sell_price,
                available: itemValue.available,
            };
        }
    }
    for (let starship in initialState['starships']) {
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
        };
    }
    localStorage.setItem('game', JSON.stringify(game));
    alert(JSON.stringify(game));
}
function buyItems(game, starship, item) {
}
//# sourceMappingURL=objectsModel.js.map