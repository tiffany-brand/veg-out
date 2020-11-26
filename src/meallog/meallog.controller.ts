import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { User } from '../users/user.entity';
import { CreateMealLogDTO } from './dto/create-meallog.dto';
import { MealLog } from './meallog.entity';
import { MeallogService } from './meallog.service';

@Controller('api/meallog')
export class MeallogController {
    constructor(private readonly meallogservice: MeallogService) {}

    @Post()
    create(@Body() createmeallogdto: CreateMealLogDTO): Promise<MealLog> {
        return this.meallogservice.create(createmeallogdto);
    }

    @Get()
    findAll(): Promise<MealLog[]> {
        return this.meallogservice.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string): Promise<MealLog> {
        return this.meallogservice.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.meallogservice.remove(id);
    }

    @Post('/dates')
   findBetweenChallengeDates(@Body('userID') userID: User, @Body('startDate') startDate: Date, @Body('endDate') endDate: Date): Promise<MealLog[]> {
        return this.meallogservice.findBetweenChallengeDates(userID, startDate, endDate);
    }

    @Post('/seed')
    injectSeed(): Promise<MealLog[]> {
        return this.meallogservice.injectSeed();
    }
    
}
