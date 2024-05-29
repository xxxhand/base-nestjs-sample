import { APP_FILTER } from '@nestjs/core';
import { Module, BeforeApplicationShutdown } from '@nestjs/common';
import { CommonModule, CommonService } from '@myapp/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppExceptionFilter } from './app-exception.filter';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CommonModule, CoreModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter
    }
  ],
})
export class AppModule implements BeforeApplicationShutdown {
  constructor(private readonly cmmService: CommonService) { }

  async beforeApplicationShutdown(signal?: string) {
    this.cmmService.releaseResources();
  }
}
