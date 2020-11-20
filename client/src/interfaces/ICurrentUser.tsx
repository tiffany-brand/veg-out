
export default interface ICurrentUser {
    email?: string;
    auth0ID?: string;
    _id?: string;
    username?: string;
    character_name?: string;
    character_image?: string;
    character_id?: string;
    challenged?: boolean;
    currentChallenge?: number;
    currenthealth?: number;
    currentoffense?: number;
    currentdefense?: number;
    win?: number;
    loss?: number;
    tie?: number;
    level?: number;


}