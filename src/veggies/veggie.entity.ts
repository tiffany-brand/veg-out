import { MealLog } from '../meallog/meallog.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Veggie {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column({
        type: "varchar", 
        unique: true
    })
    plantName: string;

    @Column({
        type: "smallint",
        default: 10
    })
    total_HP: number;

    @Column({
        type: "smallint", 
        default: 5
    })
    offense: number;

    @Column({
        type: "smallint",
        default: 5
    })
    defense: number;

    @Column({
        type: "text", 
        nullable: true
    })
    info: string;



    // Please leave column below for potential post MVP work.
    // @OneToMany(() => MealLog, meallog => meallog.veggieID)
    // meallogs: MealLog;

}