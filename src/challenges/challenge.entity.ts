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

    @Column({
        type: "datetime",
        nullable: true
    })
    lastAttackTime: string;

    @OneToOne(() => User, {nullable: true} )
    @JoinColumn()
    lastAttacker: User;
    // this should be nullable

    @OneToOne(() => PlayerCharacter)
    @JoinColumn()
    player_one: PlayerCharacter;
    
    @OneToOne(() => PlayerCharacter)
    @JoinColumn()
    player_two: PlayerCharacter;
    

}