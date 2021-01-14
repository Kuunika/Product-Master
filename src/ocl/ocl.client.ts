import { Inject, Injectable } from '@nestjs/common';
import * as axios from 'axios';
import { AxiosError } from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OclConcept } from '../common/interfaces/ocl-concept.interface';
import { apiConfig } from './ocl.config';
import { ListOfOclConcepts } from '../common/interfaces/list-of-ocl-concepts.interface';
import { ProductsQuery } from 'src/common/interfaces/products-query.interface';
import { OclMappingsSearchResult } from 'src/common/interfaces/ocl-mappings-search-result';
import {
  OclClientException,
  ProductNotFoundException,
  ProductNotFoundInSystemException,
} from '../common/exceptions';

@Injectable()
export class OCLClient {
  private axiosClient: axios.AxiosInstance;
  private masterRepo = process.env.OCL_MASTER_REPO;
  private oclOrg = process.env.OCL_ORG;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.axiosClient = axios.default.create(apiConfig);
  }

  async getProductByCode(productCode: string): Promise<OclConcept> {
    const url = this.productUrl(productCode);
    try {
      this.logger.info(`Looking for ${url} in OCL.`);
      const product = (await this.axiosClient.get<OclConcept>(url, apiConfig))
        .data;
      this.logger.info(`Found ${url} in OCL.`);

      return product;
    } catch (error) {
      this.axiosErrorHandling(error, url, productCode);
    }
  }

  async getNonMasterListProduct(
    productCode: string,
    system: string,
  ): Promise<OclConcept> {
    const url = this.getSystemMappingUrl(productCode);
    console.log(url);
    try {
      const searchResults = await (
        await this.axiosClient.get<OclMappingsSearchResult[]>(url)
      ).data;
      if (searchResults.length === 1) {
        const product = searchResults[0];
        return this.getProductByCode(product.from_concept_code);
      }
    } catch (error) {
      this.axiosErrorHandling(error, url, system, productCode);
    }
  }

  private getSystemMappingUrl(productCode: string) {
    return `sources/${this.masterRepo}/mappings/?q=${productCode}`;
  }

  private productUrl(code: string): string {
    return `sources/${this.masterRepo}/concepts/${code}?includeMappings=true`;
  }

  private axiosErrorHandling(
    error: any,
    url: string,
    productCode: string,
    system?: string,
  ) {
    const err = error as AxiosError;
    if (err?.response?.status == 404) {
      this.logger.error(`Can't find ${url} in OCL. ${err.response.status}.`);
      if (system)
        throw new ProductNotFoundInSystemException(
          `Product ${productCode} was not found in ${system}.`,
        );
      else
        throw new ProductNotFoundException(
          `Product ${productCode} was not found in the Product Master.`,
        );
    }
    this.logger.error(
      `Can't find ${url} in OCL. There was problem talking to OCL.`,
    );
    throw new OclClientException(
      `There was a problem talking to the Product Master when finding ${productCode}.`,
    );
  }

  async getProducts(query: ProductsQuery): Promise<ListOfOclConcepts> {
    const pageNumber = query.page || 1;
    const pageSize = query.pageSize || 10;
    try {
      this.logger.info(`Attempting to list products in OCL.`);
      const nameQuery = query.name ? `&q=${query.name}` : '';
      const productsFromOcl = await this.axiosClient.get<OclConcept[]>(
        `/sources/${this.masterRepo}/concepts/?limit=${pageSize}&page=${pageNumber}${nameQuery}&includeMappings=false`,
      );
      this.logger.info(`Able to list products in OCL.`);
      return {
        concepts: productsFromOcl.data,
        currentPage: pageNumber,
        totalNumberOfConcepts: productsFromOcl.headers.num_found,
        totalNumberOfPages: Math.ceil(
          productsFromOcl.headers.num_found / pageSize,
        ),
      };
    } catch (error) {
      this.logger.error(
        `Failed to list products in OCL. There was problem talking to OCL: ${error.message}`,
      );
      throw new OclClientException(
        'There was a problem listing products from the Product Master.',
      );
    }
  }
}
