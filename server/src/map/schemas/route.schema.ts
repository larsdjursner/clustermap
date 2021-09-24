import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Characteristic, Genre, Grade, Topology } from './route.type';

export type RouteDocument = Route & Document;

@Schema()
export class Route {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Genre })
  genre: Genre;

  @Prop({ type: Grade })
  grade: Grade;

  @Prop({ type:  Characteristic })
  characteristic: Characteristic[];

  @Prop({ type: Topology })
  topology: Topology[];
}

export const RouteSchema = SchemaFactory.createForClass(Route);
