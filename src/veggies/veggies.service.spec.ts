import { Test, TestingModule } from '@nestjs/testing';
import { VeggiesService } from './veggies.service';

describe('VeggiesService', () => {
  let service: VeggiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeggiesService],
    }).compile();

    service = module.get<VeggiesService>(VeggiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
