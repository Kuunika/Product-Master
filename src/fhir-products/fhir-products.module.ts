import { Module } from '@nestjs/common';
import { FhirProductsController } from './fhir-products.controller';
import { ProductsService } from 'src/products/products.service';
import { OclClient } from 'src/lib/ocl/client';

@Module({
  controllers: [FhirProductsController],
  providers: [ProductsService, OclClient],
})
export class FhirProductsModule {}
