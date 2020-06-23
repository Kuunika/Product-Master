import * as axios from 'axios';
import { OclConcept } from '../common/interfaces/ocl-concept.interface';
import { apiConfig } from './api.config';
import { SystemDoesNotExistException } from '../common/exceptions/system-does-not-exist.exception';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductCodeDoesNotExistException } from '../common/exceptions/product-code-does-not-exist.exception';
import { ListOfOclConcepts } from '../common/interfaces/list-of-ocl-concepts.interface';
import { ProductDoesNotExistInTheSpecifiedSystemException } from '../common/exceptions/product-does-not-exist-in-the-specified-system.exception';

export class OclClient {

    private axiosClient: axios.AxiosInstance;
    private masterRepo = process.env.MASTER_REPO;

    constructor() {
        this.axiosClient = axios.default.create(apiConfig);
    }

    async getProductFromOcl(productCode: string, system?: string, fhir?: boolean): Promise<OclConcept> {
        if (system) this.checkIfSystemExists(system);

        const productFromOcl = await this.axiosClient.get<OclConcept>(`sources/${this.masterRepo}/concepts/${productCode}?includeMappings=true`, apiConfig)
            .catch(() => { throw new ProductCodeDoesNotExistException() });

        if (system && productFromOcl) this.checkIfProductExistsInSystem(system, productFromOcl.data);

        return productFromOcl.data;

    }

    async checkIfSystemExists(system: string): Promise<void> {
        try {
            await this.axiosClient.get(`sources/${system}`, apiConfig);
        } catch (error) {
            if (error && error.response) {
                throw new SystemDoesNotExistException();
            }
        }
    }

    checkIfProductExistsInSystem(system: string, returnProductFromOCL: OclConcept): void {
        const systemsWhereProductExist = returnProductFromOCL.mappings.map(mapping => mapping.to_source_url.split('/').filter(element => element != '')[3]);
        const productExistsInSystem = systemsWhereProductExist.find(existingSystem => existingSystem === system);

        if (!productExistsInSystem) throw new ProductDoesNotExistInTheSpecifiedSystemException();

    }

    async getAllProductsFromOcl(pageNumber: number, pageSize: number): Promise<ListOfOclConcepts> {

        try {
            const productsFromOcl = await this.axiosClient.get<OclConcept[]>(`sources/${this.masterRepo}/concepts?limit=${pageSize}&page=${pageNumber}`);
            return {
                concepts: productsFromOcl.data,
                currentPage: pageNumber,
                totalNumberOfConcepts: productsFromOcl.headers.num_found,
                totalNumberOfPages: Math.ceil(productsFromOcl.headers.num_found / pageSize),
            }

        } catch (error) {
            if (error && error.response) {
                throw new HttpException('Server Error, Try Again Later', HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }
    }
}