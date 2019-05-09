function toggleStarshipsWindow() {
    let starshipsWindow = document.getElementById("starships-window");
    toggleWindow(starshipsWindow);
}
function setTravelingStarshipWindow(starship) {
    alert("Starship " + starship);
}
function toggleTravelingStarshipWindow() {
    let travelingStarshipWindow = window.parent.document.getElementById("traveling-starship-window");
    toggleWindowFromChild(travelingStarshipWindow);
}
function onClickStarship(starship) {
    toggleTravelingStarshipWindow();
    setTravelingStarshipWindow(starship);
}
//# sourceMappingURL=spaceshipsViews.js.map