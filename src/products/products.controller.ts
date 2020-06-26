import { Controller, Get, Param, Query, UseInterceptors, CacheInterceptor, BadGatewayException, NotFoundException } from '@nestjs/common';
import { ProductQuery } from '../common/interfaces/product-query.interface';
import { ProductsService } from './products.service';
import { ProductsQuery } from '../common/interfaces/products-query.interface';
import { ProductDto } from '../common/dtos/product.dto';
import { ProductsDto } from '../common/dtos/products.dto';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private readonly service: ProductsService) { }

  @Get()
  async findAll(@Query() query: ProductsQuery): Promise<ProductsDto> {
    try {
      return await this.service.findAll(query);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query?: ProductQuery): Promise<ProductDto> {
    try {
      return await this.service.findOne(id, query);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
