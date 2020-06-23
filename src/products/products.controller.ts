import { Controller, Get, Param, Query, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { ProductQuery } from 'src/common/interfaces/product-query.interface';
import { ProductsService } from './products.service';
import { ProductsQuery } from 'src/common/interfaces/products-query.interface';
import { ProductDto } from 'src/common/dtos/product.dto';
import { ProductsDto } from 'src/common/dtos/products.dto';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private readonly service: ProductsService) { }

  @Get()
  async findAll(@Query() query: ProductsQuery): Promise<ProductsDto> {
    return await this.service.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query?: ProductQuery): Promise<ProductDto> {
    return await this.service.findOne(id, query);
  }
}
