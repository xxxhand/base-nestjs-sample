/** Load environment variables */
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
expand({ parsed: dotenv.config().parsed })
/** Load environment variables */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.DEFAULT_MONGO_DB_NAME);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
