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

@Module({
  providers: [MapService],
  controllers: [MapController],
  imports: [
    MongooseModule.forFeature([{ name: Feature.name, schema: FeatureSchema }]),
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
