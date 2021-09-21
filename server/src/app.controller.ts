import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // constructor() {}

  @Get("/helloreq")
  getHelloReq(@Req() request: Request): string {
    return this.appService.getHelloReq(request['user']);
    // return `Hello ${request['user']?.email}!`
  }

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }
}
