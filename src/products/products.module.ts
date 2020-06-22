import { Module, CacheModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
