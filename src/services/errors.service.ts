import { StatusCodes } from "../types/types";

class APiError extends Error {
  status: number;
  errors: Error[];

  constructor(status: number, message: string, errors: Error[] = []) {
    super();
    this.errors = errors;
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string, errors: Error[] = []) {
    return new APiError(StatusCodes["BAD REQUEST"], message, errors);
  }

  static unAutorized(message: string, errors: Error[] = []) {
    return new APiError(StatusCodes["AUTORIZATION ERROR"], message, errors);
  }
}

export default APiError;
