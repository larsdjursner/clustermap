import { Types } from "mongoose";

export class BaseRouteDto {
  name: string;
  id: string;
  featureId: string;
  grade?: string;
  genre?: string;
  characteristics?: string[];
  topology?: string[];
}
