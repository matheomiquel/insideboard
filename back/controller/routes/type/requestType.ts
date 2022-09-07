interface ObjectType {
  [key: string]: any
}
export type requestType<Body extends undefined | ObjectType> = {
  body: Body
  query: {
    [key: string]: any;
  };
  params: {
    [key: string]: any;
  };
  token?: string;
  file?: Express.Multer.File;
  files?: Express.Multer.File[]
};
