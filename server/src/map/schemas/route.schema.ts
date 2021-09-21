import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CharacteristicEnum, GenreEnum, GradeEnum, TopologyEnum } from './route.enum';

export type RouteDocument = Route & Document;

@Schema()
export class Route {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: GenreEnum })
  genre: GenreEnum;

  @Prop({ type: GradeEnum })
  grade: GradeEnum;

  @Prop({ type: CharacteristicEnum })
  characteristic: CharacteristicEnum[];

  @Prop({ type: TopologyEnum })
  topology: TopologyEnum[];
}

export const RouteSchema = SchemaFactory.createForClass(Route);
