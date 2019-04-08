function toggleStarshipsWindow(){
    let starshipsWindow = document.getElementById("starships-window");
    toggleWindow(starshipsWindow);
}

function setTravelingStarshipWindow(starship){
    alert("Starship " + starship);
}

function toggleTravelingStarshipWindow(){
    alert("Traveling window will be here");
    let me = document.getElementById("traveling-starship-window");
    alert("Me: " + me);
    let win = window;
    alert(win);
    let wpar = window.parent;
    alert(wpar);
    let travelingStarshipWindow = window.parent.document.getElementById("traveling-starship-window");
    alert("Traveling window: " + travelingStarshipWindow);
    toggleWindowFromChild(travelingStarshipWindow);
}

function onClickStarship(starship : string){
    alert("Dupe " + starship);
    toggleTravelingStarshipWindow();
    alert("Toggled");
    setTravelingStarshipWindow(starship);
}
