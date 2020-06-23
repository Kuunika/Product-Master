import { HttpException, HttpStatus } from "@nestjs/common";

export class FormatNotImplementedException extends HttpException {
    constructor() {
      super('Selected Format Is Not Yet Implemented, Please Try Again Later', HttpStatus.NOT_IMPLEMENTED);
    }
  }