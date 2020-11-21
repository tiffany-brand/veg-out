import { User } from "src/users/user.entity";


export class CreateMealLogDTO {
    date: string;
    mealLabel: string;
    mealVeggies: string[];
    userID: User;
    
}