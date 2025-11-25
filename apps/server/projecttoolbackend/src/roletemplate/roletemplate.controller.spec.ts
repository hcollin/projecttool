import { Test, TestingModule } from '@nestjs/testing';
import { RoletemplateController } from './roletemplate.controller';

describe('RoletemplateController', () => {
  let controller: RoletemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoletemplateController],
    }).compile();

    controller = module.get<RoletemplateController>(RoletemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
