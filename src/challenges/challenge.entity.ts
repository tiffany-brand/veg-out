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

    @ManyToOne(() => User, user => user.challenger )
    
    challenger: User;

    @ManyToOne(() => User, user => user.defender)
    
    defender: User;
    
    @Column({
        type:"datetime"
    })
    date_ending: string;
}