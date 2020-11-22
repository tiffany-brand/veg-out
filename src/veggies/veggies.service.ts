import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veggie } from './veggie.entity';
import { CreateVeggieDTO } from './dto/create-veggie.dto';
import { newVeggieSeed } from './seed/newVeggieSeed';

@Injectable()
export class VeggiesService {
  constructor(
    @InjectRepository(Veggie)
    private readonly veggiesRepository: Repository<Veggie>,
  ) { }

  create(CreateVeggieDTO: CreateVeggieDTO): Promise<Veggie> {
    const veggie = new Veggie();
    veggie.plantName = CreateVeggieDTO.plantName;
    veggie.total_HP = CreateVeggieDTO.total_HP;
    veggie.offense = CreateVeggieDTO.offense;
    veggie.defense = CreateVeggieDTO.defense;
    veggie.info = CreateVeggieDTO.info;

    return this.veggiesRepository.save(veggie);
  }

  findAll(): Promise<Veggie[]> {
    return this.veggiesRepository.find();
  }

  findOne(id: string): Promise<Veggie> {
    return this.veggiesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.veggiesRepository.delete(id);
  }

  injectSeed(): Promise<Veggie[]> {
    const newSeeds = [];
    newVeggieSeed.map((veggie) => {
      newSeeds.push({"plantName": veggie});
    })
    
    return this.veggiesRepository.save(newSeeds);
  }
}
