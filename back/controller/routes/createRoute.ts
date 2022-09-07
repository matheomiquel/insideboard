import { functionType, methodType, requestType } from "./type";
import {
  Express,
  Handler,
  Request,
  Response,
} from "express";
import * as services from '@controller/services';
import { ErrorType } from "../../errorType";
import cors from "cors";
import bodyParser from "body-parser";

type ValueOf<T> = T[keyof T];

type test = ValueOf<typeof services>;
type toto = InstanceType<test>;

export class CreateRoute {
  private readonly app: Express;
  constructor({ app }: { app: Express }) {
    this.app = app
    this.app.use(cors());
    this.app.use(bodyParser.json());
    //this.app.use(formData.parse());

    const PORT = process.env.PORT ?? 3000;
    this.app.listen(PORT, () => console.log(`server start on port:${PORT}`));
  }

  createRoute(
    { method, middleware = [], handler, path, context }: {
      method: methodType;
      middleware?: Handler[];
      handler: functionType;
      path: string;
      context: toto;
    },
  ) {
    const newHandler = handler.bind({ ...context });
    this.app[method](
      path,
      middleware,
      (req: Request, res: Response) => {
        const request = {
          body: req.body,
          query: req.query,
          params: req.params,
          token: String(req.headers.token),
          file: req.file,
        };
        this.handlerFunction(request, res, newHandler);
      },
    );
  }

  async handlerFunction(
    req: requestType<any>,
    res: Response,
    handler: functionType,
  ) {
    try {
      const result = await handler(req);
      res.status(result.status).send(result.data);
    } catch (e) {
      console.log(e);
      if (await this.isErrorType(e)) {
        const error = await e as ErrorType;
        return res.status(error.status).send(error.message);
      }
      return res.status(500).send("erreur inconnue");
    }
  }

  async isErrorType(e: any): Promise<boolean> {
    if (e.status && e.message) {
      return true;
    }
    return false;
  }
}
