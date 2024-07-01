import { Module, Global, OnModuleInit } from '@nestjs/common';
import { TMongooseClient, CustomDefinition } from '@xxxhand/app-common';

import { cmmConf } from './common.config';
import { CommonService } from './common.service';
import { DEFAULT_MONGO, CMM_CFG } from './common.const';
import { errCodes } from './err.code';
import { ErrException } from './err.exception';
import { IConfig } from './interfaces/config.interface';
import { DefaultMongoose } from './clients/default.mongoose';
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
          directConnect: true,
        };
        const client = new DefaultMongoose(uri, opt);
        await client.tryConnect();
        return client;
      },
      inject: [CMM_CFG],
    },
    AsyncLocalStorageProvider,
  ],
  exports: [CommonService, DEFAULT_MONGO],
})
export class CommonModule implements OnModuleInit {
  onModuleInit() {
    // Initial all error codes
    ErrException.addCodes(errCodes);
  }
}
