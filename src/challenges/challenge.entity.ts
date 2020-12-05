import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Challenge {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column({
        type: "date"
    })
    dateStarted: string;

    @ManyToOne(() => User, user => user.playerOne,
    {eager: true} )
    playerOne: User;


    @Column({
        type: "simple-array",
        nullable: true
    })
    playerOne_totalVeggies: string[];

    @Column({
        type: "simple-array",
        nullable: true
    })
    playerOne_uniqueVeggies: string[];

    @Column({
        type: "int",
        nullable: true
    })
    playerOne_currentMultiplier: number;

    @Column({
        type: "int",
        nullable: true
    })
    playerOne_currentScore: number;

    @ManyToOne(() => User, user => user.playerTwo 
    , {eager: true})
    playerTwo: User;

    @Column({
        type: "simple-array",
        nullable: true
    })
    playerTwo_totalVeggies: string[];

    @Column({
        type: "simple-array",
        nullable: true
    })
    playerTwo_uniqueVeggies: string[];

    @Column({
        type: "int",
        nullable: true
    })
    playerTwo_currentMultiplier: number;

    @Column({
        type: "int",
        nullable: true
    })
    playerTwo_currentScore: number;
    
    @Column({
        type:"date"
    })
    dateEnding: string;
}