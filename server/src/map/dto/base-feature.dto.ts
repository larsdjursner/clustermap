export class BaseFeatureDto {
  // id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: [Number];
  };
  properties: {
    featureId: string;
    name: string;
  };
}
