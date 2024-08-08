import { APP_FILTER } from '@nestjs/core';
import { CommonModule, CommonService } from '@myapp/common';
import { Module, BeforeApplicationShutdown, MiddlewareConsumer, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { AppExceptionFilter } from './app-components/app-exception.filter';
import { AppTracerMiddleware } from './app-components/app-tracer.middleware';
@Module({
  imports: [CommonModule, CoreModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule, OnApplicationBootstrap, BeforeApplicationShutdown {
  constructor(private readonly cmmService: CommonService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppTracerMiddleware).forRoutes('*');
  }

  async onApplicationBootstrap() {}

  async beforeApplicationShutdown(signal?: string) {
    this.cmmService.releaseResources();
  }
}
