import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CharacterChoice {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({
        type: "varchar",
        length: 45
    })
    monster_type: string;

    @Column()
    startingSTR: number;

    @Column()
    startingDEX: number;

    @Column()
    startingINT: number;

    @Column({
        type: "varchar",
        length: 255
    })
    image: string;
}
