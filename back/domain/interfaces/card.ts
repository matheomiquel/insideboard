import { Card, CardHasClub } from "@domain/model";
export interface CardInterface {
  getAll(): Promise<Card[]>;
  create(
    { firstName, lastName, birth, position, club }: {
      firstName: string;
      lastName: string;
      birth: string;
      position: string;
      club: Omit<CardHasClub, "id" | "cardId">[],
      file : {
        name?: string,
        buffer?: string,
      }
    },
  ): Promise<Card>;
  update(
    { id, firstName, lastName, birth, position, club }: {
      id: string;
      firstName: string;
      lastName: string;
      birth: string;
      position: string;
      club: Omit<CardHasClub, "id" | "cardId">[],
    },
  ): Promise<Card>;
  delete({ id }: { id: string }): Promise<undefined>;
}
