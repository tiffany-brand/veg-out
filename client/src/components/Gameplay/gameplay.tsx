function Gameplay(challenge:any){
    const chal = challenge
    let winner = undefined;

    const p1attack = chal.player_one_offense / chal.player_two_defense;
    const p2attack = chal.player_two_offense / chal.player_one_defense;

    const p1turns = chal.player_two_health / p1attack;
    const p2turns = chal.player_one_health / p2attack;

    if (p1turns < p2turns) {
        winner = chal.playerOne_id
    }

    else if (p2turns > p1turns) {
        winner = chal.playerTwo_id;
    }

    else {
        winner = "It's a tie";
    }

    return winner;

}


export default Gameplay;