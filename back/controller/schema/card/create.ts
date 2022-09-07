import  Joi from "joi";
import JoiDate from "@joi/date";
import { CardHasClub } from "@domain/model";
const joi = Joi.extend(JoiDate);

const CardCreateSchema = joi.object({
  firstName: joi.string().required().example("mathéo"),
  lastName: joi.string().required().example("Miquel"),
  birth: joi.date().format("DD/MM/YYYY").required(),
  postion: joi.string().required(),
  club: Joi.array().items(joi.object({
    clubId: joi.string().required().min(24).max(24),
    startYear: joi.number().positive().max(new Date().getFullYear()).required(),
    endYear: joi.string().required(),
  })).required(),
});

type CardCreateType = {
  firstName: string;
  lastName: string;
  birth: string;
  postion: string;
  club: Omit<CardHasClub, "id" | "cardId">[];
};

export { CardCreateSchema, CardCreateType };
