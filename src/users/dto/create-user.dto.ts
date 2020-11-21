export class CreateUserDto {
    _id: string;
    email: string;
    auth0ID: string;
    username: string;
    character_name:string;
    character_image: string;
    challenged: boolean;
    currentChallenge: number;
    currenthealth: number;
    currentoffense: number;
    currentdefense:number;
    win: number;
    loss: number;
    tie: number;
    level: number;

}