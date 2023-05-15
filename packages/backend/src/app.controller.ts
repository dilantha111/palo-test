import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ForeCastItem } from './types/ForeCastItem.type';
import { GetForecastQuery } from './validation/getForecastQuery';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/forecast')
  async getForecast(
    @Query() queryParams: GetForecastQuery,
  ): Promise<{ forecast: ForeCastItem[] }> {
    const forecast = await this.appService.getForecast(queryParams.date_time);
    return { forecast };
  }
}
