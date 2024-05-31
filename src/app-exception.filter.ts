import { Request, Response } from 'express';
import { ErrException } from '@myapp/common';
import { CustomResult } from '@xxxhand/app-common';
import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';

import * as appConstants from './app.const';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const err = ErrException.newFromException(exception);
    Logger.warn(`${req.method} ${req.originalUrl} - ${err.getStatus()}(${err.getCode()})`);
    Logger.warn(err.stack);

    if (res.headersSent) return;
    res.status(err.getStatus()).json(
      new CustomResult()
        .withTraceId(<string>res.getHeader(appConstants.X_TRACE_ID))
        .withCode(err.getCode())
        .withMessage(err.getMessage()),
    );
  }
}
