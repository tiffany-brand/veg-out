import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  email: string;

  @Column({
    type:"varchar",
    length: 255,
    unique: true,
  })
  auth0ID: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;


}