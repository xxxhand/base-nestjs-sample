import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { TMongooseClient, CustomResult, TEasyTranslator } from '@xxxhand/app-common';
import { CMM_CFG, DEFAULT_MONGO, DEFAULT_TRANSLATE } from './common.const';
import { IConfig } from './interfaces/config.interface';
import { DefaultLoggerService } from './components/default-logger.service';
import { AsyncLocalStorageProvider } from './clients/async-local-storage.provider';
@Injectable()
export class CommonService {
  constructor(
    @Inject(CMM_CFG) private readonly cmmConf: IConfig,
    @Inject(DEFAULT_MONGO) private readonly defMongoClient: TMongooseClient,
    @Inject(DEFAULT_TRANSLATE) private readonly defTrans: TEasyTranslator,
    private readonly alsProvider: AsyncLocalStorageProvider,
  ) {}

  /** Get current project configuration */
  public getConf(): IConfig {
    return this.cmmConf;
  }

  /** Get default mongoose client */
  public getDefaultMongooseClient(): TMongooseClient {
    return this.defMongoClient;
  }

  /** Get default logger with context name */
  public getDefaultLogger(context: string): LoggerService {
    return new DefaultLoggerService().useContext(context).useStorageProvider(this.alsProvider).initialFlieTransport(this.cmmConf.defaultLoggerPath);
  }

  /** Get current asyncLocalStorage */
  public getLocalStorage(): AsyncLocalStorageProvider {
    return this.alsProvider;
  }

  /** For multi langs translation */
  public t(key: string, locale?: string): string {
    return this.defTrans.t(key, locale);
  }

  /** To build new one CustomResult object within trace id */
  public newResultInstance<T = any>(): CustomResult<T> {
    return new CustomResult<T>().withTraceId(this.alsProvider.store);
  }
  /** To release all used resouces, usually using on application shutdown */
  public async releaseResources(): Promise<void> {
    this.defMongoClient.terminate();
  }
}
