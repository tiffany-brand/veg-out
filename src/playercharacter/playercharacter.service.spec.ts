import { Test, TestingModule } from '@nestjs/testing';
import { PlayercharacterService } from './playercharacter.service';

describe('PlayercharacterService', () => {
  let service: PlayercharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayercharacterService],
    }).compile();

    service = module.get<PlayercharacterService>(PlayercharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
