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
    unique: true,
  })
  auth0ID: string;

  @Column({
    nullable: true
  })
  username: string;

  @Column({
    nullable: true
  })
  character_name: string;

  @Column({
    nullable: true
  })
  character_image: string;

  @Column({
    nullable: false,
    default: false
  })
  challenged: boolean;

  @Column({
    nullable: true
  })
  currentChallenge: number;

  @Column({
    nullable: false,
    default: 100
  })
  currenthealth: number;

  @Column({
    nullable: false,
    default: 100
  })
  currentoffense: number;

  @Column({
    nullable: false,
    default: 100
  })
  currentdefense: number;

  @Column({
    nullable: false,
    default: 0
  })
  win: number;

  @Column({
    nullable: false,
    default: 0
  })
  loss: number;

  @Column({
    nullable: false,
    default: 0
  })
  tie: number;

  @Column({
    nullable: false,
    default: 1
  })
  level: number;

  @OneToMany(() => MealLog, meallog => meallog.userID)
  mealLogs: MealLog;

  @OneToMany(() => Challenge, challenge => challenge.player_one)
  player_one: Challenge;

  @OneToMany(() => Challenge, challenge => challenge.player_two)
  player_two: Challenge;

}