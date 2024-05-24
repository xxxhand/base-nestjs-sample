import { Module, BeforeApplicationShutdown } from '@nestjs/common';
import { CommonModule, CommonService } from '@myapp/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements BeforeApplicationShutdown {
  constructor(private readonly cmmService: CommonService) {}

  async beforeApplicationShutdown(signal?: string) {
    this.cmmService.releaseResources();
  }
}
