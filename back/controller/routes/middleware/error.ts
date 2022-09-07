import { ErrorType } from 'errorType'
export class FileError {
   static async limitFieldCount({ message }: { message: string }): Promise<ErrorType> {
    return {
      status: 400,
      message
    }
  }
  static async limitFieldKey({ message }: { message: string }): Promise<ErrorType> {
    return {
      status: 400,
      message
    }
  }
  static async limitFieldValue({ message }: { message: string }): Promise<ErrorType> {
    return {
      status: 400,
      message
    }
  }
  static async limitFileCount({ message }: { message: string }): Promise<ErrorType> {
    return {
      status: 400,
      message
    }
  }
  static async LimiteFileSize(): Promise<ErrorType> {
    return {
      status: 400,
      message: 'file is to big'
    }
  }
  static async limitePartCount({ message }: { message: string }): Promise<ErrorType> {
    return {
      status: 400,
      message
    }
  }
  static async limitUnexpectedFile({ message }: { message: string }): Promise<ErrorType> {
    return {
      status: 400,
      message
    }
  }
  static async NotFound({ message }: { message: string }): Promise<ErrorType> {
    return {
      status: 400,
      message
    }
  }

  static async wrongMimetype(): Promise<ErrorType> {
    return {
      status: 400,
      message: 'We only accept JPEG extension'
    }
  }
  static async noFile(): Promise<ErrorType> {
    return {
      status: 400,
      message: "You don't send any file"
    }
  }
  static async BadRequest({ message }: { message: string }): Promise<ErrorType> {
    return {
      status: 404,
      message
    }
  }
}