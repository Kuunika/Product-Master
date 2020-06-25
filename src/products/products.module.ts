import { Module, CacheModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { OclClientModule } from 'src/ocl-client/ocl-client.module';

@Module({
  imports: [CacheModule.register(), OclClientModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
