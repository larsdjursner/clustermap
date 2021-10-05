import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema } from './schemas/feature.schema';
import { PreauthMiddleware } from 'src/auth/preauth.middleware';
import { ClimbingRouteModule } from 'src/climbing-route/climbing-route.module';
import { Route, RouteSchema } from 'src/climbing-route/schemas/climbing-route.schema';

@Module({
  providers: [MapService],
  controllers: [MapController],
  imports: [
    MongooseModule.forFeature([
      { name: Feature.name, schema: FeatureSchema },
      { name: Route.name, schema: RouteSchema },
    ]),
  ],
})
export class MapModule {}
//  implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(PreauthMiddleware)
//       .exclude({ path: '/locations', method: RequestMethod.GET })
//       .forRoutes({ path: '*', method: RequestMethod.ALL });
//   }
// }
