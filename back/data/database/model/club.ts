import { ClubDB } from "@data/interface";
import { model, Schema } from "mongoose";
const clubSchema = new Schema<ClubDB>({
  name: { type: String, required: true },
});

const clubModel = model<ClubDB>("Club", clubSchema);
export { clubModel };
