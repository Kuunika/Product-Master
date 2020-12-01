import { Module, CacheModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { OCLModule } from 'src/ocl/ocl.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 43_200,
    }),
    OCLModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
