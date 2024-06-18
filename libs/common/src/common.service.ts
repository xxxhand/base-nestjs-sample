import { Injectable, Inject } from '@nestjs/common';
import { TMongooseClient, CustomResult } from '@xxxhand/app-common';
import { CMM_CFG, DEFAULT_MONGO } from './common.const';
import { IConfig } from './interfaces/config.interface';
import { AsyncLocalStorageProvider } from './clients/async-local-storage.provider';
@Injectable()
export class CommonService {
  constructor(
    @Inject(CMM_CFG) private readonly cmmConf: IConfig,
    @Inject(DEFAULT_MONGO) private readonly defMongoClient: TMongooseClient,
    private readonly alsProvider: AsyncLocalStorageProvider,
  ) {}

  /** Get current project configuration */
  public getConf(): IConfig {
    return this.cmmConf;
  }

  /** To release all used resouces, usually using on application shutdown */
  public async releaseResources(): Promise<void> {
    this.defMongoClient.terminate();
  }

  /** Get current asyncLocalStorage */
  public getLocalStorage(): AsyncLocalStorageProvider {
    return this.alsProvider;
  }

  /** To build new one CustomResult object within trace id */
  public newResultInstance(): CustomResult {
    return new CustomResult().withTraceId(this.alsProvider.store);
  }
}
