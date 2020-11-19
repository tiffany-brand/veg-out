import { User } from "src/users/user.entity";



export class CreateChallengeDTO {
    date_started: string;
    challenger: User;
    defender: User;
    date_ending: string;

}