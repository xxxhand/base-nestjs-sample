import { Module, Global } from '@nestjs/common';
import { TMongooseClient, CustomDefinition } from '@xxxhand/app-common';

import { DEFAULT_MONGO, CMM_CFG } from './common.const';
import { CommonService } from './common.service';
import { DefaultMongoose } from './clients/default.mongoose';
import { IConfig } from './interfaces/config.interface';
import { cmmConf } from './common.config';

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
  ],
  exports: [CommonService, DEFAULT_MONGO],
})
export class CommonModule {}
