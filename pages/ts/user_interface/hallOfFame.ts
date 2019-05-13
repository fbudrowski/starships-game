
export interface PlayerScore{
    name: string,
    score: number,
}

export interface HallOfFame{
    best_players: PlayerScore[]
}

export function getHallOfFame() : HallOfFame{
    if (localStorage.getItem('hall_of_fame') === null){
        let defaultHall = {'best_players': [
            {'name': 'George Bush', 'score': 911},
            {'name': 'James Madison', 'score': 544},
            {'name': 'George Washington', 'score': 412},
            {'name': 'Brock ObamA', 'score': 54},
            {'name': 'Donald Trump', 'score': 11},
        ]};
        localStorage.setItem('hall_of_fame', JSON.stringify(defaultHall));
    }
    return JSON.parse(localStorage.getItem('hall_of_fame'));
}
export function addToHallOfFame(name: string, score: number){
    let hall = getHallOfFame();
    let new_arr = new Array<PlayerScore>(hall.best_players.length + 1);
    for (let i = 0; i < hall.best_players.length; i++){
        new_arr[i] = hall.best_players[i];
    }
    new_arr[new_arr.length - 1] = {'name': name, 'score': score};
    new_arr = new_arr.sort((score1, score2) => {return score2.score - score1.score;});
    if (new_arr.length > 10){
        let newnew_arr = new Array<PlayerScore>(10);
        for (let i = 0; i < 10; i++) {
            newnew_arr[i] = new_arr[i];
        }
        new_arr = newnew_arr;
    }
    hall.best_players = new_arr;
    localStorage.setItem('hall_of_fame', JSON.stringify(hall));
}
