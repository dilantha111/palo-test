import dayjs, { Dayjs } from 'dayjs';
import { ForeCastItem } from '../types/ForeCastItem.type';

export const getForeCastData = async (date: Dayjs, time: Dayjs): Promise<ForeCastItem[]> => {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');
  const formattedTime = dayjs(time).format('HH:mm:ss');
  const timeStr = `${formattedDate}T${formattedTime}`;

  const forecastData = await await fetch(
    'http://localhost:3000/forecast?' +
    new URLSearchParams({
      date_time: timeStr,
    }),
  ).then(async response => {
    if (response.ok) {
      return response.json();
    }

    const error = await response.json();
    throw Error(error.message);
  });

  return forecastData.forecast;
};
