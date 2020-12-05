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


    // Please leave column below for potential post MVP work.
    // @OneToMany(() => MealLog, meallog => meallog.veggieID)
    // meallogs: MealLog;

}