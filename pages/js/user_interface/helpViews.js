import { toggleWindow } from "./windowControllers";
import { getBestDeal } from "./objectsModel";
export function toggleHelpWindow() {
    let helpWindow = document.getElementById("help-window");
    toggleWindow(helpWindow);
}
export function setHelpWindow() {
    let frameDocument = parent.document.getElementById("help-frame").contentDocument;
    let textHelp = getBestDeal();
    let helpBody = frameDocument.getElementById("help-text");
    console.log(textHelp);
    helpBody.innerHTML = textHelp;
}
//# sourceMappingURL=helpViews.js.map