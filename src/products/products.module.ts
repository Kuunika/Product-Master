import { Module, CacheModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { OclClientModule } from 'src/ocl-client/ocl-client.module';

@Module({
  imports: [CacheModule.register({
    ttl:43_200
  }), OclClientModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
