import { User } from "src/users/user.entity";



export class CreateChallengeDTO {
    date_started: string;
    player_one: User;
    player_one_health: number;
    player_one_offense: number;
    player_one_defense: number;
    player_one_plantTotal: number;
    player_two: User;
    player_two_health: number;
    player_two_offense: number;
    player_two_defense: number;
    player_two_plantTotal: number;
    date_ending: string;

}