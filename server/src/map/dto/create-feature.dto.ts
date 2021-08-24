import { BaseFeatureDto } from './base-feature.dto';

export class CreateFeatureDto extends BaseFeatureDto {
  properties: {
    id: string;
    name: string;
    createdAt: Date;
  };
}
