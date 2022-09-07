import { Club } from "@domain/model";
export interface ClubInterface {
  getAll(): Promise<Club[]>;
  create(
    { name }: {
      name: string;
    },
  ): Promise<Club>;
  update(
    { name }: {
      name: string;
    },
  ): Promise<Club>;
  delete({ id }: { id: string }): Promise<undefined>;
}
