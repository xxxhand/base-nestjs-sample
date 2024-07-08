import { Request, Response } from 'express';
import { ErrException, CommonService } from '@myapp/common';
import { CustomResult } from '@xxxhand/app-common';
import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';

import * as appConstants from '@myapp/common';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly cmmService: CommonService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const err = ErrException.newFromException(exception);
    Logger.warn(`${req.method} ${req.originalUrl} - ${err.getStatus()}(${err.getCode()})`);
    Logger.warn(err.stack);

    if (res.headersSent) return;
    res.status(err.getStatus()).json(this.cmmService.newResultInstance().withCode(err.getCode()).withMessage(err.getMessage()));
  }
}
