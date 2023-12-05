import { Test, TestingModule } from '@nestjs/testing';
import { ServeyService } from './servey.service';

describe('ServeyService', () => {
  let service: ServeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServeyService],
    }).compile();

    service = module.get<ServeyService>(ServeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
