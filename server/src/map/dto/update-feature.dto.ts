import { Route } from 'src/climbing-route/schemas/climbing-route.schema';
import { BaseFeatureDto } from './base-feature.dto';

export class UpdateFeatureDto extends BaseFeatureDto {
  properties: {
    routes: Route[];
    featureId: string;
    name: string;
  };
}
