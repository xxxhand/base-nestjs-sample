import * as util from 'util';
import { HttpException } from '@nestjs/common';
import { CustomDefinition, CustomError, CustomValidator } from '@xxxhand/app-common';

export class ErrException extends HttpException {
  private code: number = 0;
  private msgArgs: Array<string | number> = [];
  private _message: string = '';

  constructor(message: string, httpStatus: number) {
    super(message, httpStatus);
    this._message = message;
  }

  public getCode(): number {
    return this.code;
  }
  public setCode(code: number): void {
    this.code = code;
  }

  public getMessage(): string {
    return this._message;
  }

  public setMessage(message: string): void {
    this._message = message;
  }

  public getMsgArgs(): Array<string | number> {
    return this.msgArgs;
  }

  public setMsgArgs(msgArgs: Array<string | number>) {
    this.msgArgs = this.msgArgs.concat(msgArgs);
  }

  public format(): void {
    if (CustomValidator.nonEmptyArray(this.msgArgs)) {
      this.message = util.format(this.message, ...this.msgArgs);
    }
  }

  public static addCodes(codes: CustomDefinition.ICodeStruct[]): void {
    CustomError.addCodes(codes);
  }

  public static newFromCodeName(codeName: string, msgArgs?: Array<string | number>): ErrException {
    const oCode = CustomError.getCode(codeName);
    const exp = new ErrException(oCode.message, oCode.httpStatus);
    exp.setCode(oCode.code);
    exp.setMessage(oCode.message);
    if (CustomValidator.nonEmptyArray(msgArgs)) {
      exp.setMsgArgs(msgArgs);
    }
    return exp;
  }

  public static newFromException(exception: any): ErrException {
    if (exception instanceof ErrException) {
      return exception;
    }
    if (typeof exception === 'string') {
      return ErrException.newFromCodeName(exception);
    }
    let unSupportedMsg = '[ErrException warning] Not supported error format';
    if (typeof exception !== 'object') {
      return ErrException.newFromCodeName(`${unSupportedMsg}: ${exception}`);
    }

    let exp: ErrException;
    switch (exception.constructor.name) {
      case 'Error':
        exp = ErrException.newFromCodeName(exception.message);
        break;
      case 'CustomError':
        exp = new ErrException(exception.message, exception.httpStatus);
        exp.setCode(exception.code);
        exp.setMessage(exception.message);
        if (CustomValidator.nonEmptyArray(exception.msgArgs)) {
          exp.setMsgArgs(exception.msgArgs);
        }
        break;
      default:
        // For the nestjs exceitions like BadRequestException, NotFoundException...etc, the format would be {"statusCode": number, "message": string, "error": string}
        // Basicly, we do not handle the self formatting like new BadRequestException({...}). if object be offered, we will stringfy it
        // For the class-validator library, the format would be {"statusCode": number, "message": string[], "error": string}
        // Basicly, we only get the first message from the mesage array
        // If we do not find the "message" property in exception, the message will be "Not supported error format"
        try {
          const cErr = (<HttpException>exception).getResponse();

          if (typeof cErr === 'string') {
            exp = ErrException.newFromCodeName(cErr);
            break;
          }
          if (!('message' in cErr)) {
            exp = ErrException.newFromCodeName(unSupportedMsg);
            console.warn(cErr);
            break;
          }
          if (typeof cErr['message'] === 'string') {
            unSupportedMsg = cErr['message'];
          } else if (Array.isArray(cErr['message']) && cErr['message'].length > 0) {
            unSupportedMsg = cErr['message'].shift();
          }
          exp = ErrException.newFromCodeName(unSupportedMsg);
        } catch (error) {
          exp = ErrException.newFromCodeName(exception.message);
          break;
        }
    }
    return exp;
  }
}
