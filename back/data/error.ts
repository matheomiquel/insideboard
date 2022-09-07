import { ErrorType } from "errorType";
export class DataError {
  static async badRequest(
    { message = "invalid request" }: { message?: string },
  ): Promise<ErrorType> {
    return {
      status: 400,
      message: message,
    };
  }
  static async notFound(
    { message = "resource not found" }: { message?: string },
  ): Promise<ErrorType> {
    return {
      status: 404,
      message: message,
    };
  }
  static async conflict(
    { message = "clonflic with an other ressource" }: { message?: string },
  ): Promise<ErrorType> {
    return {
      status: 409,
      message: message,
    };
  }
}
