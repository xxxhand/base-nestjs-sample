import { ErrException } from '@myapp/common';
import { Module, OnModuleInit } from '@nestjs/common';
import { errCodes } from './domain/err-codes/err.codes';
import { ClientController } from './controllers/client.controller';

@Module({
  controllers: [ClientController],
})
export class CoreModule implements OnModuleInit {
  onModuleInit() {
    ErrException.addCodes(errCodes);
  }
}
