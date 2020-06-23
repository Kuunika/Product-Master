import { Injectable } from '@nestjs/common';
import { ProductQuery } from 'src/common/interfaces/product-query.interface';
import { ProductsQuery } from 'src/common/interfaces/products-query.interface';
import { OclClientService } from 'src/ocl-client/ocl-client.service';
import { OclConcept } from 'src/common/interfaces/ocl-concept.interface';
import { ListOfOclConcepts } from 'src/common/interfaces/list-of-ocl-concepts.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly service: OclClientService) { }

  findAll(filters: ProductsQuery): Promise<ListOfOclConcepts> {
    return this.service.getProducts(filters.page, filters.pageSize);
  }

  findOne(id: string, filters: ProductQuery): Promise<OclConcept> {
    return this.service.getProductByCode(id, filters.system, filters.fhir);
  }
}
