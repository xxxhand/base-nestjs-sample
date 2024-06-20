import { CustomResult } from '@xxxhand/app-common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post, Body, Controller, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CommonService, ErrException, cmmConf } from '@myapp/common';
import { errConstants } from '../domain/err-codes/err.const';
import { ExampleEntity } from '../domain/entities/example.entity';
import { ExampleRepository } from '../infra/repositories/example.repository';
import { CreateExampleRequest } from '../domain/value-objects/create-example.request';

@Controller({
  path: 'examples',
  version: '1',
})
export class ClientController {
  constructor(
    private readonly cmmService: CommonService,
    private readonly repo: ExampleRepository,
  ) { }

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
  @UseInterceptors(FileInterceptor('file', { dest: cmmConf.defaultUploadTmpDir }))
  public async uploadFile(
    @Body() body: { account: string },
    @UploadedFile() uploadedFile: Express.Multer.File
  ): Promise<CustomResult> {

    return this.cmmService
      .newResultInstance<{ account: string, file: string }>()
      .withResult(
        {
          account: body.account,
          file: uploadedFile.originalname
        }
      );
  }
}
