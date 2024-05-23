/** Load environment variables */
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
// 這是為了在env檔可以用${...}的方式
expand({ parsed: dotenv.config().parsed });
/** Load environment variables */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cmmConf } from '@myapp/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(cmmConf.port);
}
bootstrap();
