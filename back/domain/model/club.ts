export class Club {
  private readonly id: string;
  private readonly name: string;
  constructor({ id, name }: { id: string; name: string }) {
      this.id = id
      this.name = name
  }
}
