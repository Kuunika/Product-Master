import { ProductDto } from 'src/common/dtos/product.dto';
import { SystemProductDto } from 'src/common/dtos/system-product.dto';
import { R4 } from '@ahryman40k/ts-fhir-types';

export const getSystems = (products: ProductDto[]): Array<any> => {
  const mappings = products.map(product => product.mappings);
  const m = [].concat.apply([], mappings);
  return [...new Set(m.map(m => m.systemName))];
};

export const formatProductsToFhir = (
  products: ProductDto[],
  systems,
): R4.IConceptMap => {
  const group: Array<R4.IConceptMap_Group> = [];
  systems.forEach(target => {
    group.push({
      target,
      element: products.map(prod => getElement(prod, target)),
    });
  });

  return {
    resourceType: 'ConceptMap',
    status: R4.ConceptMapStatusKind._active,
    group,
  };
};

const getElement = (product: ProductDto, system): R4.IConceptMap_Element => {
  return {
    code: product.productCode,
    display: product.productName,
    target: formatTargets(
      product.mappings.filter(map => map.systemName === system),
    ),
  };
};

const formatTargets = (
  mappings: SystemProductDto[],
): Array<R4.IConceptMap_Target> => {
  return mappings.map(map => ({
    code: map.systemProductCode,
    display: map.productName,
    equivalence: R4.ConceptMap_TargetEquivalenceKind._equal,
  }));
};
