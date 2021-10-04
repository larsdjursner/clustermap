import { Module } from '@nestjs/common';
import { ClimbingRouteController } from './climbing-route.controller';
import { ClimbingRouteService } from './climbing-route.service';

@Module({
  controllers: [ClimbingRouteController],
  providers: [ClimbingRouteService]
})
export class ClimbingRouteModule {}
