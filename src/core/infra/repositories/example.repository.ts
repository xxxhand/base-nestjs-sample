import { DEFAULT_MONGO } from '@myapp/common';
import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CustomDefinition, TMongooseClient, CustomValidator } from '@xxxhand/app-common';
import { ExampleEntity } from '../../domain/entities/example.entity';
import { modelNames, IExampleDocument } from '../models/models.definition';

@Injectable()
export class ExampleRepository {
  constructor(@Inject(DEFAULT_MONGO) private readonly defMongooseClient: TMongooseClient) {}

  public async save(entity: ExampleEntity): Promise<CustomDefinition.TNullable<ExampleEntity>> {
    if (!entity) {
      return undefined;
    }
    if (!CustomValidator.nonEmptyString(entity.id)) {
      let doc = <IExampleDocument>{
        name: entity.name,
        callbackUrl: entity.callbackUrl,
      };
      const col = this.defMongooseClient.getModel(modelNames.EXAMPLE);
      doc = (await col.create(doc)) as IExampleDocument;
      entity.id = doc.id;
      return entity;
    }

    return entity;
  }

  public async findOneByName(name: string): Promise<CustomDefinition.TNullable<ExampleEntity>> {
    if (!CustomValidator.nonEmptyString(name)) {
      return undefined;
    }
    const col = this.defMongooseClient.getModel(modelNames.EXAMPLE);
    const q = { name };
    const doc = (await col.findOne(q).lean()) as IExampleDocument;

    return plainToInstance(ExampleEntity, doc);
  }
}
