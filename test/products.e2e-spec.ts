import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductsService } from '../src/products/products.service';
import { ProductsModule } from '../src/products/products.module';

describe('Products', () => {
  let app: INestApplication;
  const productService = { findAll: () => ['test'], findOne: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductsModule],
    })
      .overrideProvider(ProductsService)
      .useValue(productService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET products`, () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(productService.findAll());
  });

  it(`/GET a product`, () => {
    return request(app.getHttpServer())
      .get('/products/shay871671')
      .expect(200)
      .expect(productService.findOne());
  });

  afterAll(async () => {
    await app.close();
  });
});
