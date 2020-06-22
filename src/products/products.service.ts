import { Injectable } from '@nestjs/common';
import { ProductsDto } from 'src/common/dtos/products.dto';
import { ProductQuery } from 'src/common/interfaces/product-query.interface';
import { ProductDto } from 'src/common/dtos/product.dto';
import { ProductsQuery } from 'src/common/interfaces/products-query.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly client: OclClient) { }

  findAll(filters: ProductsQuery): Promise<ProductsDto> {
    return this.client.findAll(filters);
  }

  findOne(id: string, filters: ProductQuery): Promise<ProductDto> {
    return this.client.findOne(id, filters);
  }
}

@Injectable()
export class OclClient {
  findAll(filters: ProductsQuery): Promise<ProductsDto> {
    return Promise.resolve({
      page: 1,
      pageSize: 10,
      totalPages: 20,
      products: [
        {
          productCode: 'XXXX',
          productName: 'XXXX',
          mappings: [
            {
              systemName: 'XXXX',
              systemProductCode: 'XXXX',
              productName: 'XXXX'
            }
          ],
          dateCreated: new Date(),
          lastUpdated: new Date()
        }
      ]
    });
  }

  findOne(id: string, filters: ProductQuery): Promise<ProductDto> {
    return Promise.resolve({
      productCode: 'XXXX',
      productName: 'XXXX',
      mappings: [
        {
          systemName: 'XXXX',
          systemProductCode: 'XXXX',
          productName: 'XXXX'
        }
      ],
      dateCreated: new Date(),
      lastUpdated: new Date()
    })
  }
} 
