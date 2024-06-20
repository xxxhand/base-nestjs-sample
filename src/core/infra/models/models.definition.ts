import { Schema } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { buildSchema } from '@typegoose/typegoose';
import { ExampleModel } from './example.model';

export enum modelNames {
  EXAMPLE = 'Example',
}

export type IExampleDocument = HydratedDocument<ExampleModel>;

export function loadModelsIntoDefaultContainer(): Map<string, Schema> {
  const defaultContainer: Map<string, Schema> = new Map();
  defaultContainer.set(modelNames.EXAMPLE, buildSchema(ExampleModel, { schemaOptions: { collection: `${modelNames.EXAMPLE}s`, timestamps: true } }));

  return defaultContainer;
}
