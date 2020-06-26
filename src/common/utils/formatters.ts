import { ListOfOclConcepts } from "../interfaces/list-of-ocl-concepts.interface";
import { ProductsDto } from "../dtos/products.dto";
import { SystemProductDto } from "../dtos/system-product.dto";
import { OclConcept, Mapping } from "../interfaces/ocl-concept.interface";
import { ProductDto } from "../dtos/product.dto";

export function toProduct(concept: OclConcept): ProductDto {
    return {
        productCode: concept.uuid,
        productName: concept.display_name,
        mappings:    concept.mappings && concept.mappings.map(val => toSystemProduct(val)),
        dateCreated: new Date(concept.created_on),
        lastUpdated: new Date(concept.updated_on)
    };
}

export function toOclProducts(concepts: ListOfOclConcepts): ProductsDto {
    return {
        page: concepts.currentPage,
        totalNumberOfPages: concepts.totalNumberOfPages,
        totalNumberOfProducts: concepts.totalNumberOfConcepts,
        products: concepts.concepts.map(val => toProduct(val))
    }
}

function toSystemProduct(map: Mapping): SystemProductDto {
    return {
        systemName: map.source,
        systemProductCode: map.external_id,
        productName: map.to_concept_name
    }
}