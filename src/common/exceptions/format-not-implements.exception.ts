export class FormatNotImplementedException extends Error {
  constructor() {
    super('Selected format is not yet implemented. Please try again later.');
  }
}