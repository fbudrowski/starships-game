function togglePlanetsWindow(){
    let itemsWindow = document.getElementById("planets-window");
    toggleWindow(itemsWindow);
}
function setOnePlanetWindow(planet){
    alert("Planet " + planet);
}

function toggleOnePlanetWindow(){
    let travelingStarshipWindow = window.parent.document.getElementById("one-planet-window");
    toggleWindowFromChild(travelingStarshipWindow);
}



function onClickPlanet(planet : string){
    toggleOnePlanetWindow();
    setOnePlanetWindow(planet);
}
