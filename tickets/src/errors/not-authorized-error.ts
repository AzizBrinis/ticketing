import { CustomError } from "./custom-error";

export class NotAuthorrizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super("Not Authorized");
    Object.setPrototypeOf(this, NotAuthorrizedError.prototype);
  }
  serializeErrors() {
    return [{ message: "Not Authorized" }];
  }
}
