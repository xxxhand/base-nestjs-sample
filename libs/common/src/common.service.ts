import { Injectable, Inject } from '@nestjs/common';
import { CMM_CFG } from './common.const';
import { IConfig } from './interfaces/config.interface';
@Injectable()
export class CommonService {
  constructor(@Inject(CMM_CFG) private readonly cmmConf: IConfig) {}

  /** Get current project configuration */
  public getConf(): IConfig {
    return this.cmmConf;
  }
}
