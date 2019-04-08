function toggleStarshipsWindow() {
    var starshipsWindow = document.getElementById("starships-window");
    toggleWindow(starshipsWindow);
}
function setTravelingStarshipWindow(starship) {
    alert("Starship " + starship);
}
function toggleTravelingStarshipWindow() {
    alert("Traveling window will be here");
    var me = document.getElementById("traveling-starship-window");
    alert("Me: " + me);
    var win = window;
    alert(win);
    var wpar = window.parent;
    alert(wpar);
    var travelingStarshipWindow = window.parent.document.getElementById("traveling-starship-window");
    alert("Traveling window: " + travelingStarshipWindow);
    toggleWindowFromChild(travelingStarshipWindow);
}
function onClickStarship(starship) {
    alert("Dupe " + starship);
    toggleTravelingStarshipWindow();
    alert("Toggled");
    setTravelingStarshipWindow(starship);
}
