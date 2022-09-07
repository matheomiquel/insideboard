import  multer from "multer";
import { FileError } from "./error";
import { NextFunction, Request, Response } from "express";

const checkExtension = async function (
  { mimetype }: { mimetype: string },
): Promise<boolean> {
  const acceptType = ["jpeg"];
  const regex = RegExp(`${acceptType.join("|")}`);
  return regex.test(mimetype);
};

export class FileMiddleware {
  async singleFileMiddleware(req: Request, res: Response, next: NextFunction) {
    const singleFileHandler = multer().single("image");
    singleFileHandler(req, res, async (error) => {
      if (!req.file) {
        const response = await FileError.noFile();
        return res.status(response.status).send(response.message);
      }
      if (!await checkExtension({ mimetype: req.file.mimetype })) {
        const response = await FileError.wrongMimetype();
        return res.status(response.status).send(response.message);
      }
      if (req.file.size > 10000000) {
        const response = await FileError.LimiteFileSize();
        return res.status(response.status).send(response.message);
      }
      if (error) {
        return res.status(400).send("error with file");
      }
      next();
    });
  }
}
