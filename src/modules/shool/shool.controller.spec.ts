import { Test, TestingModule } from '@nestjs/testing';
import { ShoolController } from './shool.controller';

describe('ShoolController', () => {
  let controller: ShoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoolController],
    }).compile();

    controller = module.get<ShoolController>(ShoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
