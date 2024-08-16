import { IConfig } from './interfaces/config.interface';

export const cmmConf: IConfig = {
  defaultMongo: {
    uri: process.env.DEFAULT_MONGO_URI,
    dbName: process.env.DEFAULT_MONGO_DB_NAME,
    minPoolSize: Number.parseInt(process.env.DEFAULT_MONGO_MIN_POOL),
    maxPoolSize: Number.parseInt(process.env.DEFAULT_MONGO_MAX_POOL),
    connectTimeout: Number.parseInt(process.env.DEFAULT_MONGO_CONN_TIMEOUT),
    user: process.env.DEFAULT_MONGO_USER,
    password: process.env.DEFAULT_MONGO_PASS,
  },
  port: Number.parseInt(process.env.PORT),
  domain: process.env.DOMAIN,
  defaultApiRouterPrefix: process.env.DEFAULT_API_ROUTER_PREFIX,
  defaultUploadTmpDir: process.env.DEFAULT_UPLOAD_TEMP_DIR,
  defaultUploadMaxSize: Number.parseInt(process.env.DEFAULT_UPLOAD_MAX_SIZE),
  defaultLoggerPath: process.env.DEFAULT_LOGGER_PATH,
  localesPath: process.env.LOCALES_PATH,
  fallbackLocale: process.env.FALLBACK_LOCALE,
};
