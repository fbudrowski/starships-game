import { getBestPrice, generateModel, Game, getGame } from './objectsModel.js'
import { initialStateString } from "./generate.js";
import { expect } from "chai";
import "mocha";


generateModel(JSON.parse(initialStateString));
let game : Game = getGame();

describe ("getBestPrice", () => {
    it ("should return lowest prices for Złoto", () => {
        let bestPrices = getBestPrice(game, "Złoto");
        expect(bestPrices.best_buy).to.equal(19);
        expect(bestPrices.best_buy_place).to.equal('Alderaan');
        expect(bestPrices.best_sell).to.equal(41);
        expect(bestPrices.best_sell_place).to.equal('Leonida');
    })
})