import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    CacheModule.register({
      ttl:43_200
    }),
    ProductsModule
  ],
  controllers: [AppController]
})

export class AppModule {}
