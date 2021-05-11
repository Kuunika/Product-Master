import { Injectable } from '@nestjs/common';
import { ListOfOclConcepts } from 'src/common/interfaces/list-of-ocl-concepts.interface';
import { OclConcept } from 'src/common/interfaces/ocl-concept.interface';
import { ProductsQuery } from 'src/common/interfaces/products-query.interface';
import { OCLClient } from './ocl.client';

@Injectable()
export class OCLService {
  constructor(private readonly oclClient: OCLClient) {}

  findProductByCode(code: string, system?: string): Promise<OclConcept> {
    if (system) return this.oclClient.getNonMasterListProduct(code, system);
    return this.oclClient.getProductByCode(code);
  }

  findAllProducts(query: ProductsQuery): Promise<ListOfOclConcepts> {
    return this.oclClient.getProducts(query);
  }
}
