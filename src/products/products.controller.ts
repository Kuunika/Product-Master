import { Controller, Get, Param, Query, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { ProductQuery } from 'src/common/interfaces/product-query.interface';
import { ProductsService } from './products.service';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  findAll(): Promise<void> {
    return Promise.resolve();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: ProductQuery): Promise<void> {
    return Promise.resolve();
  }
}
