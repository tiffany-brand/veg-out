import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './challenge.entity';
import { CreateChallengeDTO } from './dto/create-challenge.dto'


@Injectable()
export class ChallengesService {
    constructor(
        @InjectRepository(Challenge)
        private readonly challengeRepository: Repository<Challenge>
    ) { }

    create(createchallengeDTO: CreateChallengeDTO): Promise<Challenge> {
        const newChallenge = new Challenge();
        newChallenge.date_started = createchallengeDTO.date_started;
        newChallenge.lastAttackTime = createchallengeDTO.lastAttackTime;
        newChallenge.player_one = createchallengeDTO.player_one;
        newChallenge.player_two = createchallengeDTO.player_two;

        return this.challengeRepository.save(newChallenge);
    }
    findAll(): Promise<Challenge[]> {
        return this.challengeRepository.find();
    }

    findOne(id: string): Promise<Challenge> {
        return this.challengeRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.challengeRepository.delete(id);
    }
}
