import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route, RouteDocument } from './schemas/climbing-route.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClimbingRouteService {
  constructor(
    @InjectModel(Route.name) private readonly model: Model<RouteDocument>,
  ) {}

  async findAll(): Promise<Route[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Route> {
    return await this.model.findOne({ id: id }).exec();
  }

  async create(temp: CreateRouteDto): Promise<Route> {
    const dto = temp;
    dto.id = uuidv4();
    dto.createdAt = new Date();
    dto.updatedAt = new Date();
    
    console.log(dto);
    return await new this.model({ ...dto }).save();
  }

  async update(id: string, dto: UpdateRouteDto): Promise<Route> {
    console.log(dto);
    return await this.model.findOneAndUpdate({ id: id, update: dto }).exec();
  }

  async delete(id: string): Promise<Route> {
    return await this.model.findOneAndDelete({ id: id }).exec();
  }
}
