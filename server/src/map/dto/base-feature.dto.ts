import { Route } from "src/climbing-route/schemas/climbing-route.schema";

export class BaseFeatureDto {
  type: string;
  geometry: {
    type: string;
    coordinates: [Number];
  };
  properties: {
    featureId: string;
    name: string;
    routes: Route[];
  };
}
