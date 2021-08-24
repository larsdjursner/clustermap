import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature, FeatureDocument } from './schemas/feature.schema';

@Injectable()
export class MapService {
  constructor(
    @InjectModel(Feature.name) private readonly model: Model<FeatureDocument>,
  ) {}

  async findAll(): Promise<Feature[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Feature> {
    return await this.model.findById(id).exec();
  }

  async create(dto: CreateFeatureDto): Promise<Feature> {
    const createDto = dto
    createDto.properties.createdAt = new Date();
    return await new this.model({ ...createDto }).save();
  }

  async update(id: string, dto: UpdateFeatureDto): Promise<Feature> {
    return await this.model.findByIdAndUpdate({id, dto}).exec();
  }

  async delete(id: string): Promise<Feature> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
