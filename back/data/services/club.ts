import { ClubInterface } from "@domain/interfaces";
import { Card, Club } from "@domain/model";
import { clubModel } from "@data/database/model";
export class ClubData implements ClubInterface {
  async getAll(): Promise<Club[]> {
    const clubDB = await clubModel.find({});
    return clubDB.map((club) =>
      new Club({
        id: club.id,
        name: club.name,
      })
    );
  }

  async create(
    { name }: {
      name: string;
    },
  ): Promise<Club> {
    const clubDB = new clubModel({
      name,
    });

    const club = await clubDB.save();
    return new Club({
      id: club.id,
      name: club.name,
    });
  }
  async update({ id, name }: {
    id: string;
    name: string;
  }): Promise<Club> {
    const club = await clubModel.findOneAndUpdate(
      { id: id },
      {
        name,
      },
      { new: true },
    );
    if (!club) {
      throw "error";
    }
    return new Club({
      id: club.id,
      name: club.name
    });
  }
  async delete({ id }: { id: string }): Promise<undefined> {
    const remove = await clubModel.findById(id);
    if (remove) {
      await clubModel.deleteOne({ id: remove.id });
    }
    return;
  }
}
