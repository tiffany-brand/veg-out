import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

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
    lastAttackTime: "string";

    @OneToOne(() => User )
    @JoinColumn()
    @Column({
        nullable: true
    })
    lastAttackerID: User;

    // upon finishing the player character section, add Player one here

    // then add Player two here.

}