export class OclClientException extends Error {
    constructor() {
        super('There was an issue talking to the product master.');
    }
}