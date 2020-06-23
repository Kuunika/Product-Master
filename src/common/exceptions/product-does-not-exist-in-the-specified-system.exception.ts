import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductDoesNotExistInTheSpecifiedSystemException extends HttpException {
    constructor() {
        super('The Product Specified Does Not Exist In The Given System', HttpStatus.NOT_FOUND);
    }    
}