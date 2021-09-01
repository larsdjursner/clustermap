import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature, FeatureDocument } from './schemas/feature.schema';
import {v4 as uuidv4} from "uuid"


@Injectable()
export class MapService {
  constructor(
    @InjectModel(Feature.name) private readonly model: Model<FeatureDocument>,
  ) {}

  async findAll(): Promise<Feature[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Feature> {
    return await this.model.findOne({id: id}).exec();
  }

  async create(dto: CreateFeatureDto): Promise<Feature> {
    const createDto = dto
    createDto.properties.createdAt = new Date();
    createDto.id = uuidv4();
    return await new this.model({ ...createDto }).save();
  }

  async update(id: string, dto: UpdateFeatureDto): Promise<Feature> {
    return await this.model.findOneAndUpdate({id: id, update: dto}).exec();
  }

  async delete(id: string): Promise<Feature> {
    return await this.model.findOneAndDelete({id: id}).exec()
  }

}
