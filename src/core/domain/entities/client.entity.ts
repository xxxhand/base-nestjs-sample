import { BaseEntity } from './base-entity.abstract';

export class ClientEntity extends BaseEntity {
  public name: string = '';
  public callbackUrl: string = '';
}
