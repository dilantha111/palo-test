import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { ServiceUnavailableException } from '@nestjs/common';

describe('AppService', () => {
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(() => 'mockedUrl'),
                    },
                },
            ],
        }).compile();

        appService = app.get<AppService>(AppService);
    });

    describe('getForecast', () => {
        it('should return forecast items', async () => {
            jest.spyOn(appService, 'getWeatherData').mockResolvedValueOnce({
                area_metadata: [
                    { name: 'Location 1', label_location: { latitude: 1, longitude: 2 } },
                    { name: 'Location 2', label_location: { latitude: 3, longitude: 4 } },
                ],
                items: [
                    {
                        forecasts: [
                            { forecast: 'Weather 1' },
                            { forecast: 'Weather 2' },
                        ],
                    },
                ],
            });

            jest.spyOn(appService, 'getTrafficData').mockResolvedValueOnce({
                items: [
                    {
                        cameras: [
                            { image: 'Image 1', location: { latitude: 1, longitude: 2 } },
                            { image: 'Image 2', location: { latitude: 3, longitude: 4 } },
                        ],
                    },
                ],
            });

            const forecast = await appService.getForecast('2023-04-08T00:15:04');

            expect(forecast).toEqual([
                {
                    locationName: 'Location 1',
                    screenShotUrl: 'Image 1',
                    whetherForecast: 'Weather 1',
                },
                {
                    locationName: 'Location 2',
                    screenShotUrl: 'Image 2',
                    whetherForecast: 'Weather 2',
                },
            ]);
        });
    });

    describe('getWeatherData', () => {
        it('should fetch weather data and return it when response is ok', async () => {
            const expected = [{ temperature: 25 }, { temperature: 26 }];
            jest.spyOn(global, 'fetch').mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValueOnce(expected),
            } as any);

            const actual = await appService.getWeatherData('2023-04-30T01:00:00');

            expect(actual).toEqual(expected);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('date_time=2023-04-30T01%3A00%3A00'));
        });

        it('should throw ServiceUnavailableException when response is not ok', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValueOnce({
                ok: false,
            } as any);

            await expect(appService.getWeatherData('2023-04-30T01:00:00')).rejects.toThrow(ServiceUnavailableException);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('date_time=2023-04-30T01%3A00%3A00'));
        });
    });

    describe('getTrafficData', () => {
        it('should fetch traffic data and return it when response is ok', async () => {
            const expected = [{ cameraId: '123' }, { cameraId: '456' }];
            jest.spyOn(global, 'fetch').mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValueOnce(expected),
            } as any);

            const actual = await appService.getTrafficData('2023-04-30T01:00:00');

            expect(actual).toEqual(expected);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('date_time=2023-04-30T01%3A00%3A00'));
        });

        it('should throw ServiceUnavailableException when response is not ok', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValueOnce({
                ok: false,
            } as any);

            await expect(appService.getTrafficData('2023-04-30T01:00:00')).rejects.toThrow(ServiceUnavailableException);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('date_time=2023-04-30T01%3A00%3A00'));
        });
    });

});
