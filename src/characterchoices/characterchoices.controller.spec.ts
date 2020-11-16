import { Test, TestingModule } from '@nestjs/testing';
import { CharacterchoicesController } from './characterchoices.controller';

describe('CharacterchoicesController', () => {
  let controller: CharacterchoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterchoicesController],
    }).compile();

    controller = module.get<CharacterchoicesController>(CharacterchoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
