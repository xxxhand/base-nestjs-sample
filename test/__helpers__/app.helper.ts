import * as superTest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

export class AppHelper {
  private static _app?: INestApplication = undefined;
  private static _agent?: superTest.SuperAgentTest = undefined;

  public static async getAgent(): Promise<superTest.SuperAgentTest> {
    if (!this._agent) {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      this._app = moduleFixture.createNestApplication();
      await this._app.init();
      this._agent = superTest.agent(this._app.getHttpServer());
    }
    return this._agent;
  }

  public static async closeAgent(): Promise<void> {
    if (this._app) {
      await this._app.close();
      this._agent = undefined;
      this._app = undefined;
    }
  }
}
