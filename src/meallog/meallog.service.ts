import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealLog } from './meallog.entity';
import { CreateMealLogDTO } from './dto/create-meallog.dto';


@Injectable()
export class MeallogService {
    constructor(
        @InjectRepository(MealLog)
        private readonly meallogRepository: Repository<MealLog>
    ) { }

    create(createMealLogDTO: CreateMealLogDTO): Promise<MealLog> {
        const newLog = new MealLog();
        newLog._id = createMealLogDTO._id;
        newLog.date = createMealLogDTO.date;
        newLog.mealLabel = createMealLogDTO.mealLabel;
        newLog.mealVeggies = createMealLogDTO.mealVeggies;
        newLog.userID = createMealLogDTO.userID;
        

        return this.meallogRepository.save(newLog);
    }

    findAll(): Promise<MealLog[]> {
        return this.meallogRepository.find();
    }

    findOne(id: string): Promise<MealLog> {
        return this.meallogRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.meallogRepository.delete(id);
    }
}
