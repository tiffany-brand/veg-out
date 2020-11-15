import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { Challenge } from './challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  exports: [TypeOrmModule],
  providers: [ChallengesService],
  controllers: [ChallengesController]
})
export class ChallengesModule {}
