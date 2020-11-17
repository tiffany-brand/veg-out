import { CharacterChoice } from "src/characterchoices/characterchoice.entity";
import { User } from "src/users/user.entity";


export class CreatePlayerCharacterDTO {
    character: CharacterChoice;
    user: User;
    currenthealth: number;
    currentoffense: number;
    currentdefense: number;
    character_name: string;
    
}