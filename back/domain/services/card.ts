import { Card, CardHasClub } from "@domain/model";
import { CardData } from "data/services";
export class CardDomain {
  private readonly cardProvider: CardData;
  constructor({ cardProvider }: { cardProvider: CardData }) {
    this.cardProvider = cardProvider;
  }
  async getAll(): Promise<Card[]> {
    return this.cardProvider.getAll();
  }

  async create({ firstName, lastName, birth, position, club, file }: {
    firstName: string;
    lastName: string;
    birth: string;
    position: string;
    club: Omit<CardHasClub, "id" | "cardId">[];
    file: {
      name?: string;
      buffer?: string;
    };
  }): Promise<Card> {
    return this.cardProvider.create({
      firstName,
      lastName,
      birth,
      position,
      club,
      file,
    });
  }

  async update({ id, firstName, lastName, birth, position, club }: {
    id: string;
    firstName: string;
    lastName: string;
    birth: string;
    position: string;
    club: Omit<CardHasClub, "id" | "cardId">[];
  }): Promise<Card> {
    return this.cardProvider.update({
      id,
      firstName,
      lastName,
      birth,
      position,
      club,
    });
  }

  async delete({ id }: { id: string }): Promise<undefined> {
    return this.cardProvider.delete({ id });
  }
}
