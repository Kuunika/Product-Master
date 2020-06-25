export class SystemNotFoundException extends Error {
  constructor() {
    super('The system provided does not exist.');
  }
}