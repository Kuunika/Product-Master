export class ProductNotFoundException extends Error {
  constructor() {
    super('Product code provided does not exist.');
  }
}