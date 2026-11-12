import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { USER_SERVICE } from '../microservice-constant';
import { redisOptions } from '../redis-options';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: USER_SERVICE,
        // Sends messages to user-service through Redis instead of a TCP port.
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: redisOptions(configService),
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
