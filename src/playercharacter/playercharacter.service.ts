import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerCharacter } from './playercharacter.entity';
import { CreatePlayerCharacterDTO } from './dto/create-playercharacter.dto';

@Injectable()
export class PlayercharacterService {
    constructor(
        @InjectRepository(PlayerCharacter)
        private readonly playercharacterrepository: Repository<PlayerCharacter>
    ) { }

    create(createplayercharacterDTO: CreatePlayerCharacterDTO): Promise<PlayerCharacter> {
        const newPlayer = new PlayerCharacter();
        newPlayer.character = createplayercharacterDTO.character;
        newPlayer.user = createplayercharacterDTO.user;
        newPlayer.currentSTR = createplayercharacterDTO.currentSTR;
        newPlayer.currentDEX = createplayercharacterDTO.currentDEX;
        newPlayer.currentINT = createplayercharacterDTO.currentINT;
        newPlayer.character_name = createplayercharacterDTO.character_name;

        return this.playercharacterrepository.save(newPlayer);
    }

    findAll(): Promise<PlayerCharacter[]> {
        return this.playercharacterrepository.find();
    }

    findOne(id: string): Promise<PlayerCharacter> {
        return this.playercharacterrepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.playercharacterrepository.delete(id);
    }
}
