import { toggleWindowFromChild, toggleWindow } from "./windowControllers.js";

export function togglePlanetsWindow(){
    let itemsWindow = document.getElementById("planets-window");
    toggleWindow(itemsWindow);
}
export function setOnePlanetWindow(planet){
    alert("Planet " + planet);
}

export function toggleOnePlanetWindow(){
    let travelingStarshipWindow = window.parent.document.getElementById("one-planet-window");
    toggleWindowFromChild(travelingStarshipWindow);
}



export function onClickPlanet(planet : string){
    toggleOnePlanetWindow();
    setOnePlanetWindow(planet);
}
