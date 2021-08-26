import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import GeoJSON, {
  GeoJsonGeometryTypes,
  Geometry,
  Point,
  Position,
} from 'geojson';
import { Document } from 'mongoose';
import { Mongoose } from 'mongoose';

export type FeatureDocument = Feature & Document;

@Schema()
export class FeatureProperties {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  genre: GenreEnum[];

  @Prop()
  route?: Route[];

  @Prop({ required: true })
  createdAt: Date;
}

@Schema()
export class FeatureGeometry {
  @Prop()
  type: 'Point';

  @Prop()
  coordinates: [Number];
}

@Schema()
export class Route {
  @Prop({ required: true })
  name: string;

  @Prop()
  grade: string;

  @Prop()
  characteristics: string;
}

export enum GenreEnum {
  Bouldering,
  SportsClimbing,
  TraditionalClimbing,
}

@Schema()
export class Feature {
  @Prop()
  type: 'Feature';

  @Prop()
  geometry: FeatureGeometry;

  @Prop({ required: true })
  properties: FeatureProperties;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
