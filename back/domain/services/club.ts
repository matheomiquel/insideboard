import { Club } from "@domain/model";
import { ClubData } from "data/services";
export class ClubDomain {
  private readonly clubProvider: ClubData;
  constructor({ clubProvider }: { clubProvider: ClubData }) {
    this.clubProvider = clubProvider;
  }
  async getAll(): Promise<Club[]> {
    return this.clubProvider.getAll();
  }

  async create({ name }: {
    name: string;
  }): Promise<Club> {
    return this.clubProvider.create({
      name,
    });
  }

  async update({ id, name }: {
    id: string;
    name: string;
  }): Promise<Club> {
    return this.clubProvider.update({
      id,
      name,
    });
  }

  async delete({ id }: { id: string }): Promise<undefined> {
    return this.clubProvider.delete({ id });
  }
}
