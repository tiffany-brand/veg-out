import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayercharacterService } from './playercharacter.service';
import { PlayercharacterController } from './playercharacter.controller';
import { PlayerCharacter } from './playercharacter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerCharacter])],
  exports: [TypeOrmModule],
  providers: [PlayercharacterService],
  controllers: [PlayercharacterController]
})
export class PlayercharacterModule {}
