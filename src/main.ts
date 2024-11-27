import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(8080);
}
bootstrap();
