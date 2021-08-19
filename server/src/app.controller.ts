import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor() {}

  @Get("/hello")
  getHello(@Req() request: Request): string {
    // return this.appService.getHello();
    return `Hello ${request['user']?.email}!`
  }
}
