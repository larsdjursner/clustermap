import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route, RouteDocument } from './schemas/climbing-route.schema';
import { v4 as uuidv4 } from 'uuid';
import { Feature, FeatureDocument } from 'src/map/schemas/feature.schema';
import { MapService } from 'src/map/map.service';
import { UpdateFeatureDto } from 'src/map/dto/update-feature.dto';

@Injectable()
export class ClimbingRouteService {
  constructor(
    @InjectModel(Route.name) private readonly routeModel: Model<RouteDocument>,
  ) {}

  async findAll(): Promise<Route[]> {
    return await this.routeModel.find().exec();
  }

  async findOne(id: string): Promise<Route> {
    return await this.routeModel.findOne({ id: id }).exec();
  }

  async findByFeatureId(id: string): Promise<Route[]> {
    const res = await this.routeModel.find({ featureId: id }).exec();
    console.log(res);
    return res;
  }

  async create(temp: CreateRouteDto): Promise<Route> {
    const dto = temp;
    dto.id = uuidv4();
    dto.createdAt = new Date();
    dto.updatedAt = new Date();

    return await new this.routeModel({ ...dto }).save();
  }

  async update(id: string, dto: UpdateRouteDto): Promise<Route> {
    console.log(dto);
    return await this.routeModel
      .findOneAndUpdate({ id: id, update: dto })
      .exec();
  }

  async delete(id: string): Promise<Route> {
    return await this.routeModel.findOneAndDelete({ id: id }).exec();
  }
}
