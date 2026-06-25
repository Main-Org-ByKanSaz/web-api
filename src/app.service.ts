import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! port: ' + process.env.TEST_ENV;
  }
}
