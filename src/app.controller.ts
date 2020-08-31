import { Controller, Get, Param, Query, UseInterceptors, CacheInterceptor, BadGatewayException, NotFoundException } from '@nestjs/common';
import { ApiBadGatewayResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductQuery } from 'src/common/interfaces/product-query.interface';
import { ProductsService } from 'src/products/products.service';
import { ProductsQuery } from 'src/common/interfaces/products-query.interface';
import { ProductDto } from 'src/common/dtos/product.dto';
import { ProductsDto } from 'src/common/dtos/products.dto';
import { ProductNotFoundException } from 'src/common/exceptions/product-code-does-not-exist.exception';
import { ProductResponseDto } from './common/responses/product.response.dto';
import { ProductsResponseDto } from './common/responses/products.response.dto';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly service: ProductsService) { }

  @ApiOkResponse({ type: ProductsResponseDto })
  @ApiBadGatewayResponse()
  @Get()
  async findAll(@Query() query: ProductsQuery): Promise<ProductsDto> {
    try {
      return await this.service.findAll(query)
    } catch (error) {
      throw new BadGatewayException('There was a problem talking to the Product Master.');
    }
  }

  @ApiOkResponse({ type: ProductResponseDto })
  @ApiNotFoundResponse()
  @ApiBadGatewayResponse()
  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query?: ProductQuery): Promise<ProductDto> {
    try {
      return await this.service.findOne(id, query);
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw new NotFoundException()
      }

      throw new BadGatewayException('There was a problem talking to the Product Master.')
    }
  }
}