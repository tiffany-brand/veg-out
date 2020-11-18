import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePlayerCharacterDTO } from './dto/create-playercharacter.dto';
import { PlayerCharacter } from './playercharacter.entity';
import { PlayercharacterService } from './playercharacter.service';

@Controller('api/playercharacter')
export class PlayercharacterController {
  constructor(
    private readonly playercharacterService: PlayercharacterService,
  ) {}

  @Post()
  create(
    @Body() createplayercharacterDTO: CreatePlayerCharacterDTO,
  ): Promise<PlayerCharacter> {
    return this.playercharacterService.create(createplayercharacterDTO);
  }

  @Get()
  findAll(): Promise<PlayerCharacter[]> {
    return this.playercharacterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PlayerCharacter> {
    return this.playercharacterService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.playercharacterService.remove(id);
  }
}
