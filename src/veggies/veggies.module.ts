import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeggiesController } from './veggies.controller';
import { VeggiesService } from './veggies.service';
import { Veggie } from './veggie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veggie])],
  exports: [TypeOrmModule],
  controllers: [VeggiesController],
  providers: [VeggiesService]
})
export class VeggiesModule {}
