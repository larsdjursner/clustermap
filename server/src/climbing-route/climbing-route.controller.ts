import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClimbingRouteService } from './climbing-route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Controller('Climbingroutes')
export class ClimbingRouteController 
{

    constructor(private readonly service: ClimbingRouteService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    return await this.service.create(createRouteDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRouteDto: UpdateRouteDto
  ) {
    return await this.service.update(id, updateRouteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
