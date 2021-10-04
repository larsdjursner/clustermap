import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route, RouteDocument } from './schemas/climbing-route.schema';

@Injectable()
export class ClimbingRouteService {
  constructor(
    @InjectModel(Route.name) private readonly model: Model<RouteDocument>,
  ) {}

  async findAll(): Promise<Route[]> {
    return null;
  }

  async findOne(id: string): Promise<Route> {
    return null;
  }

  async create(temp: CreateRouteDto): Promise<Route> {
    return null;
  }

  async update(id: string, dto: UpdateRouteDto): Promise<Route> {
    return null;
  }

  async delete(id: string): Promise<Route> {
    return null;
  }
}
