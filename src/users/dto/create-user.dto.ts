export class CreateUserDto {
    _id: string;
    email: string;
    auth0ID: string;
    nickname: string;
    challenged: boolean;
    currentChallenge: string;
    wins: number;
    losses: number;
    ties: number;
    lifetimeUniqueVeggies: string[];
    lifetimeTotalVeggies: number;

}