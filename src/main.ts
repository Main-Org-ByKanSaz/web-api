import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = await app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  const enableSwagger = configService.get<string>('ENABLE_SWAGGER') ?? null;
  if (enableSwagger) {
    const config = new DocumentBuilder()
      .setTitle('Web API Example')
      .setDescription('The Web API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port, async () => {
    console.log(`Swagger UI is enabled at ${await app.getUrl()}/docs`);
    console.log(
      `Application is running on: ${await app.getUrl()} port: ${port}`,
    );
  });
}
bootstrap();
