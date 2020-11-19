import { MealLog } from '../meallog/meallog.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Veggie {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column()
    plantName: string;

    @Column({
        type: "smallint"
    })
    total_HP: number;

    @Column({
        type: "smallint"
    })
    offense: number;

    @Column({
        type: "smallint"
    })
    defense: number;

    @Column({
        type: "text"
    })
    info: string;

    @OneToMany(() => MealLog, meallog => meallog.veggieID)
    meallogs: MealLog;

}