import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
    
}
