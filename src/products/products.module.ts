import { Module, CacheModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { OCLModule } from 'src/ocl/ocl.module';
import { LocalProductsService } from './products.local.service';
import { LocalService } from 'src/local/local.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 43_200,
    }),
    OCLModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, LocalProductsService, LocalService],
  exports: [ProductsService],
})
export class ProductsModule { }
