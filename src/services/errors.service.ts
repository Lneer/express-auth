class APiError extends Error {
  status: number;
  errors: Error[];

  constructor(status: number, message: string, errors: Error[] = []) {
    super();
    this.errors = errors;
    this.status = status;
    this.message = message;
  }

  static Badrequest(message: string, errors: Error[] = []) {
    return new APiError(400, message, errors);
  }

  static UnAutorized(message: string, errors: Error[] = []) {
    return new APiError(401, message, errors);
  }
}

export default APiError;
