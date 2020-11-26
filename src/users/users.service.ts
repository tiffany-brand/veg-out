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
  ) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user._id = createUserDto._id;
    user.email = createUserDto.email;
    user.auth0ID = createUserDto.auth0ID;
    user.nickname = createUserDto.nickname;
    user.challenged = createUserDto.challenged;
    user.currentChallenge = createUserDto.currentChallenge;
    user.wins = createUserDto.wins;
    user.losses = createUserDto.losses;
    user.ties = createUserDto.ties;
    user.lifetimeUniqueVeggies = createUserDto.lifetimeUniqueVeggies;
    user.lifetimeTotalVeggies = createUserDto.lifetimeTotalVeggies;

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
    return this.usersRepository.findOne({ auth0ID: auth0ID })
  }

  injectSeed(): Promise<User[]> {
    return this.usersRepository.save(userSeed);
  }
}
