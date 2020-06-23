import { Injectable } from '@nestjs/common';
import { OclClient } from './ocl-client';
import { FormatNotImplementedException } from '../common/exceptions/format-not-implements.exception';
import { ListOfOclConcepts } from '../common/interfaces/list-of-ocl-concepts.interface';
import { OclConcept } from '../common/interfaces/ocl-concept.interface';

@Injectable()
export class OclClientService {
    private oclClient = new OclClient();

    getProductByCode(productCode: string, system?: string, fhir?: boolean): Promise<OclConcept>{
        if(fhir) throw new FormatNotImplementedException();
        // if the didn't provide a system then the axios query should not contain the flag to include the mapping
        // Yet to implement Master Product List so if the system is DHIS2 It will just return it a regular.
        //TODO: Case Where Product does not exist for requested system.
        return this.oclClient.getProductFromOcl(productCode, system, fhir);

    }

    getProducts(page = 1): Promise<ListOfOclConcepts>{
        return this.oclClient.getAllProductsFromOcl(page);
    }


}
