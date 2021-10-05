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
import { ClimbingRouteModule } from './climbing-route/climbing-route.module';

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
    ClimbingRouteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PreauthMiddleware)
      .exclude(
        { path: '/locations', method: RequestMethod.GET },
        { path: '/locations/(.*)', method: RequestMethod.GET },
        { path: '/climbingroutes', method: RequestMethod.GET },
        { path: '/climbingroutes/(.*)', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
