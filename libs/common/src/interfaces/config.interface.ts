export interface IConfig {
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
