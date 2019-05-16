import { getBestPrice, generateModelOnly } from "./objectsModel";
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
});
//# sourceMappingURL=objectsTest.js.map