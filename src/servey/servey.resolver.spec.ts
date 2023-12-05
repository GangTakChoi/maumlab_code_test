import { Test, TestingModule } from '@nestjs/testing';
import { ServeyResolver } from './servey.resolver';
import { ServeyService } from './servey.service';

describe('ServeyResolver', () => {
  let resolver: ServeyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServeyResolver, ServeyService],
    }).compile();

    resolver = module.get<ServeyResolver>(ServeyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
