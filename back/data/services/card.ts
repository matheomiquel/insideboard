import { CardInterface } from "@domain/interfaces";
import { Card, CardHasClub, Club } from "@domain/model";
import { cardHasClubModel, cardModel, clubModel } from "@data/database/model";
import { DataError } from "@data/error";
import { writeFileSync } from "fs";
export class CardData implements CardInterface {
  private readonly rootDirectory: string;
  constructor({ rootDirectory }: { rootDirectory: string }) {
    this.rootDirectory = rootDirectory;
  }
  async getAll(): Promise<Card[]> {
    const cardDB = await cardModel.find({});
    return cardDB.map((card) =>
      new Card({
        id: card.id,
        firstName: card.firstName,
        lastName: card.lastName,
        birth: card.birth,
        position: card.position,
        club: card.club.map((club) => new Club(club)),
      })
    );
  }

  async create(
    { firstName, lastName, birth, position, club, file }: {
      firstName: string;
      lastName: string;
      birth: string;
      position: string;
      club: Omit<CardHasClub, "id" | "cardId">[];
      file: {
        name?: string;
        buffer?: string;
      };
    },
  ): Promise<Card> {
    const clubDB = await clubModel.find({
      "_id": {
        $in: [
          club.map((c) => c.clubId),
        ],
      },
    });
    if (clubDB.length !== club.length) {
      throw await DataError.notFound({ message: "clubs not found" });
    }
    const picturePath =
      `${this.rootDirectory}/data/files/${Date.now()}_${file.name}`;
    if (file.buffer) {
      writeFileSync(
        picturePath,
        file.buffer,
      );
    }
    const cardDB = new cardModel({
      firstName,
      lastName,
      birth,
      position,
      picturePath,
    });

    const newCard = await cardDB.save();

    club.forEach((c) =>
      new cardHasClubModel({
        cardId: newCard.id,
        clubId: c.clubId,
        startYear: c.startYear,
        endYear: c.endYear,
      }).save()
    );
    const cardClub = newCard.club.map((club) => new Club(club));
    const card = new Card({
      id: newCard.id,
      firstName: newCard.firstName,
      lastName: newCard.lastName,
      birth: newCard.birth,
      position: newCard.position,
      club: cardClub,
    });
    return card;
  }
  async update({ id, firstName, lastName, birth, position, club }: {
    id: string;
    firstName: string;
    lastName: string;
    birth: string;
    position: string;
    club: Omit<CardHasClub, "id" | "cardId">[];
  }): Promise<Card> {
    const card = await cardModel.findOneAndUpdate(
      { id: id },
      {
        firstName,
        lastName,
        birth,
        position,
      },
      { new: true },
    );
    if (!card) {
      throw "error";
    }
    return new Card({
      id: card.id,
      firstName: card.firstName,
      lastName: card.lastName,
      birth: card.birth,
      position: card.position,
      club: card.club.map((club) => new Club(club)),
    });
  }
  async delete({ id }: { id: string }): Promise<undefined> {
    const remove = await cardModel.findById(id);
    if (remove) {
      await cardModel.deleteOne({ id: remove.id });
    }
    return;
  }
}
