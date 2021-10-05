import { BaseRouteDto } from 'src/climbing-route/dto/base-route.dto';
import { Route } from 'src/climbing-route/schemas/climbing-route.schema';
import { BaseFeatureDto } from './base-feature.dto';

export class CreateFeatureDto extends BaseFeatureDto {
  properties: {
    featureId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    creatorId: string;
    routes: Route[];
  };
}
