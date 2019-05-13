
import { getGame, startGame, returnGame } from "./objectsModel.js";
import { generateGameHtml, generateItemsHtml, generateStarshipsHtml, generatePlanetsHtml } from "./windowControllers.js";

export function submitNickname() {
    document.getElementById("enter-nickname-overlay").style.display = "none";
    let nickname = (document.getElementById("enter-nickname-field") as HTMLInputElement).value;
    // alert("Before: " + (document.getElementById("nickname-button") as HTMLButtonElement).innerText);
    document.getElementById("nickname-button").innerText = nickname;
    // alert("Your name is " + name);
    sessionStorage.setItem('nickname', nickname);
    sessionStorage.setItem('gameover', "no");
    localStorage.setItem('gameover', "no");
    startGame();
}

export function requestNickname() {
    // sessionStorage.setItem('gameover', 'yes');
    if (localStorage.getItem('gameover') === "no"){
        let nickname = sessionStorage.getItem('nickname');
        document.getElementById("nickname-button").innerText = nickname;
        returnGame(JSON.parse(localStorage.getItem('game')));
        let game = getGame();

        generateGameHtml(game);
        generateItemsHtml(game);
        generateStarshipsHtml(game);
        generatePlanetsHtml(game);
        startGame();
    } else{
        document.getElementById("enter-nickname-overlay").style.display = "block";
    }
}
