import { CommonService } from '@myapp/common';
import { CustomResult } from '@xxxhand/app-common';
import { Post, Body, Controller } from '@nestjs/common';
import { CreateClientRequest } from '../domain/value-objects/create-client.request';

@Controller({
  path: 'clients',
  version: '1',
})
export class ClientController {
  constructor(private readonly cmmService: CommonService) {}

  @Post()
  public async createClient(@Body() body: CreateClientRequest): Promise<CustomResult> {
    return this.cmmService.newResultInstance().withResult('Hello world');
  }
}
