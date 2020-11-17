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

    @Column({
        type: "int",
        default: 50
    })
    startinghealth: number;

    @Column({
        type: "int",
        default: 10
    })
    startingoffense: number;

    @Column({
        type: "int",
        default: 10
    })
    startingdefense: number;

    @Column({
        type: "varchar",
        length: 255
    })
    image: string;
}
