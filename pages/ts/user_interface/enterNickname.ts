
import { getGame, startGame } from "./objectsModel.js";

export function submitNickname() {
    document.getElementById("enter-nickname-overlay").style.display = "none";
    let nickname = (document.getElementById("enter-nickname-field") as HTMLInputElement).value;
    // alert("Before: " + (document.getElementById("nickname-button") as HTMLButtonElement).innerText);
    document.getElementById("nickname-button").innerText = nickname;
    // alert("Your name is " + name);
    sessionStorage.setItem('nickname', nickname);
    sessionStorage.setItem('gameover', "no");
    startGame();
}

export function requestNickname() {
    sessionStorage.setItem('gameover', 'yes');
    if (sessionStorage.getItem('gameover') === "no"){
        alert("Game not over");
        let nickname = sessionStorage.getItem('nickname');
        document.getElementById("nickname-button").innerText = nickname;
        startGame();
    } else{
        alert("Game is over");
        document.getElementById("enter-nickname-overlay").style.display = "block";
    }
}