import { Injectable } from '@nestjs/common';
import { ProductQuery } from '../common/interfaces/product-query.interface';
import { ProductsQuery } from '../common/interfaces/products-query.interface';
import { ProductDto } from '../common/dtos/product.dto';
import { ProductsDto } from '../common/dtos/products.dto';
import { toProduct, toOclProducts } from '../common/utils/formatters';
import { OCLService } from 'src/ocl/ocl.service';

@Injectable()
export class ProductsService {
  constructor(private readonly oclService: OCLService) { }

  async findAll(filters: ProductsQuery): Promise<ProductsDto> {
    const products = await this.oclService.findAllProducts(filters);
    return toOclProducts(products);
  }

  async findOne(id: string, filters: ProductQuery): Promise<ProductDto> {
    const product = await this.oclService.findProductByCode(id, filters.system);
    return toProduct(product);
  }
}
