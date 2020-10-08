import { Injectable, Logger } from '@nestjs/common';
import * as axios from 'axios';
import { OclConcept } from '../../common/interfaces/ocl-concept.interface';
import { apiConfig } from './config';
import { ListOfOclConcepts } from '../../common/interfaces/list-of-ocl-concepts.interface';
import { ProductNotFoundException } from '../../common/exceptions/product-code-does-not-exist.exception';
import { OclClientException } from '../../common/exceptions/ocl-client.exception';
import { ProductNotFoundInSystemException } from '../../common/exceptions/product-does-not-exist-in-the-specified-system.exception';
import { AxiosError } from 'axios';

@Injectable()
export class OclClient {
    private logger: Logger = new Logger('Product Master');
    private axiosClient: axios.AxiosInstance;
    private masterRepo = process.env.OCL_MASTER_REPO;

    constructor() {
        this.axiosClient = axios.default.create(apiConfig);
    }

    async getProductByCode(productCode: string, system?: string): Promise<OclConcept> {
        const url = this.productUrl(productCode, system);
        try {
            this.logger.debug(`Looking for ${url} in OCL.`);
            const product = (await this.axiosClient.get<OclConcept>(url, apiConfig)).data;
            this.logger.debug(`Found ${url} in OCL.`);
            return product;
        } catch (error) {
            const err = error as AxiosError;
            if (err?.response?.status == 404) {
                this.logger.error(`Can't find ${url} in OCL. ${err.response.status}.`);
                if (system) throw new ProductNotFoundInSystemException(`Product ${productCode} was not found in ${system}.`);
                else throw new ProductNotFoundException(`Product ${productCode} was not found in the Product Master.`);
            }
            this.logger.error(`Can't find ${url} in OCL. There was problem talking to OCL.`);
            throw new OclClientException(`There was a problem talking to the Product Master when finding ${productCode}.`);
        }
    }

    private productUrl(code: string, src?: string): string {
        if(src) return `sources/${src}/concepts/${code}?includeMappings=true`;
        return `sources/${this.masterRepo}/concepts/${code}?includeMappings=true`;
    }

    async getProducts(pageNumber = 1, pageSize = 10): Promise<ListOfOclConcepts> {
        try {
            this.logger.debug(`Attempting to list products in OCL.`);
            const productsFromOcl = await this.axiosClient.get<OclConcept[]>(`/sources/${this.masterRepo}/concepts/?limit=${pageSize}&page=${pageNumber}&includeMappings=true`);
            return {
                concepts: productsFromOcl.data,
                currentPage: pageNumber,
                totalNumberOfConcepts: productsFromOcl.headers.num_found,
                totalNumberOfPages: Math.ceil(productsFromOcl.headers.num_found / pageSize),
            }
        } catch (error) {
            console.log(error);
            this.logger.error(`Failed to list products in OCL. There was problem talking to OCL: ${error.message}`);
            throw new OclClientException('There was a problem listing products from the Product Master.');
        }
    }
}