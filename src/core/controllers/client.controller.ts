import { CustomResult } from '@xxxhand/app-common';
import { Post, Body, Controller } from '@nestjs/common';
import { CommonService, ErrException } from '@myapp/common';
import { errConstants } from '../domain/err-codes/err.const';
import { ClientEntity } from '../domain/entities/client.entity';
import { ClientRepository } from '../infra/repositories/client.repository';
import { CreateClientRequest } from '../domain/value-objects/create-client.request';

@Controller({
  path: 'clients',
  version: '1',
})
export class ClientController {
  constructor(
    private readonly cmmService: CommonService,
    private readonly repo: ClientRepository,
  ) {}

  @Post()
  public async createClient(@Body() body: CreateClientRequest): Promise<CustomResult> {
    let currClient = await this.repo.findOneByName(body.name);
    if (currClient) {
      throw ErrException.newFromCodeName(errConstants.ERR_CLIENT_DUPLICATED);
    }
    currClient = new ClientEntity();
    currClient.name = body.name;
    currClient.callbackUrl = body.callbackUrl;
    currClient = await this.repo.save(currClient);

    return this.cmmService.newResultInstance().withResult(currClient.id);
  }
}
