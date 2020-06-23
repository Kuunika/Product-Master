import { Test, TestingModule } from '@nestjs/testing';
import { OclClientService } from './ocl-client.service';
import { ProductDoesNotExistInTheSpecifiedSystemException } from '../common/exceptions/product-does-not-exist-in-the-specified-system.exception';

describe('OclClientService', () => {
  let service: OclClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OclClientService],
    }).compile();

    service = module.get<OclClientService>(OclClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return product from valid product code', async() => {
    const product  = await service.getProductByCode('EoDP801lDr5');
    expect(product).toBeDefined();
  });

  it('should return a product from a valid systemCode and `system` name provided', async () => {
    const product = await service.getProductByCode('EoDP801lDr5', 'OpenLMIS');
    expect(product).toBeDefined();
  });

  /*
  it('should throw ProductDoesNotExistInTheSpecifiedSystem from a valid systemCode and  invalid `system` name provided', async () => {
    expect(await service.getProductByCode('EoDP801lDr5', 'Oips')).toThrowError();
  });
  */

  it('should return a list of all products', async () => {
    const products = await service.getProducts();
    expect(products).toBeDefined();
  });

});
