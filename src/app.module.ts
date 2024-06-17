import { APP_FILTER } from '@nestjs/core';
import { Module, BeforeApplicationShutdown } from '@nestjs/common';
import { CommonModule, CommonService } from '@myapp/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { AppExceptionFilter } from './middlewares/app-exception.filter';
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
export class AppModule implements BeforeApplicationShutdown {
  constructor(private readonly cmmService: CommonService) {}

  async beforeApplicationShutdown(signal?: string) {
    this.cmmService.releaseResources();
  }
}
