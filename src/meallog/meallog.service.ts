import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { MealLog } from './meallog.entity';
import { CreateMealLogDTO } from './dto/create-meallog.dto';
import { User } from '../users/user.entity';
import { response } from 'express';
import { mealLogSeed } from './seed/mealLogSeed';


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
        newLog.user = createMealLogDTO.user;
        

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

    async findBetweenChallengeDates(userID: User, startDate: Date, endDate: Date): Promise<MealLog[]> {
        return this.meallogRepository.find({
            where: 
                {
                    user: userID,
                    date: Between(startDate, endDate)
                }
    });
    }

    injectSeed(): Promise<MealLog[]> {
        return this.meallogRepository.save(mealLogSeed);
    }
}
