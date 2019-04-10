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

function addTableRow(frameDocument, tableBody, tableRowHtml, classes){
    let newElement = frameDocument.createElement("tr");
    newElement.className = classes;
    newElement.innerHTML = tableRowHtml;
    tableBody.appendChild(newElement);
}

function generateItemsHtml(gameData){
    let frameDocument = (<HTMLFrameElement>document.getElementById("items-frame")).contentDocument;
    let tableBody = frameDocument.getElementById("items-table-body");
    tableBody.innerHTML = " ";
    let classes = "items-table-entry data-table-entry";
    
    for(let index in gameData["items"]){
        let oneBasedIndex : number = Number(index) + 1;
        let tableRow = `
        <td><i class="fas fa-boxes"></i> ${oneBasedIndex}</td>
        <td>${gameData["items"][index]}</td>
        `;
        addTableRow(frameDocument, tableBody, tableRow, classes);
    }
}

function generateStarshipsHtml(gameData){
    let frameDocument = (<HTMLFrameElement>document.getElementById("starships-frame")).contentDocument;
    let tableBody = frameDocument.getElementById("starships-table-body");
    let classes = "items-table-entry data-table-entry";
    tableBody.innerHTML = " ";
    let oneBasedIndex = 1;
    for(let starship in gameData["starships"]){
        let position = gameData["starships"][starship].position;
        let coords = `(${gameData["planets"]["position"].x}, ${gameData["planets"]["position"].y})`
        let capacity = gameData["starships"][starship]["cargo_hold_size"];
        let tableRow = `
        <td><i class="fas fa-rocket"></i> ${oneBasedIndex}</td>
        <td>${starship}</td>
        <td>&darr; ${position}</td>
        <td>&darr; ${coords}</td>
        <td>0/${capacity}</td>
        `;
        addTableRow(frameDocument, tableBody, tableRow, classes);
        oneBasedIndex++;
    }
}

