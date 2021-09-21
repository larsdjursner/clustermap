import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloReq(email: string): string {
    return 'Hello ' + email + '!';
  }

  getHello(): string {
    return 'Hello World!';
  }
}
