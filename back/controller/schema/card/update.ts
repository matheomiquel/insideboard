import  Joi from "joi";
import JoiDate from "@joi/date";
const joi = Joi.extend(JoiDate);

const CardUpdateSchema = joi.object({
  firstName: joi.string().required().example("mathéo"),
  lastName: joi.string().required().example("Miquel"),
  birth: joi.date().format("DD/MM/YYYY"),
  postion: joi.string().required(),
  club: Joi.array().items(joi.object({
    clubId: joi.string().required(),
    startYear: joi.number().positive().max(new Date().getFullYear()),
    endYear: joi.string().required(),
  })),
});

type CardUpdateType = {
  firstName: string;
  lastName: string;
  birth: string;
  postion: string;
  club: [{
    clubId: string;
    startYear: number;
    endYear: number;
  }];
};

export { CardUpdateSchema, CardUpdateType };
