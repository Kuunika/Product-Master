import { Injectable } from '@nestjs/common';
import { ProductQuery } from '../common/interfaces/product-query.interface';
import { ProductsQuery } from '../common/interfaces/products-query.interface';
import { ProductDto } from '../common/dtos/product.dto';
import { ProductsDto } from '../common/dtos/products.dto';
import { toProduct, toOclProducts } from '../common/utils/formatters';
import { OclClient } from '../lib/ocl/client';

@Injectable()
export class ProductsService {
  constructor(private readonly client: OclClient) { }

  async findAll(filters: ProductsQuery): Promise<ProductsDto> {
    const products = await this.client.getProducts(filters);
    return toOclProducts(products);
  }

  async findOne(id: string, filters: ProductQuery): Promise<ProductDto> {
    const product = await this.client.getProductByCode(id, filters.system);
    return toProduct(product);
  }
}
