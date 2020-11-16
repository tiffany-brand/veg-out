import { Test, TestingModule } from '@nestjs/testing';
import { MeallogController } from './meallog.controller';

describe('MeallogController', () => {
  let controller: MeallogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeallogController],
    }).compile();

    controller = module.get<MeallogController>(MeallogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
