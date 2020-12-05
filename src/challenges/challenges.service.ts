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
        newChallenge._id = createchallengeDTO._id;
        newChallenge.dateStarted = createchallengeDTO.dateStarted;
        newChallenge.playerOne = createchallengeDTO.playerOne;
        newChallenge.playerOne_totalVeggies = createchallengeDTO.playerOne_totalVeggies;
        newChallenge.playerOne_uniqueVeggies = createchallengeDTO.playerOne_uniqueVeggies;
        newChallenge.playerOne_currentMultiplier = createchallengeDTO.playerOne_currentMultiplier;
        newChallenge.playerOne_currentScore = createchallengeDTO.playerOne_currentScore;
        newChallenge.playerTwo = createchallengeDTO.playerTwo;
        newChallenge.playerTwo_totalVeggies = createchallengeDTO.playerTwo_totalVeggies;
        newChallenge.playerTwo_uniqueVeggies = createchallengeDTO.playerTwo_uniqueVeggies;
        newChallenge.playerTwo_currentMultiplier = createchallengeDTO.playerTwo_currentMultiplier;
        newChallenge.playerTwo_currentScore = createchallengeDTO.playerTwo_currentScore;
        newChallenge.dateEnding = createchallengeDTO.dateEnding;

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
