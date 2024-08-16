export interface IConfig {
  port: number;
  domain: string;
  defaultApiRouterPrefix: string;
  defaultUploadTmpDir: string;
  defaultUploadMaxSize: number;
  defaultLoggerPath: string;
  localesPath: string;
  fallbackLocale: string;
  defaultMongo: {
    uri: string;
    minPoolSize: number;
    maxPoolSize: number;
    connectTimeout: number;
    dbName: string;
    user: string;
    password: string;
  };
}
