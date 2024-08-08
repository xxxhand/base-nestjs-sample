import * as fs from 'fs-extra';
import { Request, Response } from 'express';
import { ErrException, CommonService } from '@myapp/common';
import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly cmmService: CommonService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const err = ErrException.newFromException(exception);
    err.format();
    Logger.warn(`${req.method} ${req.originalUrl} - ${err.getStatus()}(${err.getCode()})`);
    Logger.warn(err.stack);

    if (res.headersSent) return;
    res.status(err.getStatus()).json(this.cmmService.newResultInstance().withCode(err.getCode()).withMessage(err.getMessage()));
    // Delete uploaded files
    const tasks = []
    if (req.file) {
      tasks.push(fs.unlink(req.file.path));
    }
    if (req.files) {
      if (Array.isArray(req.files)) {
        req.files.forEach((x) => tasks.push(fs.unlink(x.path)));
      } else {
        Object.keys(req.files).forEach((k: string) => (req.files[k] as Express.Multer.File[]).forEach((x: Express.Multer.File) => tasks.push(fs.unlink(x.path))));
      }
    }
    Promise.all(tasks).catch((ex) => Logger.warn(ex));    
  }
}
