import { ClubDB } from "./club";
export interface CardDB {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly birth: string;
  readonly picturePath: string;
  readonly position: string;
  readonly club: ClubDB[];
}
