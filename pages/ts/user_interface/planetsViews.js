function togglePlanetsWindow() {
    var itemsWindow = document.getElementById("planets-window");
    toggleWindow(itemsWindow);
}
function setOnePlanetWindow(planet) {
    alert("Planet " + planet);
}
function toggleOnePlanetWindow() {
    var travelingStarshipWindow = window.parent.document.getElementById("one-planet-window");
    toggleWindowFromChild(travelingStarshipWindow);
}
function onClickPlanet(planet) {
    toggleOnePlanetWindow();
    setOnePlanetWindow(planet);
}
