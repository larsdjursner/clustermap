import { GenreEnum } from '../schemas/feature.schema';

export class BaseFeatureDto {
  type: string;
  geometry: {
    type: 'Point';
    coordinates: [Number];
  };
  properties: {
    id: string;
    name: string;
  };
}
