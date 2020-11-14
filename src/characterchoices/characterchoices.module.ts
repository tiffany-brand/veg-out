import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterchoicesService } from './characterchoices.service';
import { CharacterchoicesController } from './characterchoices.controller';
import { CharacterChoice } from './characterchoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterChoice])],
  exports: [TypeOrmModule],
  providers: [CharacterchoicesService],
  controllers: [CharacterchoicesController]
})
export class CharacterchoicesModule {}
