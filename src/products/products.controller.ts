import { Controller, Get, Param, Query, UseInterceptors, CacheInterceptor, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ProductQuery } from '../common/interfaces/product-query.interface';
import { ProductsService } from './products.service';
import { ProductsQuery } from '../common/interfaces/products-query.interface';
import { ProductDto } from '../common/dtos/product.dto';
import { ProductsDto } from '../common/dtos/products.dto';
import { ProductNotFoundException } from 'src/common/exceptions/product-code-does-not-exist.exception';
import { ProductNotFoundInSystemException } from 'src/common/exceptions/product-does-not-exist-in-the-specified-system.exception';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private readonly service: ProductsService) { }

  @Get()
  async findAll(@Query() query: ProductsQuery): Promise<ProductsDto> {
    try {
      return await this.service.findAll(query);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query?: ProductQuery): Promise<ProductDto> {
    try {
      return await this.service.findOne(id, query);
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof ProductNotFoundInSystemException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
