import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
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

    @OneToOne(() => User)
    @JoinColumn()
    userID: User;

    @OneToOne(() => Veggie)
    @JoinColumn()
    veggieID: Veggie;
}