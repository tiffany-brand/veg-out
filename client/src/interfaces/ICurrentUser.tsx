// used to create a post and get request for current user that is logged in

// id is optional which is causing a conflict in IPlayerCharacter where it is not optional

export default interface ICurrentUser {
    email?: string;
    auth0ID?: string;
    _id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    character_name?: string;
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