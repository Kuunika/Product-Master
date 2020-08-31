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
import { formatProductsToFhir } from 'src/common/utils/fhir/formatter';
import { ProductDto } from 'src/common/dtos/product.dto';

@Controller('fhir')
export class FhirProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  async getFhir(@Query() query: ProductsQuery): Promise<R4.IConceptMap> {
    try {
      const { products } = await this.service.findAll(query);

      return formatProductsToFhir(products);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<R4.IConceptMap> {
    try {
      const product = await this.service.findOne(id, {});
      return formatProductsToFhir([product] as ProductDto[]);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
