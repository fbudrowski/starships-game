function toggleStarshipsWindow() {
    var starshipsWindow = document.getElementById("starships-window");
    toggleWindow(starshipsWindow);
}
function setTravelingStarshipWindow(starship) {
    alert("Starship " + starship);
}
function toggleTravelingStarshipWindow() {
    var travelingStarshipWindow = window.parent.document.getElementById("traveling-starship-window");
    toggleWindowFromChild(travelingStarshipWindow);
}
function onClickStarship(starship) {
    toggleTravelingStarshipWindow();
    setTravelingStarshipWindow(starship);
}
