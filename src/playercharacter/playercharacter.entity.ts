import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CharacterChoice } from '../characterchoices/characterchoice.entity';
import { User } from '../users/user.entity';
import { Challenge } from '../challenges/challenge.entity';

@Entity()
export class PlayerCharacter {
    @PrimaryGeneratedColumn("uuid")
    _id:string;

    @OneToOne(() => CharacterChoice)
    @JoinColumn()
    character: CharacterChoice;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({
        type: "int",
        nullable: true
    })
    currenthealth: number;

    @Column({
        type: "int",
        nullable: true
    })
    currentoffense: number;

    @Column({
        type: "int",
        nullable: true
    })
    currentdefense: number;

    @Column({
        default: false
    })
    challenged: boolean;

    @Column()
    character_name: string;
    
    @OneToOne(() => Challenge, {nullable: true})
    @JoinColumn()
    current_challenge: Challenge;
    // This should be nullable
}