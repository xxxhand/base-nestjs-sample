import { Module, Global, OnModuleInit } from '@nestjs/common';
import { TMongooseClient, CustomDefinition, TEasyTranslator, CustomHttpClient } from '@xxxhand/app-common';

import { errCodes } from './err.code';
import { cmmConf } from './common.config';
import { ErrException } from './err.exception';
import { CommonService } from './common.service';
import { IConfig } from './interfaces/config.interface';
import { DEFAULT_MONGO, CMM_CFG, DEFAULT_TRANSLATE, DEFAULT_HTTP_CLIENT } from './common.const';
import { DefaultMongoose } from './clients/default.mongoose';
import { EasyTranslateService } from './components/easy-translate.service';
import { AsyncLocalStorageProvider } from './clients/async-local-storage.provider';

@Global()
@Module({
  providers: [
    CommonService,
    {
      provide: CMM_CFG,
      useValue: cmmConf,
    },
    {
      provide: DEFAULT_MONGO,
      useFactory: async (conf: IConfig): Promise<TMongooseClient> => {
        const uri = conf.defaultMongo.uri;
        const opt: CustomDefinition.IMongoOptions = {
          minPoolSize: conf.defaultMongo.minPoolSize,
          maxPoolSize: conf.defaultMongo.maxPoolSize,
          connectTimeoutMS: conf.defaultMongo.connectTimeout,
          db: conf.defaultMongo.dbName,
          user: conf.defaultMongo.user,
          pass: conf.defaultMongo.password,
        };
        const client = new DefaultMongoose(uri, opt);
        await client.tryConnect();
        return client;
      },
      inject: [CMM_CFG],
    },
    {
      provide: DEFAULT_TRANSLATE,
      useFactory: async (conf: IConfig): Promise<TEasyTranslator> => {
        const tr = new EasyTranslateService(conf.localesPath, conf.fallbackLocale);
        await tr.initial();
        return tr;
      },
      inject: [CMM_CFG],
    },
    {
      provide: DEFAULT_HTTP_CLIENT,
      useClass: CustomHttpClient,
    },
    AsyncLocalStorageProvider,
  ],
  exports: [CommonService, DEFAULT_MONGO, DEFAULT_HTTP_CLIENT],
})
export class CommonModule implements OnModuleInit {
  onModuleInit() {
    // Initial all error codes
    ErrException.addCodes(errCodes);
  }
}
