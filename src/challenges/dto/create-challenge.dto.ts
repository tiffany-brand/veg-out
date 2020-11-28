import { User } from "src/users/user.entity";



export class CreateChallengeDTO {
    _id: string;
    dateStarted: string;
    playerOne: User;
    playerOne_totalVeggies: string[];
    playerOne_uniqueVeggies: string[];
    playerOne_currentMultiplier: number;
    playerOne_currentScore: number;
    playerTwo: User;
    playerTwo_totalVeggies: string[];
    playerTwo_uniqueVeggies: string[];
    playerTwo_currentMultiplier: number;
    playerTwo_currentScore: number;
    dateEnding: string;

}