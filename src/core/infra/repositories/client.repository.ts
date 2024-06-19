import { DEFAULT_MONGO } from '@myapp/common';
import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CustomDefinition, TMongooseClient, CustomValidator } from '@xxxhand/app-common';
import { ClientEntity } from '../../domain/entities/client.entity';
import { modelNames, IClientDocument } from '../models/models.definition';

@Injectable()
export class ClientRepository {
  constructor(@Inject(DEFAULT_MONGO) private readonly defMongooseClient: TMongooseClient) {}

  public async save(entity: ClientEntity): Promise<CustomDefinition.TNullable<ClientEntity>> {
    if (!entity) {
      return undefined;
    }
    if (!CustomValidator.nonEmptyString(entity.id)) {
      let doc = <IClientDocument>{
        name: entity.name,
        callbackUrl: entity.callbackUrl,
      };
      const col = this.defMongooseClient.getModel(modelNames.CLIENT);
      doc = (await col.create(doc)) as IClientDocument;
      entity.id = doc.id;
      return entity;
    }

    return entity;
  }

  public async findOneByName(name: string): Promise<CustomDefinition.TNullable<ClientEntity>> {
    if (!CustomValidator.nonEmptyString(name)) {
      return undefined;
    }
    const col = this.defMongooseClient.getModel(modelNames.CLIENT);
    const q = { name };
    const doc = (await col.findOne(q).lean()) as IClientDocument;

    return plainToInstance(ClientEntity, doc);
  }
}
