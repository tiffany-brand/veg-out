import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class MealLog {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column({
        type: "date"
    })
    date: Date;

    @Column({
        type:"varchar",
        nullable: true
    })
    mealLabel: string;

    @Column({
        type: "simple-array",
        nullable: true
    })
    mealVeggies: string[];

    @ManyToOne(() => User, user => user.mealLogs)
    user: User;



    // Perhaps the column below can be transformed into unique array post MVP?
    // @ManyToOne(() => Veggie, veggie => veggie.meallogs,
    // {eager: true})
    // veggieID: Veggie;
}