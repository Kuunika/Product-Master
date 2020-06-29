export class ProductNotFoundInSystemException extends Error {
    constructor() {
        super('Product was not found in the given system.');
    }
}