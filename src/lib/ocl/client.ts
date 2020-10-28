import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import { OclConcept } from '../../common/interfaces/ocl-concept.interface';
import { apiConfig } from './config';
import { ListOfOclConcepts } from '../../common/interfaces/list-of-ocl-concepts.interface';
import { ProductNotFoundException } from '../../common/exceptions/product-code-does-not-exist.exception';
import { OclClientException } from '../../common/exceptions/ocl-client.exception';
import { ProductNotFoundInSystemException } from '../../common/exceptions/product-does-not-exist-in-the-specified-system.exception';
import * as qs from 'qs';
import { OCLQueryParams } from 'src/common/interfaces/ocl-query-params.interface';

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

    async getProducts(pageNumber = 1, pageSize = 10, paging = true): Promise<ListOfOclConcepts> {
        try {
            const queryParams = this.createOclRequestQueryParams(paging, pageNumber, pageSize);
            const productsFromOcl = await this.axiosClient.get<OclConcept[]>(`/sources/${this.masterRepo}/concepts/?${queryParams}`);
             
            return {
                concepts: productsFromOcl.data,
                currentPage: paging === true ? pageNumber : 1,
                totalNumberOfConcepts: paging === true ? productsFromOcl.headers.num_found : productsFromOcl.data.length,
                totalNumberOfPages: paging === true ? Math.ceil(productsFromOcl.headers.num_found / pageSize) : 1,
            }
            
        } catch (error) {
            
            throw new OclClientException();
        }
    }

    
    createOclRequestQueryParams(paging: boolean, pageNumber: number, pageSize: number){

        const requestQueyParams: OCLQueryParams = {
            includeMappings: true,
            limit: paging === true ? pageSize : 0,
        }
        
        if(paging === true) {
            requestQueyParams['page'] = pageNumber;
        }
        
        return qs.stringify(requestQueyParams);
    }
}