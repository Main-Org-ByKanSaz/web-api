import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { userEntity } from '../../users/entities/user-entity';
import { UserService } from '../../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    let user: userEntity;
    try {
      user = await this.userService.getUserById(payload.userId);
    } catch (error) {
      throw new Error(`internal server error: ${error}`);
    }

    const { password, ...result } = user;
    return result;
  }
}
