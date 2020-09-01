import { Module } from '@nestjs/common';
import { FhirProductsController } from './fhir-products.controller';

import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [FhirProductsController],
  imports: [ProductsModule],
})
export class FhirProductsModule {}
