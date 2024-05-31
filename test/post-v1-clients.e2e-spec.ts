import * as _ from 'lodash';
import * as superTest from 'supertest';
import { AppHelper } from './__helpers__/app.helper';
import { MongoHelper } from './__helpers__/mongo.helper';

interface IBody {
  name: string;
  callbackUrl: string;
}

describe(`POST ${process.env.DEFAULT_API_ROUTER_PREFIX}/v1/clients spec`, () => {
  const endpoint = `${process.env.DEFAULT_API_ROUTER_PREFIX}/v1/clients`;
  let agent: superTest.SuperAgentTest;
  const db = new MongoHelper();
  const clientCol = 'Clients';
  const defaultBody: IBody = {
    name: 'iLearning',
    callbackUrl: 'https://xxx.ccc.com',
  };
  beforeAll(async () => {
    agent = await AppHelper.getAgent();
    await db.tryConnect();
  });
  afterAll(async () => {
    await AppHelper.closeAgent();
    await db.clear([clientCol]);
    db.close();
  });
  describe('Required fields', () => {
    test('[10001] Parameter "name" is empty', async () => {
      const b = _.cloneDeep(defaultBody);
      b.name = '';
      const res = await agent.post(endpoint).send(b);

      expect(res.status).toBe(400);
      expect(res.body.code).toBe(10001);
      expect(res.body.message).toBe('Client name is empty');
    });
    test('[10002] Parameter "callbackUrl" is empty', async () => {
      const b = _.cloneDeep(defaultBody);
      b.callbackUrl = '';
      const res = await agent.post(endpoint).send(b);

      expect(res.status).toBe(400);
      expect(res.body.code).toBe(10002);
      expect(res.body.message).toBe('Client callback url is empty');
    });
  });
  describe('Validation rules', () => {});
  describe('Success', () => {});
});
