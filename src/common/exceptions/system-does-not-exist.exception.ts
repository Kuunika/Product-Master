import { HttpException, HttpStatus } from "@nestjs/common";

export class SystemDoesNotExistException extends HttpException {
    constructor() {
      super('The System Provided Does Not Exist', HttpStatus.NOT_FOUND);
    }
  }