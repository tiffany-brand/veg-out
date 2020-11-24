import { User } from "src/users/user.entity";


export class CreateMealLogDTO {
    _id: string;
    date: string;
    mealLabel: string;
    mealVeggies: string[];
    user: User;
    
}