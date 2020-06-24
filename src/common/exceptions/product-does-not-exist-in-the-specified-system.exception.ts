export class ProductNotFoundInSystemException extends Error {
    constructor() {
        super('The product specified does not exist in the given system.');
    }
}