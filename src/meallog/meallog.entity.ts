import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Veggie } from '../veggies/veggie.entity';
@Entity()
export class MealLog {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column({
        type: "date"
    })
    date: string;

    @ManyToOne(() => User, user => user.mealLogs)

    userID: User;

    @ManyToOne(() => Veggie, veggie => veggie.meallogs)
    veggieID: Veggie;
}