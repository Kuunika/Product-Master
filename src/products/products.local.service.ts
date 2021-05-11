import { Injectable } from '@nestjs/common';
import { ProductQuery } from '../common/interfaces/product-query.interface';
import { ProductsQuery } from '../common/interfaces/products-query.interface';
import { ProductDto } from '../common/dtos/product.dto';
import { ProductsDto } from '../common/dtos/products.dto';
import { LocalService } from '../local/local.service';
import * as _ from 'lodash';
import { ProductNotFoundException } from '../common/exceptions/product-code-does-not-exist.exception';

@Injectable()
export class LocalProductsService {
    constructor(private readonly localService: LocalService) { }

    async findAll(filters: ProductsQuery): Promise<ProductsDto> {
        const page = filters.page ?? 1;
        const chunkSize = filters.pageSize ?? 10;
        const system = filters.name;
        const products = system ? this.filterProductsBySystem(await this.localService.getProductsFromLocalFiles(), system) : await this.localService.getProductsFromLocalFiles();
        const sections = _.chunk(products, chunkSize);
        const productsDto = {
            page: page,
            products: sections[page - 1],
            totalNumberOfPages: sections.length,
            totalNumberOfProducts: products.length,
        };
        return productsDto
    }

    private filterProductsBySystem(products: ProductDto[], system: string): ProductDto[] {
        return products.reduce((acc: ProductDto[], cur) => {
            const found = cur.mappings.find(product => product.systemName == system);
            if (found) {
                return [...acc, cur]
            }
            return acc;
        }, []);
    }


    async findOne(id: string, filters: ProductQuery): Promise<ProductDto> {
        const { system } = filters;
        const products = system ? this.filterProductsBySystem(await this.localService.getProductsFromLocalFiles(), system) : await this.localService.getProductsFromLocalFiles();
        const product = products.find(p => p.productCode === id);

        if (product) return product;

        const subProducts = products.find((p) => {
            return p.mappings.find(subp => subp.systemProductCode === id);
        });

        if (subProducts) return subProducts;

        throw new ProductNotFoundException(`Product with the id of ${id} : Not Found`);
    }
}
