
import { getGame, startGame, returnGame } from "./objectsModel";
import { generateGameHtml, generateItemsHtml, generateStarshipsHtml, generatePlanetsHtml, setUpGame } from "./windowControllers";
import { initialStateString } from "./initString";

export function submitNicknameAndMap() {
    document.getElementById('navbar').classList.add('slide-in-left');
    document.getElementById("enter-nickname-overlay").style.display = "none";
    let nickname = (document.getElementById("enter-nickname-field") as HTMLInputElement).value;
    // alert("Before: " + (document.getElementById("nickname-button") as HTMLButtonElement).innerText);
    let maps = document.getElementsByClassName('map-box-checker');
    let mapName = '';
    for (let mapId in maps) {
        let map = maps[mapId];
        if (map['checked']) {
            let mapNameWithTitle: string = map.id;
            mapName = mapNameWithTitle.slice(8);
            // ("Map name " + mapNameWithTitle);
            // console.log("Finally map " + mapName);
        }
    }
    // console.log(mapName);

    document.getElementById("nickname-button").innerText = nickname;
    // alert("Your name is " + name);
    sessionStorage.setItem('nickname', nickname);
    sessionStorage.setItem('gameover', "no");
    localStorage.setItem('gameover', "no");
    
    let fileName = mapName + '.json';
    let proxy = 'https://cors-anywhere.herokuapp.com/',
        target = 'https://aqueous-lake-83440.herokuapp.com/states/' + fileName;
    // console.log("Target: " + target);

    let initialStateStringNew = "";
    fetch(proxy + target).then((receivedValue) => {
        let bodyVal: ReadableStream = receivedValue.body;
        let reader = bodyVal.getReader();
        reader.read().then(function processText({ done, value }) {
            if (done) {
                // console.log("Received data");
                // console.log(initialStateStringNew);
                setUpGame(initialStateStringNew);
                startGame();
                return;
            }

            let decoded = new TextDecoder("utf-8").decode(value);
            initialStateStringNew += decoded;
            return reader.read().then(processText);
        });

    });

    // startGame();
}

export function requestNickname() {
    // localStorage.setItem('gameover', 'yes');
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
    } else {
        document.getElementById("enter-nickname-overlay").classList.add('slide-in-top');
        document.getElementById("enter-nickname-overlay").style.display = "block";
    }
}
