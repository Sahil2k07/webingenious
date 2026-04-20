export default class AppError extends Error {
  public readonly errorMessage: string;
  public readonly errorCode: number;

  constructor(msg: string, errorCode: number) {
    super(msg);
    this.errorMessage = msg;
    this.errorCode = errorCode;
  }
}

export class NotFoundError extends AppError {
  constructor(msg: string) {
    super(msg, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(msg: string) {
    super(msg, 400);
  }
}

export class ValidationError extends AppError {
  constructor(msg: string) {
    super(msg, 422);
  }
}
