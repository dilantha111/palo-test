import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ForeCastItem } from '../src/types/ForeCastItem.type';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/forecast (GET) should return an array of ForeCastItems', async () => {
    const query = { date_time: '2023-04-29T10:00:00' };

    const response = await request(app.getHttpServer())
      .get('/forecast')
      .query(query)
      .expect(HttpStatus.OK);

    expect(response.body.forecast).toBeInstanceOf(Array);

    response.body.forecast.forEach((forecastItem: ForeCastItem) => {
      expect(forecastItem).toHaveProperty('locationName');
      expect(forecastItem).toHaveProperty('screenShotUrl');
      expect(forecastItem).toHaveProperty('whetherForecast');
    });
  });
});
