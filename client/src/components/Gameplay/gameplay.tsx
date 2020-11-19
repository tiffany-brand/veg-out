function Gameplay(p1: any, p2: any){
    const player1 = p1;
    const player2 = p2;
    let winner = undefined;

    const p1attack = player1.currentattack / player2.currentdefense;
    const p2attack = player2.currentattack / player1.curentdefense;

    const p1turns = player2.currenthealth / p1attack;
    const p2turns = player1.currenthealth / p2attack;

    if (p1turns < p2turns) {
        winner = player1.character_name;
    }

    else if (p2turns > p1turns) {
        winner = player2.character_name;
    }

    else {
        winner = "It's a tie";
    }

    return winner;

}


export default Gameplay;