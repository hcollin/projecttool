import { Test, TestingModule } from '@nestjs/testing';
import { RoletemplateService } from './roletemplate.service';

describe('RoletemplateService', () => {
  let service: RoletemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoletemplateService],
    }).compile();

    service = module.get<RoletemplateService>(RoletemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
