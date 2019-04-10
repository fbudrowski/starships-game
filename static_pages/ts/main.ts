function toggleWindow(window : HTMLElement){
    let windows = document.getElementsByClassName("change-window");
    let i = 0;
    if (window.style.display != "block"){
        for (i=0; i < windows.length; i++){
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "block";
    }
    else{
        for (i=0; i < windows.length; i++){
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "none";
    }
}function toggleWindowFromChild(window : HTMLElement){
    let windows = parent.document.getElementsByClassName("change-window");
    let i = 0;
    if (window.style.display != "block"){
        for (i=0; i < windows.length; i++){
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "block";
    }
    else{
        for (i=0; i < windows.length; i++){
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "none";
    }
}

function setGameDuration(game_duration : number){
    let container = document.getElementById("turns-total");
    container.innerText = `${game_duration}`;
}
function setCurrentTurn(current_turn : number){
    let container = document.getElementById("turns-passed");
    container.innerText = `${current_turn}`;
}
function setCredits(new_credits: number){
    let container = document.getElementById("credits");
    container.innerText = `${new_credits}`;
}


function generateGameHtml(gameData){
    setGameDuration(gameData["game_duration"]);
    setCurrentTurn(0);
    setCredits(gameData["initial_credits"]);
}

function generateItemsHtml(gameData){
    let frameDocument = (<HTMLFrameElement>document.getElementById("items-frame")).contentDocument;
    let tableBody = frameDocument.getElementById("items-table-body");
    tableBody.innerHTML = " ";
    
    for(let index in gameData["items"]){
        let newElement = frameDocument.createElement("tr");
        let oneBasedIndex : number = Number(index) + 1;
        newElement.className = "items-table-entry data-table-entry";
        newElement.innerHTML = `
        <td><i class="fas fa-boxes"></i> ${oneBasedIndex}</td>
        <td>${gameData["items"][index]}</td>
        `
        tableBody.appendChild(newElement);
    }
}

