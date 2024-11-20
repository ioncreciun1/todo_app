import { Test, TestingModule } from '@nestjs/testing';
import { AuthenthicationController } from '../authenthication.controller';

describe('AuthenthicationController', () => {
  let controller: AuthenthicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenthicationController],
    }).compile();

    controller = module.get<AuthenthicationController>(AuthenthicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
