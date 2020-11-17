import { PlayerCharacter } from "src/playercharacter/playercharacter.entity";
import { User } from "src/users/user.entity";



export class CreateChallengeDTO {
    date_started: string;
    player_one: PlayerCharacter;
    player_two: PlayerCharacter;
    user_one: User;
    user_two: User;
    date_ending: string;

}