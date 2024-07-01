import { TMongooseClient } from '@xxxhand/app-common';
import { Module, OnModuleInit } from '@nestjs/common';
import { ErrException, DEFAULT_MONGO } from '@myapp/common';

import { ClientController } from './controllers/client.controller';
import { ExampleRepository } from './infra/repositories/example.repository';
import { loadModelsIntoDefaultContainer } from './infra/models/models.definition';

@Module({
  controllers: [ClientController],
  providers: [
    {
      // Register all ORM models in this module
      // 這是無用的provider，只是為了在bootstrap的時候把資料庫的model load進來
      provide: 'Never_usage_provider',
      useFactory: (client: TMongooseClient) => {
        loadModelsIntoDefaultContainer().forEach((schema, modelName) => client.registerAsModel(modelName, schema));
      },
      inject: [DEFAULT_MONGO],
    },
    ExampleRepository,
  ],
})
export class CoreModule implements OnModuleInit {
  onModuleInit() {
    // Register all error codes
  }
}
