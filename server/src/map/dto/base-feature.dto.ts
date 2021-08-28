export class BaseFeatureDto {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: [Number];
  };
  properties: {
    name: string;
  };
}
