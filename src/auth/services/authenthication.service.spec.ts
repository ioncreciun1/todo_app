import { Test, TestingModule } from '@nestjs/testing';
import { AuthenthicationService } from './authenthication.service';

describe('AuthenthicationService', () => {
  let service: AuthenthicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenthicationService],
    }).compile();

    service = module.get<AuthenthicationService>(AuthenthicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
