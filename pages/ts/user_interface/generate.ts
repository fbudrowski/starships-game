import * as objModel from "./objectsModel";
import { generateGameHtml, generateStarshipsHtml, generatePlanetsHtml, generateItemsHtml, untoggleWindows, generateHallOfFameHtml } from "./windowControllers";
import { assignOnClickTo } from "./pageGenerate";
import { toggleStarshipsWindow } from "./spaceshipsViews";
import { togglePlanetsWindow } from "./planetsViews";
import { toggleItemsWindow } from "./itemsViews";
import { submitNickname } from "./enterNickname";
import { play } from "./play";
import { initialStateString } from "./initString";

generateHallOfFameHtml();


if (!(localStorage.getItem('gameover') === "no")){

    let initialState = JSON.parse(initialStateString);
    objModel.generateModel(initialState);
    let model = objModel.getGame();
    
    // alert("Generating game");
    generateGameHtml(model);
    // alert("Generating items");
    generateItemsHtml(model);
    // alert("Generating starships");
    generateStarshipsHtml(model);
    // alert("Generating planets");
    generatePlanetsHtml(model);
    // alert("Generated all");
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
