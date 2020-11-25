export default interface IChallenge {

    dateStarted: string;
    playerOne: string;
    playerTwo: string;
    dateEnding: string;
    playerOne_totalVeggies: string[];
    playerOne_uniqueVeggies: string[];
    playerOne_currentMultiplier: number;
    playerOne_currentScore: number;
    playerTwo_totalVeggies: string[];
    playerTwo_uniqueVeggies: string[];
    playerTwo_currentMultiplier: number;
    playerTwo_currentScore: number;
}