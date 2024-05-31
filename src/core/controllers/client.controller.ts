import { Post, Body, Controller } from '@nestjs/common';
import { CustomResult } from '@xxxhand/app-common';
import { CreateClientRequest } from '../domain/value-objects/create-client.request';

@Controller({
  path: 'clients',
  version: '1',
})
export class ClientController {
  @Post()
  public async createClient(@Body() body: CreateClientRequest): Promise<CustomResult> {
    return new CustomResult();
  }
}
