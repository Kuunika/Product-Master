import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidSystemSelectedException extends HttpException {
    constructor() {
      super('Invalid System Selected', HttpStatus.FORBIDDEN);
    }
  }