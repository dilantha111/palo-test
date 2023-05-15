import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForeCastItem } from './types/ForeCastItem.type';
import { GetAllForecastEntities } from './dto/getForecastQuery';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getForecast', () => {
    it('should return forecast items', async () => {
      const mockForecast: ForeCastItem[] = [{
        "locationName": "Ang Mo Kio",
        "screenShotUrl": "https://images.data.gov.sg/api/traffic-images/2023/04/919e3501-b964-4d73-a12d-b2325384b902.jpg",
        "whetherForecast": "Cloudy"
      },
      {
        "locationName": "Bedok",
        "screenShotUrl": "https://images.data.gov.sg/api/traffic-images/2023/04/53112231-857f-4b95-8609-f09c596f274c.jpg",
        "whetherForecast": "Cloudy"
      },
      {
        "locationName": "Bishan",
        "screenShotUrl": "https://images.data.gov.sg/api/traffic-images/2023/04/9dddd2ca-4646-4054-bf3d-c9ad1b3b4a9c.jpg",
        "whetherForecast": "Cloudy"
      },
      {
        "locationName": "Boon Lay",
        "screenShotUrl": "https://images.data.gov.sg/api/traffic-images/2023/04/2d927d78-59b0-47a4-97cc-fd614178132b.jpg",
        "whetherForecast": "Cloudy"
      },
      {
        "locationName": "Bukit Batok",
        "screenShotUrl": "https://images.data.gov.sg/api/traffic-images/2023/04/65b3a97f-1b68-4cc9-9cf0-da58edfbf7bc.jpg",
        "whetherForecast": "Cloudy"
      },];
      const mockQueryParams: GetAllForecastEntities = { date_time: '2023-04-27T00:00:00' };
      jest.spyOn(appService, 'getForecast').mockImplementation(() => Promise.resolve(mockForecast));

      const result = await appController.getForecast(mockQueryParams);

      expect(appService.getForecast).toHaveBeenCalledTimes(1);
      expect(appService.getForecast).toHaveBeenCalledWith(mockQueryParams.date_time);
      expect(result).toEqual({ forecast: mockForecast });
    });
  });
});
