import { ErrorType } from "errorType";
export class ControllerError {
  static async badRequest(
    { message }: { message: string[] },
  ): Promise<ErrorType> {
    return {
      status: 400,
      message,
    };
  }
}
