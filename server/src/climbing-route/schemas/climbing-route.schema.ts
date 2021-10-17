import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Feature } from 'src/map/schemas/feature.schema';
import { Characteristic, Genre, Grade, Topology } from './climbing-route.type';

export type RouteDocument = Route & Document;

@Schema()
export class Route {
  @Prop({ type: String , required: true })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  creatorId: string;

  @Prop({ type: String, required: true })
  featureId: string;

  @Prop({ type: Types.ObjectId, ref: "Feature" })
  feature: Feature;

  @Prop({type: String})
  description: string;

  @Prop({ type: Genre })
  genre: Genre;

  @Prop({ type: Grade })
  grade: Grade;

  @Prop({ type: Characteristic })
  characteristic: Characteristic[];

  @Prop({ type: Topology })
  topology: Topology[];

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
