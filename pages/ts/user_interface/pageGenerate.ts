import { untoggleWindows, untoggleWindowsFromChild } from "./windowControllers.js";
import { toggleStarshipsWindow } from "./spaceshipsViews.js";
import { togglePlanetsWindow } from "./planetsViews.js";
import { toggleItemsWindow } from "./itemsViews.js";
import { play } from './play.js';
import { submitNickname } from "./enterNickname.js";

export function assignOnClickTo(id: string, func) {
    let element: HTMLElement = document.getElementById(id);
    if (element !== null) {
        element.onclick = func;
    }
}
// alert("Generating behaviours");
let elems = document.getElementsByClassName("close-button");
let i = 0;
for (; i < elems.length; i++){
    let elem = <HTMLElement> elems[i];
    elem.onclick = () => {untoggleWindowsFromChild() };
    // alert("elem " + elem.className + " will close on click");
};



