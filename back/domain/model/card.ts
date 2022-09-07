import { Club } from "./club";
export class Card {
  private readonly id: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly birth: string;
  private readonly position: string;
  private readonly club: Club[];
  constructor(
    { id, firstName, lastName, birth, position, club }: {
      id: string;
      firstName: string;
      lastName: string;
      birth: string;
      position: string;
      club: Club[];
    },
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birth = birth;
    this.position = position;
    this.club = club;
  }
}
