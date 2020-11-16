import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Veggie {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  plantName: string;

  @Column({
      type: "smallint"
  })
  total_HP: number;

  @Column({
      type: "smallint"
  })
  offense: number;

  @Column({
      type: "smallint"
  })
  defense: number;

  @Column({
      type: "text"
  })
  info: string;


}