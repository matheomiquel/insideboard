import { tags } from "./tags";
import { createCardSwagger } from "./card";
export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0", //version of the OpenAPI Specification
    title: "card collection",
    description: "card collection",
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: {
    bearerAuth: [],
  },
  host: `127.0.0.1:${process.env.PORT ?? 3000}`,
  exposeRoute: true,
  tags: [tags.card, tags.club],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    ...createCardSwagger,
}
};
