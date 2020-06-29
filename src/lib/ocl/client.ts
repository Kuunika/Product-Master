import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import { OclConcept } from '../../common/interfaces/ocl-concept.interface';
import { apiConfig } from './config';
import { ListOfOclConcepts } from '../../common/interfaces/list-of-ocl-concepts.interface';
import { ProductNotFoundException } from '../../common/exceptions/product-code-does-not-exist.exception';
import { OclClientException } from '../../common/exceptions/ocl-client.exception';
import { ProductNotFoundInSystemException } from '../../common/exceptions/product-does-not-exist-in-the-specified-system.exception';

@Injectable()
export class OclClient {
    private axiosClient: axios.AxiosInstance;
    private masterRepo = process.env.OCL_MASTER_REPO;

    constructor() {
        this.axiosClient = axios.default.create(apiConfig);
    }

    async getProductByCode(productCode: string, system?: string): Promise<OclConcept> {
        try {
            const url = this.productUrl(productCode, system);
            return (await this.axiosClient.get<OclConcept>(url, apiConfig)).data;
        } catch (error) {
            if (system) throw new ProductNotFoundInSystemException();
            else throw new ProductNotFoundException();
        }
    }

    private productUrl(code: string, src?: string): string {
        if(src) return `sources/${src}/concepts/${code}?includeMappings=true`;
        return `sources/${this.masterRepo}/concepts/${code}?includeMappings=true`;
    }

    async getProducts(pageNumber = 1, pageSize = 10): Promise<ListOfOclConcepts> {
        try {
            const productsFromOcl = await this.axiosClient.get<OclConcept[]>(`/sources/${this.masterRepo}/concepts/?limit=${pageSize}&page=${pageNumber}&includeMappings=true`);
            return {
                concepts: productsFromOcl.data,
                currentPage: pageNumber,
                totalNumberOfConcepts: productsFromOcl.headers.num_found,
                totalNumberOfPages: Math.ceil(productsFromOcl.headers.num_found / pageSize),
            }
        } catch (error) {
            throw new OclClientException();
        }
    }
}