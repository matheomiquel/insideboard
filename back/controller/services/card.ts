import { requestType, responseType } from "@controller/routes/type";
import { CardDomain } from "@domain/services/card";
import { Card } from "@domain/model";
import { CardValidator } from "@controller/validator";
import { CardCreateType, CardUpdateType } from "@controller/schema/card";
export class CardService {
  private readonly cardDomain: CardDomain;
  private readonly cardValidator: CardValidator;
  constructor(
    { cardDomain, cardValidator }: {
      cardDomain: CardDomain;
      cardValidator: CardValidator;
    },
  ) {
    this.cardDomain = cardDomain;
    this.cardValidator = cardValidator;
  }
  async getAll(req: requestType<undefined>): responseType<200, Card[]> {
    const cards = await this.cardDomain.getAll();
    return { status: 200, data: cards };
  }

  async create(req: requestType<CardCreateType>): responseType<201, any> {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.postion,
      birth: req.body.birth,
      club: req.body.club,
      file: {
        name: req.file?.originalname,
        buffer: String(req.file?.buffer),
      },
    };
    await this.cardValidator.create(req);
    const card = await this.cardDomain.create(data);
    return { status: 201, data: card };
  }

  async update(req: requestType<CardUpdateType>): responseType<200, any> {
    
    const data = {
      id: req.params.id as string,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.postion,
      birth: req.body.birth,
      club: req.body.club,
    };
    const card = await this.cardDomain.update(data);
    return { status: 200, data: card };
  }
  async delete(req: requestType<undefined>): responseType<204, undefined> {
    await this.cardDomain.delete({ id: req.params.id });
    return { status: 204, data: undefined };
  }
}
