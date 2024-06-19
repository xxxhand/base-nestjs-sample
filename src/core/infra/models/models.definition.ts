import { Schema } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { buildSchema } from '@typegoose/typegoose';
import { ClientModel } from './client.model';

export enum modelNames {
  CLIENT = 'Client',
}

export type IClientDocument = HydratedDocument<ClientModel>;

export function loadModelsIntoDefaultContainer(): Map<string, Schema> {
  const defaultContainer: Map<string, Schema> = new Map();
  defaultContainer.set(modelNames.CLIENT, buildSchema(ClientModel, { schemaOptions: { collection: `${modelNames.CLIENT}s`, timestamps: true } }));

  return defaultContainer;
}
