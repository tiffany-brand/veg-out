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
        newChallenge.player_one = createchallengeDTO.player_one;
        newChallenge.player_one_health = createchallengeDTO.player_one_health;
        newChallenge.player_one_offense = createchallengeDTO.player_one_offense;
        newChallenge.player_one_defense = createchallengeDTO.player_one_defense;
        newChallenge.player_one_uniqueVeggies = createchallengeDTO.player_one_uniqueVeggies;
        newChallenge.player_two = createchallengeDTO.player_two;
        newChallenge.player_two_health = createchallengeDTO.player_two_health;
        newChallenge.player_two_offense = createchallengeDTO.player_two_offense;
        newChallenge.player_two_defense = createchallengeDTO.player_two_defense;
        newChallenge.player_two_uniqueVeggies = createchallengeDTO.player_two_uniqueVeggies;
        newChallenge.date_ending = createchallengeDTO.date_ending;

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
