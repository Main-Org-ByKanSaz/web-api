import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USER_SERVICE_HOST', // 👈 ชื่อ Token ที่เราจะเอาไว้เรียกใช้งาน (ตั้งอะไรก็ได้)
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001, // 👈 พอร์ตต้องตรงกับฝั่ง Microservice ที่เปิดไว้
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
