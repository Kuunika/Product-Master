import {
  Controller,
  Get,
  Query,
  BadGatewayException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { R4 } from '@ahryman40k/ts-fhir-types';
import { ProductsService } from 'src/products/products.service';
import { ProductsQuery } from 'src/common/interfaces/products-query.interface';
import {
  formatProductsToFhir,
  getProductSystems,
  getProductsSystems,
  formatProductToFhir,
} from 'src/common/utils/fhir/formatter';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadGatewayResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { FhirProductResponse } from 'src/common/responses/fhir-product.response.dto';

@Controller('fhir')
@ApiTags('fhir products')
export class FhirProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  @ApiOkResponse({ type: FhirProductResponse })
  @ApiBadGatewayResponse()
  @ApiOperation({ summary: 'list fhir products' })
  async getFhir(@Query() query: ProductsQuery): Promise<R4.IConceptMap> {
    try {
      const { products } = await this.service.findAll(query);

      return formatProductsToFhir(products, getProductsSystems(products));
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: FhirProductResponse })
  @ApiNotFoundResponse()
  @ApiBadGatewayResponse()
  @ApiOperation({ summary: 'get fhir product' })
  async findOne(@Param('id') id: string): Promise<R4.IConceptMap> {
    try {
      const product = await this.service.findOne(id, {});
      return formatProductToFhir(product, getProductSystems(product));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
