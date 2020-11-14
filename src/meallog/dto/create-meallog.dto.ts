import { User } from "src/users/user.entity";
import { Veggie } from "src/veggies/veggie.entity";

export class CreateMealLogDTO {
    date: string;
    userID: User;
    veggieID: Veggie;
}