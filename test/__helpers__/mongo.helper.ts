import { CustomMongoClient } from '@xxxhand/app-common';

export class MongoHelper extends CustomMongoClient {
  constructor() {
    super(process.env.DEFAULT_MONGO_URI, {
      minPoolSize: Number.parseInt(process.env.DEFAULT_MONGO_MIN_POOL),
      maxPoolSize: Number.parseInt(process.env.DEFAULT_MONGO_MAX_POOL),
      user: process.env.DEFAULT_MONGO_USER,
      pass: process.env.DEFAULT_MONGO_PASS,
      db: process.env.DEFAULT_MONGO_DB_NAME,
      directConnect: true,
      connectTimeoutMS: Number.parseInt(process.env.DEFAULT_MONGO_CONN_TIMEOUT),
    });
  }

  public async clear(cols: string[]): Promise<void> {
    for (const col of cols) {
      await this.getCollection(col).deleteMany({});
    }
  }
}
