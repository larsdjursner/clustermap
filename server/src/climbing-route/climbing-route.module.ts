import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClimbingRouteController } from './climbing-route.controller';
import { ClimbingRouteService } from './climbing-route.service';
import { Route, RouteSchema } from './schemas/climbing-route.schema';

@Module({
  controllers: [ClimbingRouteController],
  providers: [ClimbingRouteService],
  imports: [
    MongooseModule.forFeature([{ name: Route.name, schema: RouteSchema }]),
  ]
})
export class ClimbingRouteModule {}
