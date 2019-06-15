import * as objModel from "./objectsModel";
import { untoggleWindows, generateHallOfFameHtml, setUpGame, setMapBoxContainer } from "./windowControllers";
import { assignOnClickTo } from "./pageGenerate";
import { toggleStarshipsWindow } from "./spaceshipsViews";
import { togglePlanetsWindow } from "./planetsViews";
import { toggleItemsWindow } from "./itemsViews";
import { submitNicknameAndMap } from "./enterNickname";
import { play } from "./play";
import { initialStateString } from "./initString";
import { setHelpWindow, toggleHelpWindow } from "./helpViews";
generateHallOfFameHtml();
setMapBoxContainer();
// setUpGame(initialStateString);
if (!(localStorage.getItem('gameover') === "no")) {
    setUpGame(initialStateString);
}
assignOnClickTo("pause-button", () => { objModel.pauseGame(); });
assignOnClickTo("normal-speed-button", () => { objModel.setNormalSpeed(); });
assignOnClickTo("double-speed-button", () => { objModel.setDoubleSpeed(); });
assignOnClickTo("quadruple-speed-button", () => { objModel.setQuadrupleSpeed(); });
assignOnClickTo("game-button", () => { untoggleWindows(); });
assignOnClickTo("starships-button", () => { toggleStarshipsWindow(); });
assignOnClickTo("planets-button", () => { togglePlanetsWindow(); });
assignOnClickTo("items-button", () => { toggleItemsWindow(); });
assignOnClickTo("help-button", () => { setHelpWindow(); toggleHelpWindow(); });
assignOnClickTo("submitNicknameButton", () => { submitNicknameAndMap(); });
assignOnClickTo("play-button", () => { play(); });
assignOnClickTo("new-game-button", () => { objModel.startNewGame(); });
assignOnClickTo("play-again-button", () => { objModel.startNewGame(); });
//# sourceMappingURL=generate.js.map