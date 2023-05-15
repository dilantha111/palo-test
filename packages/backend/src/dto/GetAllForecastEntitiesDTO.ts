import { Validate } from 'class-validator';

export class GetAllForecastEntitiesDTO {

  @Validate((value: string) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value), {
    message: 'The date_time must be in the format YYYY-MM-DDTHH:MM:SS',
  })
  date_time: string;
}
