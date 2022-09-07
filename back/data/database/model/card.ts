import { CardDB, ClubDB } from "@data/interface";
import { clubModel } from "./club";
import { model, Schema } from "mongoose";
const cardSchema = new Schema<CardDB>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birth: { type: String, required: true },
  position: { type: String, required: true },
  picturePath: { type: String, required: true },
  club: { type: [clubModel.schema], required: true },
}, { id: true });

const cardModel = model<CardDB>("Card", cardSchema);

export { cardModel };
