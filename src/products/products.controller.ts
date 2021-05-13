import { Controller, Get, Param, Query, UseInterceptors, CacheInterceptor, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ProductQuery } from '../common/interfaces/product-query.interface';
import { ProductsService } from './products.service';
import { ProductsQuery } from '../common/interfaces/products-query.interface';
import { ProductDto } from '../common/dtos/product.dto';
import { ProductsDto } from '../common/dtos/products.dto';
import { ProductNotFoundException } from 'src/common/exceptions/product-code-does-not-exist.exception';
import { ProductNotFoundInSystemException } from 'src/common/exceptions/product-does-not-exist-in-the-specified-system.exception';
import { ApiBadGatewayResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductsResponseDto } from 'src/common/responses/product.response.dto';
import { LocalProductsService } from './products.local.service';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private readonly service: LocalProductsService) { }

  @ApiOkResponse({ type: ProductsResponseDto })
  @ApiBadGatewayResponse()
  @Get()
  async findAll(@Query() query: ProductsQuery): Promise<ProductsDto> {
    try {
      return await this.service.findAll({ ...query, system: query?.system?.toLowerCase() });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiOkResponse({ type: ProductsResponseDto })
  @ApiNotFoundResponse()
  @ApiBadGatewayResponse()
  @Get(':id')
  async findOne(@Param('id') id: string, @Query('system') system: string): Promise<ProductDto> {
    try {
      return await this.service.findOne(id, { system: system?.toLowerCase() });
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
