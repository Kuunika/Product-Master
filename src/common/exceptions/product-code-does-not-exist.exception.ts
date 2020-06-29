export class ProductNotFoundException extends Error {
  constructor() {
    super('Product was not found.');
  }
}