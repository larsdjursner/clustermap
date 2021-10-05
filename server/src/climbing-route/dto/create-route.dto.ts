import { BaseRouteDto } from "./base-route.dto";

export class CreateRouteDto extends BaseRouteDto {
    createdAt: Date;
    updatedAt: Date;
    creatorId: string;
}
