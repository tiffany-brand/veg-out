import { PlayerCharacter } from "src/playercharacter/playercharacter.entity";
import { User } from "src/users/user.entity";


export class CreateChallengeDTO {
    date_started: string;
    lastAttackTime: string;
    lastAttacker: User;
    player_one: PlayerCharacter;
    player_two: PlayerCharacter;

}