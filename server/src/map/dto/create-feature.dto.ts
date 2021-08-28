import { BaseFeatureDto } from './base-feature.dto';

export class CreateFeatureDto extends BaseFeatureDto {
  properties: {
    name: string;
    createdAt: Date;
  };
}
