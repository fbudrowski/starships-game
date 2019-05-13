import { startGame } from "./objectsModel.js";
export function submitNickname() {
    document.getElementById("enter-nickname-overlay").style.display = "none";
    let nickname = document.getElementById("enter-nickname-field").value;
    // alert("Before: " + (document.getElementById("nickname-button") as HTMLButtonElement).innerText);
    document.getElementById("nickname-button").innerText = nickname;
    // alert("Your name is " + name);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('gameover', "no");
    startGame();
}
export function requestNickname() {
    localStorage.setItem('gameover', 'yes');
    if (localStorage.getItem('gameover') === "no") {
        alert("Game not over");
        let nickname = localStorage.getItem('nickname');
        document.getElementById("nickname-button").innerText = nickname;
        startGame();
    }
    else {
        alert("Game is over");
        document.getElementById("enter-nickname-overlay").style.display = "block";
    }
}
//# sourceMappingURL=enterNickname.js.map