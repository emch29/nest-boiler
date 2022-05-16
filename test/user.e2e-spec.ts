import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createApp } from './helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
    await app.init();
  });

  afterAll(() => app.close());

  it('/user (GET)', () => {
    return request(app.getHttpServer()).get('/user').expect(200);
  });
});
