// used to create a post request to log the users chosen character on register

// looks to be used for lots of different things, what all is this intended to go with?

//id? is for saving player character record to the DB (so it's optional)

export default interface IPlayerCharacter {
    character_id: string;
    user_id: string | undefined;
    // user_id: string | undefined;
    currenthealth: number;
    currentoffense: number;
    currentdefense: number;
    character_name?: string;
    _id?: string;

}