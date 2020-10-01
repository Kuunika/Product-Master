import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Product Master API Docs')
    .setDescription('REST API documentation for the Product Master')
    .setVersion('1.0')
    .addTag('fhir')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix(`api/${process.env.PRODUCT_MASTER_API_VERSION}`);
  await app.listen(3000);
}
bootstrap();
