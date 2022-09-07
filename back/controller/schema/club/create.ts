import  Joi from "joi";
import JoiDate from "@joi/date";
const joi = Joi.extend(JoiDate);

const ClubCreateSchema = joi.object({
  name: joi.string().required().example("mathéo"),
});

type ClubCreateType = {
  name: string;
};

export { ClubCreateSchema, ClubCreateType };
