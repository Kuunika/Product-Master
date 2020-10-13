import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { FhirProductsModule } from './fhir-products/fhir-products.module';

@Module({
  imports: [ProductsModule, FhirProductsModule],
  providers: [AppService],
})
export class AppModule {}
