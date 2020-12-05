export default interface IUser {
    email: string;
    auth0ID: string;
    _id: string;
    nickname: string;
    challenged: boolean;
    currentChallenge: string;
    wins?: number;
    losses?: number;
    ties?: number;
    lifetimeUniqueVeggies: string[];
    lifetimeTotalVeggies: number;

}