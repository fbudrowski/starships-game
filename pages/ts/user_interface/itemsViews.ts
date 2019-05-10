import { toggleWindow } from "./windowControllers.js";

export function toggleItemsWindow(){
    let itemsWindow = document.getElementById("items-window");
    toggleWindow(itemsWindow);
}


