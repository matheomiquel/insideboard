import { CreateRoute } from "@controller/routes";
import { CardService } from "@controller/services";
import { FileMiddleware } from "../routes/middleware";
import multer from 'multer'
export class CardRoute {
  private readonly cardService: CardService;
  private readonly createRoute: CreateRoute;
  private readonly fileMiddleware: FileMiddleware;
  private readonly endpoint = "card";
  constructor(
    { cardService, createRoute, fileMiddleware }: {
      cardService: CardService;
      createRoute: CreateRoute;
      fileMiddleware: FileMiddleware;
    },
  ) {
    this.cardService = cardService;
    this.createRoute = createRoute;
    this.fileMiddleware = fileMiddleware;

    this.createRoute.createRoute({
      method: "get",
      path: `/${this.endpoint}`,
      handler: this.cardService.getAll,
      context: this.cardService,
    });
    this.createRoute.createRoute({
      method: "post",
      path: `/${this.endpoint}`,
      middleware: [fileMiddleware.singleFileMiddleware],
      handler: this.cardService.create,
      context: this.cardService,
    });
    this.createRoute.createRoute({
      method: "put",
      path: `/${this.endpoint}/:id`,
      handler: this.cardService.update,
      context: this.cardService,
    });
    this.createRoute.createRoute({
      method: "delete",
      path: `/${this.endpoint}/:id`,
      handler: this.cardService.delete,
      context: this.cardService,
    });
  }
}
