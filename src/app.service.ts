import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE_HOST') private readonly userService: ClientProxy,
  ) {}

  async getHello(): Promise<any> {
    const pattern = { method: 'GET', path: 'get_user_by_id' };
    const payload = { userId: 1 };
    return this.userService.send(pattern, payload) ?? null;
  }
}
