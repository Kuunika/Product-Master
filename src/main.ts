import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiRoot = `api/v1`;
  const apiPort = process.env.PRODUCT_MASTER_API_PORT || 3000;
  const options = new DocumentBuilder()
    .setTitle('Product Master API Docs')
    .setDescription('REST API documentation for the Product Master')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${apiRoot}/docs`, app, document);
  app.setGlobalPrefix(apiRoot);
  await app.listen(apiPort);
  console.log(`http://localhost:${apiPort}/${apiRoot}`);
}
bootstrap();
