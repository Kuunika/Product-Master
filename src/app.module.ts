import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OclClientModule } from './ocl-client/ocl-client.module';

@Module({
  imports: [OclClientModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
