import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { userSeed } from './seeds/userSeed';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.auth0ID = createUserDto.auth0ID;
    user.username = createUserDto.username;
    user.character_name = createUserDto.character_name;
    user.character_id = createUserDto.character_id;
    user.challenged = createUserDto.challenged;
    user.currentChallenge = createUserDto.currentChallenge;
    user.currenthealth = createUserDto.currenthealth;
    user.currentdefense = createUserDto.currentdefense;
    user.currentoffense = createUserDto.currentoffense;
    user.win = createUserDto.win;
    user.loss = createUserDto.loss;
    user.tie = createUserDto.tie;
    user.level = createUserDto.level;


    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  findAuth(auth0ID: string): Promise<User | void> {
    return this.usersRepository.findOne({auth0ID: auth0ID})
  }

  injectSeed(): Promise<User[]> {
    return this.usersRepository.save(userSeed);
  }

}