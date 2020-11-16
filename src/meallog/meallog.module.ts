import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeallogService } from './meallog.service';
import { MeallogController } from './meallog.controller';
import { MealLog } from './meallog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MealLog])],
  exports: [TypeOrmModule],
  providers: [MeallogService],
  controllers: [MeallogController]
})
export class MeallogModule {}
