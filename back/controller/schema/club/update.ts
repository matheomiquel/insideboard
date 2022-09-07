import Joi from "joi";
import JoiDate from "@joi/date";
const joi = Joi.extend(JoiDate);

const ClubUpdateSchemaBody = joi.object({
    name: joi.string().required().example("mathéo"),
});
const ClubUpdateSchemaParams = joi.object({
    id: joi.string().required().min(24).max(24),
});

type ClubUpdateTypeBody = {
    name: string;
};

export { ClubUpdateSchemaBody, ClubUpdateTypeBody, ClubUpdateSchemaParams };
