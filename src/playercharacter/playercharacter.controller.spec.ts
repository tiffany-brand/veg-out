import { Test, TestingModule } from '@nestjs/testing';
import { PlayercharacterController } from './playercharacter.controller';

describe('PlayercharacterController', () => {
  let controller: PlayercharacterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayercharacterController],
    }).compile();

    controller = module.get<PlayercharacterController>(PlayercharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
