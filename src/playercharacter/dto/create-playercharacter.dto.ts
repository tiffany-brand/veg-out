import { CharacterChoice } from "src/characterchoices/characterchoice.entity";
import { User } from "src/users/user.entity";


export class CreatePlayerCharacterDTO {
    character: CharacterChoice;
    user: User;
    currentSTR: number;
    currentDEX: number;
    currentINT: number;
    character_name: string;
    
}