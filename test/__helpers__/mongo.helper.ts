import { CustomMongoClient } from '@xxxhand/app-common';

export class MongoHelper extends CustomMongoClient {
  constructor() {
    super(process.env.DEFAULT_MONGO_URI, {
      minPoolSize: Number.parseInt(process.env.DEFAULT_MONGO_MIN_POOL),
      maxPoolSize: Number.parseInt(process.env.DEFAULT_MONGO_MAX_POOL),
      user: process.env.DEFAULT_MONGO_USER,
      pass: process.env.DEFAULT_MONGO_URI,
      db: process.env.DEFAULT_MONGO_PASS,
      directConnect: true,
      connectTimeoutMS: Number.parseInt(process.env.DEFAULT_MONGO_CONN_TIMEOUT),
    });
  }
}
