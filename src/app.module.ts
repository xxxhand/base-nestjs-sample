import { APP_FILTER } from '@nestjs/core';
import { DEFAULT_MONGO } from '@myapp/common';
import { TMongooseClient } from '@xxxhand/app-common';
import { CommonModule, CommonService } from '@myapp/common';
import { Module, BeforeApplicationShutdown, MiddlewareConsumer, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ExampleController } from './controllers/exemple.controller';
import { ExampleRepository } from './infra/repositories/example.repository';
import { AppExceptionFilter } from './app-components/app-exception.filter';
import { AppTracerMiddleware } from './app-components/app-tracer.middleware';
import { loadModelsIntoDefaultContainer } from './infra/models/models.definition';
@Module({
  imports: [CommonModule],
  controllers: [AppController, ExampleController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      // Register all ORM models in this module
      // 這是無用的provider，只是為了在bootstrap的時候把資料庫的model load進來
      // 也可以寫在CoreModule裡，但必須實做在OnApplicationBootstrap中
      provide: 'Never_usage_provider',
      useFactory: (client: TMongooseClient) => {
        loadModelsIntoDefaultContainer().forEach((schema, modelName) => client.registerAsModel(modelName, schema));
      },
      inject: [DEFAULT_MONGO],
    },
    ExampleRepository,
  ],
})
export class AppModule implements NestModule, OnApplicationBootstrap, BeforeApplicationShutdown {
  constructor(private readonly cmmService: CommonService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppTracerMiddleware).forRoutes('*');
  }

  async onApplicationBootstrap() {}

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async beforeApplicationShutdown(signal?: string) {
    this.cmmService.releaseResources();
  }
}
