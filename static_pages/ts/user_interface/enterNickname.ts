function submitNickname() {
    document.getElementById("enter-nickname-overlay").style.display = "none";
    let name = (document.getElementById("enter-nickname-field") as HTMLInputElement).value;
    // alert("Before: " + (document.getElementById("nickname-button") as HTMLButtonElement).innerText);
    document.getElementById("nickname-button").innerText = name;
    // alert("Your name is " + name);
}

function requestNickname() {
    document.getElementById("enter-nickname-overlay").style.display = "block";
}