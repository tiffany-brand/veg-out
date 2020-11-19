export default interface ICurrentUser {
    email?: string;
    auth0ID?: string;
    _id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    character_id?: string;
    currentChallenge?: string;
    challenged?: true;
    currenthealth?: number;
    currentoffense?: number;
    currentdefense?: number;
    win?: number;
    loss?: number;
    tie?: number;
    level?: number;

}