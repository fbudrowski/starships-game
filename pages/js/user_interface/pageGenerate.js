import { untoggleWindowsFromChild } from "./windowControllers";
export function assignOnClickTo(id, func) {
    let element = document.getElementById(id);
    if (element !== null) {
        element.onclick = func;
    }
}
// alert("Generating behaviours");
let elems = document.getElementsByClassName("close-button");
let i = 0;
for (; i < elems.length; i++) {
    let elem = elems[i];
    elem.onclick = () => { untoggleWindowsFromChild(); };
    // alert("elem " + elem.className + " will close on click");
}
;
//# sourceMappingURL=pageGenerate.js.map