
let initialStateString = `{
    "items": [
        "Nuka-Cola",
        "Piasek",
        "Ziemniaki",
        "Złoto"
    ],
    "planets": {
        "Ziemia": {
            "x": 0,
            "y": 0,
            "available_items": {
                "Ziemniaki": {
                    "available": 15002900,
                    "buy_price": 2900,
                    "sell_price": 1500
                },
                "Piasek": {
                    "available": 0,
                    "buy_price": 44,
                    "sell_price": 32
                }
            }
        }
    },
    "starships": {
        "Rocinante": {
            "position": "Ziemia",
            "cargo_hold_size": 128
        }
    },
    "game_duration": 1000,
    "initial_credits": 1
}`;
let initialState = JSON.parse(initialStateString);
generateGameHtml(initialState);
generateItemsHtml(initialState);