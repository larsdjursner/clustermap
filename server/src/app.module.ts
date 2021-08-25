import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreauthMiddleware } from './auth/preauth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MapModule } from './map/map.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_STRING'),
      }),
      inject: [ConfigService],
    }),
    MapModule,
  ],
})
export class AppModule {}

// @Module({
//   imports: [MapModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(PreauthMiddleware)
//       .forRoutes({ path: '*', method: RequestMethod.ALL });
//   }
// }
