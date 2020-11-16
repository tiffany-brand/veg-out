import { Test, TestingModule } from '@nestjs/testing';
import { CharacterchoicesService } from './characterchoices.service';

describe('CharacterchoicesService', () => {
  let service: CharacterchoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterchoicesService],
    }).compile();

    service = module.get<CharacterchoicesService>(CharacterchoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
