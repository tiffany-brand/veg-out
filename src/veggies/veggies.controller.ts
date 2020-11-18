import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateVeggieDTO } from './dto/create-veggie.dto';
import { Veggie } from './veggie.entity';
import { VeggiesService } from './veggies.service';

@Controller('api/veggies')
export class VeggiesController {
    constructor(private readonly veggiesService: VeggiesService) {}

    @Post()
    create(@Body() CreateVeggieDTO: CreateVeggieDTO): Promise<Veggie> {
        return this.veggiesService.create(CreateVeggieDTO);
    }

    @Get()
    findAll(): Promise<Veggie[]> {
      return this.veggiesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Veggie> {
      return this.veggiesService.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.veggiesService.remove(id);
    }

    @Post('/seed')
    injectSeed(): Promise<Veggie[]> {
      return this.veggiesService.injectSeed();
    }
}
