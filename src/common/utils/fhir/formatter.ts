import { ProductDto } from 'src/common/dtos/product.dto';
import { SystemProductDto } from 'src/common/dtos/system-product.dto';
import { R4 } from '@ahryman40k/ts-fhir-types';

export const getProductsSystems = (products: ProductDto[]): Array<string> => {
  let sys = new Set();
  products.forEach(prod => {
    sys = new Set([...sys, ...getProductSystems(prod)]);
  });

  return [...sys] as Array<string>;
};

export const getProductSystems = (product: ProductDto): Array<string> => {
  const m = [].concat.apply([], product.mappings);

  return [...new Set(m.map(m => m.systemName))] as Array<string>;
};

export const formatProductsToFhir = (
  products: ProductDto[],
  systems,
): R4.IConceptMap => {
  let group: Array<R4.IConceptMap_Group> = [];
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

export const formatProductToFhir = (
  product: ProductDto,
  systems,
): R4.IConceptMap => {
  const group: Array<R4.IConceptMap_Group> = [];
  systems.forEach(target => {
    group.push({
      target,
      element: [
        {
          code: product.productCode,
          display: product.productName,
          target: formatTargets(
            product.mappings.filter(map => map.systemName === target),
          ),
        },
      ],
    });
  });

  return {
    resourceType: 'ConceptMap',
    status: R4.ConceptMapStatusKind._active,
    group,
  };
};

const getElement = (
  product: ProductDto,
  system: string,
): R4.IConceptMap_Element => {
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
