import { ProductDto } from 'src/common/dtos/product.dto';

import * as formatterModule from './formatter';

import { R4 } from '@ahryman40k/ts-fhir-types';

const productDto: ProductDto = {
  productCode: 'code',
  productName: 'name',
  mappings: [
    { systemName: 'a', systemProductCode: 'code-a', productName: 'prod-a' },
    { systemName: 'b', systemProductCode: 'code-b', productName: 'prod-b' },
  ],
  dateCreated: null,
  lastUpdated: null,
};

describe('fhir formatter', () => {
  describe('getProductsSystems', () => {
    it('should retrieve systems from product dto', () => {
      const getProductSystems = jest.spyOn(
        formatterModule,
        'getProductSystems',
      );
      const result = formatterModule.getProductsSystems([productDto]);
      expect(result).toEqual(expect.arrayContaining(['a', 'b']));
      expect(getProductSystems).toHaveBeenCalled();
    });

    it('should throw if there are no systems', () => {
      expect(() => formatterModule.getProductsSystems([])).toThrow();
    });
  });

  describe('getElement', () => {
    it('should generate elements from product', () => {
      const result = formatterModule.getElement(productDto, 'a');

      expect(result).toEqual(
        expect.objectContaining({ code: 'code', display: 'name' }),
      );
      expect(result.target).toEqual(
        expect.arrayContaining([
          { code: 'code-a', display: 'prod-a', equivalence: 'equal' },
        ]),
      );
    });

    it('should throw if product does not have mappings', () => {
      expect(() => formatterModule.getElement({} as ProductDto, 'a')).toThrow();
    });
  });

  describe('formatTargets', () => {
    it('should format mappings to fhir compliance', () => {
      const result = formatterModule.formatTargets(productDto.mappings);
      expect(result).toContainEqual({
        code: 'code-a',
        display: 'prod-a',
        equivalence: 'equal',
      });

      expect(result).toContainEqual({
        code: 'code-b',
        display: 'prod-b',
        equivalence: 'equal',
      });
    });

    it('should return empty array if mappings are empty', () => {
      const result = formatterModule.formatTargets([]);
      expect(result.length).toBe(0);
    });
  });

  describe('formatProductToFhir', () => {
    it('should format product to fhir standard given targeted systems', () => {
      const formatTarget = jest
        .spyOn(formatterModule, 'formatTargets')
        .mockReturnValue([
          {
            code: 'a',
            display: 'd',
            equivalence: R4.ConceptMap_TargetEquivalenceKind._equal,
          },
        ]);

      const result = formatterModule.formatProductToFhir(productDto, [
        'a',
        'b',
      ]);

      expect(formatTarget).toHaveBeenCalled();
      expect(result.group[0].target).toBe('a');
      expect(result.group[1].target).toBe('b');
    });

    it('should return null if product is empty', () => {
      const result = formatterModule.formatProductToFhir({} as ProductDto, []);
      expect(result).toBeNull();
    });
  });

  describe('formatProductsToFhir', () => {
    it('should format products to fhir standard given targeted systems', () => {
      const getElement = jest.spyOn(formatterModule, 'getElement');
      const result = formatterModule.formatProductsToFhir(
        [productDto],
        ['a', 'b'],
      );

      expect(getElement).toHaveBeenCalled();
      expect(result.group[0].target).toBe('a');
      expect(result.group[1].target).toBe('b');
    });

    it('should return null if products is empty', () => {
      const result = formatterModule.formatProductsToFhir([], []);
      expect(result).toBeNull();
    });
  });
});
