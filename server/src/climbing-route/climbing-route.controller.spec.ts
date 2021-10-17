import { Test, TestingModule } from '@nestjs/testing';
import { ClimbingRouteController } from './climbing-route.controller';

describe('ClimbingRouteController', () => {
  let controller: ClimbingRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimbingRouteController],
    }).compile();

    controller = module.get<ClimbingRouteController>(ClimbingRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
