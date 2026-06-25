import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = await app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port, async (): Promise<void> => {
    console.log(
      `Application is running on: ${await app.getUrl()} port: ${port}`,
    );
  });
}
bootstrap();
