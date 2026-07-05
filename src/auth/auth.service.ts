import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { userEntity } from '../users/entities/user-entity';
import { loginEntity } from './entities/login-entity';
import { PASSWORD_NULL } from '../constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<userEntity> {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new BadRequestException(`user or password is incorrect`);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password ?? PASSWORD_NULL,
    );
    if (isPasswordValid) {
      const { password, roles, ...result } = user;
      return result;
    }

    throw new BadRequestException(`user or password is incorrect`);
  }

  async login(user: userEntity): Promise<loginEntity> {
    const { password, roles, ...result } = user;
    const payload = { name: result.name, userId: result.userId };

    return {
      ...result,
      access_token: this.jwtService.sign(payload),
    };
  }
}
