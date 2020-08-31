import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { OclClient } from '../lib/ocl/client';

@Module({
  providers: [ProductsService, OclClient],
  exports: [ProductsService]
})
export class ProductsModule { }
