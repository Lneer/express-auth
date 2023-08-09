class APiError extends Error {
  status: number;
  errors: Error[];

  constructor(status: number, message: string, errors: Error[] = []) {
    super(message);
    this.errors = errors;
    this.status = status;
  }

  static Badrequest(message: string, errors: Error[] = []) {
    return new APiError(400, message, errors);
  }

  static UnAutorized(message: string, errors: Error[] = []) {
    return new APiError(404, message, errors);
  }
}

export default APiError;
