import { untoggleWindows, untoggleWindowsFromChild } from "./windowControllers.js";
import { toggleStarshipsWindow } from "./spaceshipsViews.js";
import { togglePlanetsWindow } from "./planetsViews.js";
import { toggleItemsWindow } from "./itemsViews.js";
import { play } from './play.js';
import { submitNickname } from "./enterNickname.js";
function assignOnClickTo(id, func) {
    let element = document.getElementById(id);
    if (element !== null) {
        element.onclick = func;
    }
}
assignOnClickTo("game-button", () => { untoggleWindows(); });
assignOnClickTo("starships-button", () => { toggleStarshipsWindow(); });
assignOnClickTo("planets-button", () => { togglePlanetsWindow(); });
assignOnClickTo("items-button", () => { toggleItemsWindow(); });
assignOnClickTo("submitNicknameButton", () => { submitNickname(); });
assignOnClickTo("play-button", () => { play(); });
let elems = document.getElementsByClassName("close-button");
let i = 0;
for (; i < elems.length; i++) {
    let elem = elems[i];
    elem.onclick = () => { untoggleWindowsFromChild(); };
}
;
//# sourceMappingURL=pageGenerate.js.map