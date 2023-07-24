import { Test, TestingModule } from '@nestjs/testing';
import { ShoolService } from './shool.service';

describe('ShoolService', () => {
  let service: ShoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoolService],
    }).compile();

    service = module.get<ShoolService>(ShoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
