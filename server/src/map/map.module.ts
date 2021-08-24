import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema } from './schemas/feature.schema';

@Module({
  providers: [MapService],
  controllers: [MapController],
  imports: [
    MongooseModule.forFeature([{name: Feature.name, schema: FeatureSchema}])
  ]
})
export class MapModule {}
