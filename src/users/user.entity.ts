import { Challenge } from '../challenges/challenge.entity';
import { MealLog } from '../meallog/meallog.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  email: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  auth0ID: string;

  @Column({
    nullable: true
  })
  nickname: string;

  @Column({
    nullable: false,
    default: false
  })
  challenged: boolean;

  @Column({
    nullable: true
  })
  currentChallenge: string;

  @Column({
    nullable: false,
    default: 0
  })
  wins: number;

  @Column({
    nullable: false,
    default: 0
  })
  losses: number;

  @Column({
    nullable: false,
    default: 0
  })
  ties: number;

  @Column({
    type: "simple-array",
    nullable: true
  })
  lifetimeUniqueVeggies: string[];

  @Column({
    type: "simple-array",
    nullable: true
  })
  lifetimeTotalVeggies: string[];

  @OneToMany(() => MealLog, meallog => meallog.user)
  mealLogs: MealLog;

  @OneToMany(() => Challenge, challenge => challenge.player_one)
  player_one: Challenge;

  @OneToMany(() => Challenge, challenge => challenge.player_two)
  player_two: Challenge;

}