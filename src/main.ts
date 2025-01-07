import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { seedDatabase } from './seed/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API documentation for the project')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const dataSource = app.get(DataSource);

  await seedDatabase(dataSource);

  await app.listen(8080);
}

bootstrap();