import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateChallengeDTO } from './dto/create-challenge.dto';
import { Challenge } from './challenge.entity';
import { ChallengesService } from './challenges.service';

@Controller('api/challenges')
export class ChallengesController {
    constructor(private readonly challengeService: ChallengesService) {}

    @Post()
    create(@Body() createchallengeDTO: CreateChallengeDTO): Promise<Challenge> {
        return this.challengeService.create(createchallengeDTO);
    }

    @Get()
    findAll(): Promise<Challenge[]> {
      return this.challengeService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Challenge> {
      return this.challengeService.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.challengeService.remove(id);
    }
}
