import { PlayerCharacter } from "src/playercharacter/playercharacter.entity";



export class CreateChallengeDTO {
    date_started: string;
    lastAttackTime: string;
    player_one: PlayerCharacter;
    player_two: PlayerCharacter;

}