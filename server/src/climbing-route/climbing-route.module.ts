import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MapService } from 'src/map/map.service';
import { Feature, FeatureSchema } from 'src/map/schemas/feature.schema';
import { ClimbingRouteController } from './climbing-route.controller';
import { ClimbingRouteService } from './climbing-route.service';
import { Route, RouteSchema } from './schemas/climbing-route.schema';

@Module({
  controllers: [ClimbingRouteController],
  providers: [ClimbingRouteService],
  imports: [
    MongooseModule.forFeature([
      { name: Route.name, schema: RouteSchema },
      { name: Feature.name, schema: FeatureSchema },
    ]),
  ],
})
export class ClimbingRouteModule {}
