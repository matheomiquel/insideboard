import { responseType } from './responseType'
import { requestType}from './requestType'
export type functionType = (req: requestType<any>) => responseType<number, {} | undefined>