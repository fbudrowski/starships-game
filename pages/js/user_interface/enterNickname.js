import { getGame, startGame, returnGame } from "./objectsModel";
import { generateGameHtml, generateItemsHtml, generateStarshipsHtml, generatePlanetsHtml } from "./windowControllers";
export function submitNickname() {
    document.getElementById('navbar').classList.add('slide-in-left');
    document.getElementById("enter-nickname-overlay").style.display = "none";
    let nickname = document.getElementById("enter-nickname-field").value;
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
    if (localStorage.getItem('gameover') === "no") {
        let nickname = sessionStorage.getItem('nickname');
        document.getElementById("nickname-button").innerText = nickname;
        returnGame(JSON.parse(localStorage.getItem('game')));
        let game = getGame();
        document.getElementById('navbar').classList.add('slide-in-left');
        generateGameHtml(game);
        generateItemsHtml(game);
        generateStarshipsHtml(game);
        generatePlanetsHtml(game);
        startGame();
    }
    else {
        document.getElementById("enter-nickname-overlay").classList.add('slide-in-top');
        document.getElementById("enter-nickname-overlay").style.display = "block";
    }
}
//# sourceMappingURL=enterNickname.js.map