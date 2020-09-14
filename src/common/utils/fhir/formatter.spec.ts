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
    const getElement = jest.spyOn(formatterModule, 'getProductSystems');
    it('should retrieve systems from product dto', () => {
      const result = formatterModule.getProductSystems(productDto);
      expect(result).toEqual(expect.arrayContaining(['a', 'b']));
      expect(getElement).toHaveBeenCalled();
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
  });
});
