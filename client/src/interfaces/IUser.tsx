export default interface IUser {
    email: string;
    auth0ID: string;
    _id: string;
    nickname: string;
    challenged: boolean;
    currentChallenge: string;
    win?: number;
    loss?: number;
    tie?: number;
    lifetimeUniqueVeggies?: string[];
    lifetimeTotalVeggies?: string[];

}