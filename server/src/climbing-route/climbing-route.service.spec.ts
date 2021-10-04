import { Test, TestingModule } from '@nestjs/testing';
import { ClimbingRouteService } from './climbing-route.service';

describe('ClimbingRouteService', () => {
  let service: ClimbingRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimbingRouteService],
    }).compile();

    service = module.get<ClimbingRouteService>(ClimbingRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
