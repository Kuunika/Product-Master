import { Injectable } from '@nestjs/common';
import { ProductQuery } from 'src/common/interfaces/product-query.interface';
import { ProductsQuery } from 'src/common/interfaces/products-query.interface';
import { OclClientService } from 'src/ocl-client/ocl-client.service';
import { OclConcept, Mapping } from 'src/common/interfaces/ocl-concept.interface';
import { ListOfOclConcepts } from 'src/common/interfaces/list-of-ocl-concepts.interface';
import { ProductDto } from 'src/common/dtos/product.dto';
import { SystemProductDto } from 'src/common/dtos/system-product.dto';
import { ProductsDto } from 'src/common/dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly service: OclClientService) { }

  async findAll(filters: ProductsQuery): Promise<ProductsDto> {
    const products = await this.service.getProducts(filters.page, filters.pageSize);
    return this.toOclProducts(products);
  }

  async findOne(id: string, filters: ProductQuery): Promise<ProductDto> {
    const product = await this.service.getProductByCode(id, filters.system, filters.fhir);
    return this.toProduct(product);
  }

  private toProduct(concept: OclConcept): ProductDto {
    return {
      productCode: concept.uuid,
      productName: concept.display_name,
      mappings: concept.mappings.map(val => this.toSystemProduct(val)),
      dateCreated: new Date(concept.created_on),
      lastUpdated: new Date(concept.updated_on)
    };
  }

  private toOclProducts(concepts: ListOfOclConcepts): ProductsDto {
    return {
      page: concepts.currentPage,
      totalNumberOfPages: concepts.totalNumberOfPages,
      totalNumberOfProducts: concepts.totalNumberOfConcepts,
      products: concepts.concepts.map(val => this.toProduct(val))
    }
  }

  private toSystemProduct(map: Mapping): SystemProductDto {
    return {
      systemName: map.source,
      systemProductCode: map.external_id,
      productName: map.to_concept_name
    }
  }
}
