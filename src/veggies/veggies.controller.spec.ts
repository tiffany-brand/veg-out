import { Test, TestingModule } from '@nestjs/testing';
import { VeggiesController } from './veggies.controller';

describe('VeggiesController', () => {
  let controller: VeggiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeggiesController],
    }).compile();

    controller = module.get<VeggiesController>(VeggiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
