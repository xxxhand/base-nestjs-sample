import { TMongooseClient, CustomDefinition, CustomValidator } from '@xxxhand/app-common';

export class DefaultMongoose extends TMongooseClient {
  constructor(uri: string, connOpt: CustomDefinition.IMongoOptions) {
    super();
    this.errPrefix = '[Default mongoose]';
    this.uri = uri;
    this.opt.minPoolSize = connOpt.minPoolSize;
    this.opt.maxPoolSize = connOpt.maxPoolSize;
    this.opt.connectTimeoutMS = connOpt.connectTimeoutMS;
    this.opt.dbName = connOpt.db;
    if (CustomValidator.nonEmptyString(connOpt.user)) {
      this.opt.user = connOpt.user;
      this.opt.pass = connOpt.pass;
    }
    this.newInstance();
  }
}
