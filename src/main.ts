/** Load environment variables */
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
// 這是為了在env檔可以用${...}的方式
expand({ parsed: dotenv.config().parsed });
/** Load environment variables */

import { NestFactory } from '@nestjs/core';
import { RequestMethod, VersioningType } from '@nestjs/common';
import { cmmConf } from '@myapp/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 啟用Api path versioning
  app.enableVersioning({ type: VersioningType.URI });
  // 設置Api path 前綴字
  app.setGlobalPrefix(
    cmmConf.defaultApiRouterPrefix,
    { exclude: [{ path: '/', method: RequestMethod.GET }] });

  await app.listen(cmmConf.port);
}
bootstrap();
