import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './services/app.service';
import { ForeCastItem } from './types/ForeCastItem.type';
import { GetAllForecastEntities } from './dto/getForecastQuery';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/forecast')
  async getForecast(
    @Query() query: GetAllForecastEntities,
  ): Promise<{ forecast: ForeCastItem[] }> {
    const forecast = await this.appService.getForecast(query.date_time);
    return { forecast };
  }
}
