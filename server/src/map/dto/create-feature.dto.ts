import { BaseFeatureDto } from './base-feature.dto';

export class CreateFeatureDto extends BaseFeatureDto {
  properties: {
    featureId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    creatorId: string;
  };
}
