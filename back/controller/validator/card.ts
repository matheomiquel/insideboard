import { CardCreateSchema, CardCreateType } from "@controller/schema/card";
import { ValidationError } from "joi";
import { ControllerError } from "@controller/error";
import { requestType } from "../routes/type";
export class CardValidator {
  async create(req: requestType<CardCreateType>): Promise<void> {
    try {
      await CardCreateSchema.validateAsync(req.body, {
        abortEarly: false,
      });
    } catch (e) {
      const errors = e as ValidationError;
      throw await ControllerError.badRequest({
        message: errors.details.map((error) => error.message),
      });
    }
  }
}
