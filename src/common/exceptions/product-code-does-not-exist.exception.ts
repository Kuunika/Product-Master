import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductCodeDoesNotExistException extends HttpException {
    constructor() {
      super('Product Code Provided Does Not Exist', HttpStatus.FORBIDDEN);
    }
  }