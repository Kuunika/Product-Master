import { Controller, Get, Param, Query, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { ProductQuery } from 'src/common/interfaces/product-query.interface';
import { ProductsService } from './products.service';
import { ProductsQuery } from 'src/common/interfaces/products-query.interface';
import { OclConcept } from 'src/common/interfaces/ocl-concept.interface';
import { ListOfOclConcepts } from 'src/common/interfaces/list-of-ocl-concepts.interface';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private readonly service: ProductsService) { }

  @Get()
  findAll(@Query() query: ProductsQuery): Promise<ListOfOclConcepts> {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query?: ProductQuery): Promise<OclConcept> {
    return this.service.findOne(id, query);
  }
}
