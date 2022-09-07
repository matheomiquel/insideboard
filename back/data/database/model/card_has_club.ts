import { cardHasClubDB } from "@data/interface";
import { model, Schema } from "mongoose";
const CardHasClubSchema = new Schema<cardHasClubDB>({
  cardId: { type: String, required: true },
  clubId: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
}, { id: true });

const cardHasClubModel = model<cardHasClubDB>("CardHasClub", CardHasClubSchema);

export { cardHasClubModel };
