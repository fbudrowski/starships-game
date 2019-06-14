import * as objModel from "./objectsModel";
import { generateGameHtml, generateStarshipsHtml, generatePlanetsHtml, generateItemsHtml, untoggleWindows, generateHallOfFameHtml, setUpGame } from "./windowControllers";
import { assignOnClickTo } from "./pageGenerate";
import { toggleStarshipsWindow } from "./spaceshipsViews";
import { togglePlanetsWindow } from "./planetsViews";
import { toggleItemsWindow } from "./itemsViews";
import { submitNickname } from "./enterNickname";
import { play } from "./play";
import { initialStateString } from "./initString";

generateHallOfFameHtml();


if (!(localStorage.getItem('gameover') === "no")){


    setUpGame(initialStateString);
}


assignOnClickTo("pause-button", () => { objModel.pauseGame() });
assignOnClickTo("normal-speed-button", () => { objModel.setNormalSpeed() });
assignOnClickTo("double-speed-button", () => { objModel.setDoubleSpeed() });
assignOnClickTo("quadruple-speed-button", () => { objModel.setQuadrupleSpeed() });
assignOnClickTo("game-button", () => { untoggleWindows() });
assignOnClickTo("starships-button", () => { toggleStarshipsWindow() });
assignOnClickTo("planets-button", () => { togglePlanetsWindow() });
assignOnClickTo("items-button", () => { toggleItemsWindow() });
assignOnClickTo("submitNicknameButton", () => { submitNickname() });
assignOnClickTo("play-button", () => { play() });
assignOnClickTo("new-game-button", () => { objModel.startNewGame(); })
assignOnClickTo("play-again-button", () => { objModel.startNewGame(); })
