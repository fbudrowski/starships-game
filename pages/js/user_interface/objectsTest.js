import { getBestPrice, generateModelOnly, buyItems, getGame, sellItems } from "./objectsModel";
import { initialStateString } from "./initString";
import { expect } from "chai";
import "mocha";
let game = generateModelOnly(JSON.parse(initialStateString));
;
describe("getBestPrice", () => {
    it("should return lowest prices for Złoto", () => {
        let bestPrices = getBestPrice(game, "Złoto");
        expect(bestPrices.best_buy).to.equal(19);
        expect(bestPrices.best_buy_place).to.equal('Alderaan');
        expect(bestPrices.best_sell).to.equal(41);
        expect(bestPrices.best_sell_place).to.equal('Leonida');
    });
    it("should return lowest prices for Murkwie", () => {
        let bestPrices = getBestPrice(game, "Murkwie");
        expect(bestPrices.best_buy).to.equal(67);
        expect(bestPrices.best_buy_place).to.equal('NowWhat');
        expect(bestPrices.best_sell).to.equal(85);
        expect(bestPrices.best_sell_place).to.equal('Leonida');
    });
});
describe("buy", () => {
    let oldCredits = game.credits;
    let oldStorage = game.planets['Alderaan'].available_items['Dwimeryt'].available;
    buyItems(game, 'Rocinante', 'Dwimeryt', 5);
    game = getGame();
    it("should decrease money", () => {
        expect(game.credits).to.equal(1984 - 5 * 12);
    });
    it("should decrease city storage", () => {
        let nowStorage = game.planets['Alderaan'].available_items['Dwimeryt'].available;
        expect(nowStorage).to.equal(oldStorage - 5);
    });
    sellItems(game, 'Rocinante', 'Dwimeryt', 1);
    it("should increase money after returning", () => {
        game = getGame();
        expect(game.credits).to.equal(1984 - 5 * 12 + 11);
    });
    it("should not allow to return more items that ship has", () => {
        let oldCredits = game.credits;
        let oldStorage = game.planets['Alderaan'].available_items['Dwimeryt'].available;
        expect(sellItems(game, 'Rocinante', 'Dwimeryt', 1)).to.equal(false);
        game = getGame();
        expect(game.credits).to.equal(oldCredits);
        expect(game.planets['Alderaan'].available_items['Dwimeryt'].available).to.equal(oldStorage);
    });
});
//# sourceMappingURL=objectsTest.js.map