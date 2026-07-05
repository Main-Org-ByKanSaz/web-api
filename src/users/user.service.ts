import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserPattern, USER_SERVICE } from '../microservice-constant';
import { getUserByIdPayload } from './payload/get-user-by-id.dto';
import { firstValueFrom } from 'rxjs';
import { userEntity } from './entities/user-entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  async getUserById(userId: string): Promise<userEntity> {
    const payload: getUserByIdPayload = { userId };
    return firstValueFrom(
      this.userService.send<userEntity>(UserPattern.getUserById, payload),
    );
  }

  async getUserByUsername(username: string): Promise<userEntity> {
    const payload = { username };
    return firstValueFrom(
      this.userService.send(UserPattern.getUserByUsername, payload),
    );
  }

  // async createUser(): Promise<any> {
  //   const pattern = { method: 'POST', path: 'create_user' };
  //   const payload = { name: 'John Doe' };
  //   return this.userService.send(pattern, payload);
  // }

  // async updateUser(): Promise<any> {
  //   const pattern = { method: 'PUT', path: 'update_user' };
  //   const payload = { userId: 1, name: 'John Doe' };
  //   return this.userService.send(pattern, payload);
  // }

  // async deleteUser(): Promise<any> {
  //   const pattern = { method: 'DELETE', path: 'delete_user' };
  //   const payload = { userId: 1 };
  //   return this.userService.send(pattern, payload);
  // }
}
