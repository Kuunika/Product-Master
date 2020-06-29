import { Module, CacheModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { OclClient } from 'src/lib/ocl/client';

@Module({
  imports: [CacheModule.register({
    ttl:43_200
  })],
  controllers: [ProductsController],
  providers: [ProductsService, OclClient]
})
export class ProductsModule { }
