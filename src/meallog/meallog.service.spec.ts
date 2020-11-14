import { Test, TestingModule } from '@nestjs/testing';
import { MeallogService } from './meallog.service';

describe('MeallogService', () => {
  let service: MeallogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeallogService],
    }).compile();

    service = module.get<MeallogService>(MeallogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
