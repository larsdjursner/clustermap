import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type FeatureDocument = Feature & Document;
@Schema()
export class Geometry {
  @Prop({ type: String, default: 'Point' })
  type: string;

  @Prop()
  coordinates: [Number];
}
const GeometrySchema = SchemaFactory.createForClass(Geometry).remove('_id');

@Schema()
export class Properties {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

@Schema()
export class Feature {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String, default: 'Feature' })
  type: string;

  @Prop({ type: GeometrySchema })
  geometry: Geometry;

  @Prop({ type: Properties })
  properties: Properties;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
