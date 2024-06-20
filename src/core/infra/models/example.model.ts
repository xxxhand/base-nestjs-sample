import { prop, index } from '@typegoose/typegoose';

@index({ name: 1 }, { unique: true })
export class ExampleModel {
  /** Client name */
  @prop({ required: true, trim: true })
  name: string;

  /** Client callback url */
  @prop({ required: true, trim: true })
  callbackUrl: string;
}
