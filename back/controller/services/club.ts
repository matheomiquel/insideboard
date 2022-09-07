import { requestType, responseType } from "@controller/routes/type";
import { ClubDomain } from "@domain/services";
import { Club } from "@domain/model";
import { ClubUpdateTypeBody, ClubCreateType } from '@controller/schema/club'
export class ClubService {
  private readonly clubDomain: ClubDomain;
  constructor({ clubDomain }: { clubDomain: ClubDomain }) {
    this.clubDomain = clubDomain;
  }
  async getAll(req: requestType<undefined>): responseType<200, Club[]> {
    const cards = await this.clubDomain.getAll();
    return { status: 200, data: cards };
  }

  async create(req: requestType<ClubCreateType>): responseType<201, Club> {
    const data = {
      name: req.body.name,
    };
    const card = await this.clubDomain.create(data);
    return { status: 201, data: card };
  }

  async update(req: requestType<ClubUpdateTypeBody>): responseType<200, Club> {
    const data = {
      id: req.params.id,
      name: req.body.name,
    };

    const card = await this.clubDomain.update(data);
    return { status: 200, data: card };
  }
  async delete(req: requestType<undefined>): responseType<204, undefined> {
    const card = await this.clubDomain.delete({ id: req.params.id });
    return { status: 204, data: undefined };
  }
}
