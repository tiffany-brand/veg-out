import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCharacterChoiceDTO } from './dto/create-characterchoice.dto';
import { CharacterChoice } from './characterchoice.entity';
import { CharacterchoicesService } from './characterchoices.service';

@Controller('api/characterchoices')
export class CharacterchoicesController {
    constructor(private readonly characterchoiceservice: CharacterchoicesService) {}

    @Post()
    create(@Body() createcharacterchoiceDTO: CreateCharacterChoiceDTO): Promise<CharacterChoice> {
        return this.characterchoiceservice.create(createcharacterchoiceDTO);
    }

    @Get()
    findAll(): Promise<CharacterChoice[]> {
        return this.characterchoiceservice.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<CharacterChoice> {
        return this.characterchoiceservice.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string ): Promise<void> {
        return this.characterchoiceservice.remove(id);
    }
}
