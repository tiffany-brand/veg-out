import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { PlayerCharacter } from '../playercharacter/playercharacter.entity';
@Entity()
export class Challenge {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column({
        type: "date"
    })
    date_started: string;

    @OneToOne(() => PlayerCharacter)
    @JoinColumn()
    player_one: PlayerCharacter;
    
    @OneToOne(() => PlayerCharacter)
    @JoinColumn()
    player_two: PlayerCharacter;

    @OneToOne(() => User )
    @JoinColumn()
    user_one: User;

    @OneToOne(() => User)
    @JoinColumn()
    user_two: User;
    
    @Column({
        type:"datetime"
    })
    date_ending: string;
}