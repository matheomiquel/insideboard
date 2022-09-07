import { config } from "dotenv";
import "module-alias/register";
import { CardDomain, ClubDomain } from "@domain/services";
import { CardData, ClubData } from "@data/services";
import { CardRoute, ClubRoute, CreateRoute } from "@controller/routes";
import { CardService, ClubService } from "@controller/services";
import { FileMiddleware } from "@controller/routes/middleware";
import { CardValidator } from "@controller/validator";
import  swaggerUI from "swagger-ui-express";
import { swaggerConfig } from "@controller/swagger";
import express from "express";

let path = ".env";
if (process.env.APP_ENV) {
  path = `${path}.${process.env.APP_ENV}`;
}
config({ path: path })
import "@data/database/connection";
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

const cardValidator = new CardValidator();

const fileMiddleware = new FileMiddleware();

const createRoute = new CreateRoute({ app });

const cardData = new CardData({ rootDirectory: __dirname });
const clubData = new ClubData();

const cardDomain = new CardDomain({ cardProvider: cardData });
const clubDomain = new ClubDomain({ clubProvider: clubData });

const cardService = new CardService({ cardDomain, cardValidator });
const clubService = new ClubService({ clubDomain });
new CardRoute({ cardService, createRoute, fileMiddleware });
new ClubRoute({ clubService, createRoute });
export { app };


