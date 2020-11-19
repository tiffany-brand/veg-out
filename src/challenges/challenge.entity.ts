import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Challenge {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column({
        type: "date"
    })
    date_started: string;

    @ManyToOne(() => User, user => user.player_one )
    
    player_one: User;

    @Column({
        type: "int",
        nullable: true
    })
    player_one_health: number;

    @Column({
        type: "int",
        nullable: true
    })
    player_one_offense: number;

    @Column({
        type: "int",
        nullable: true
    })
    player_one_defense: number;

    @Column({
        type: "int",
        nullable: true
    })
    player_one_plantTotal: number;

    @ManyToOne(() => User, user => user.player_two 
    )
    
    player_two: User;

    @Column({
        type: "int",
        nullable: true
    })
    player_two_health: number;

    @Column({
        type: "int",
        nullable: true
    })
    player_two_offense: number;

    @Column({
        type: "int",
        nullable: true
    })
    player_two_defense: number;

    @Column({
        type: "int",
        nullable: true
    })
    player_two_plantTotal: number;
    
    @Column({
        type:"datetime"
    })
    date_ending: string;
}