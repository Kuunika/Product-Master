import { Injectable } from '@nestjs/common';
import { ProductQuery } from 'src/common/interfaces/product-query.interface';
import { ProductsQuery } from 'src/common/interfaces/products-query.interface';
import { OclClientService } from 'src/ocl-client/ocl-client.service';
import { ProductDto } from 'src/common/dtos/product.dto';
import { ProductsDto } from 'src/common/dtos/products.dto';
import { toProduct, toOclProducts } from '../common/utils/formatters';

@Injectable()
export class ProductsService {
  constructor(private readonly service: OclClientService) { }

  async findAll(filters: ProductsQuery): Promise<ProductsDto> {
    const products = await this.service.getProducts(filters.page, filters.pageSize);
    return toOclProducts(products);
  }

  async findOne(id: string, filters: ProductQuery): Promise<ProductDto> {
    const product = await this.service.getProductByCode(id, filters.system);
    return toProduct(product);
  }
}
