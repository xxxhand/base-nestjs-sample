import * as fs from 'fs-extra';
import { CustomResult } from '@xxxhand/app-common';
import { Post, Body, Controller, UploadedFile } from '@nestjs/common';
import { CommonService, ErrException, SingleUploadFileInterceptor, errConstants } from '@myapp/common';
import { ExampleEntity } from '../domain/entities/example.entity';
import { ExampleRepository } from '../infra/repositories/example.repository';
import { CreateExampleRequest } from '../domain/value-objects/create-example.request';

@Controller({
  path: 'examples',
  version: '1',
})
export class ExampleController {
  constructor(
    private readonly cmmService: CommonService,
    private readonly repo: ExampleRepository,
  ) {}

  @Post()
  public async createExample(@Body() body: CreateExampleRequest): Promise<CustomResult> {
    let currExample = await this.repo.findOneByName(body.name);
    if (currExample) {
      throw ErrException.newFromCodeName(errConstants.ERR_CLIENT_DUPLICATED);
    }
    currExample = new ExampleEntity();
    currExample.name = body.name;
    currExample.callbackUrl = body.callbackUrl;
    currExample = await this.repo.save(currExample);

    return this.cmmService.newResultInstance().withResult(currExample.id);
  }

  @Post('/upload')
  @SingleUploadFileInterceptor()
  public async uploadFile(@Body() body: { account: string }, @UploadedFile() uploadedFile: Express.Multer.File): Promise<CustomResult> {
    fs.unlink(uploadedFile.path);
    return this.cmmService.newResultInstance<{ account: string; file: string }>().withResult({
      account: body.account,
      file: uploadedFile.originalname,
    });
  }
}
