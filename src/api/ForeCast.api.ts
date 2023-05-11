import dayjs, { Dayjs } from 'dayjs';
import { ForeCastItem } from '../types/ForeCastItem.type';

const getWhetherData = async (timeStr: string) => {
  const data = await fetch(
    'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?' +
      new URLSearchParams({
        date_time: timeStr,
      }),
  );

  return await data.json();
};

const getTrafficData = async (timeStr: string) => {
  const data = await fetch(
    'https://api.data.gov.sg/v1/transport/traffic-images?' +
      new URLSearchParams({
        date_time: timeStr,
      }),
  );

  return await data.json();
};

export const getForeCastData = async (date: Dayjs, time: Dayjs): Promise<ForeCastItem[]> => {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');
  const formattedTime = dayjs(time).format('HH:mm:ss');
  const timeStr = `${formattedDate}T${formattedTime}`;

  const whetherData = await getWhetherData(timeStr);
  const trafficData = await getTrafficData(timeStr);

  const locations = whetherData.area_metadata;

  const cameraData = trafficData.items[0].cameras;
  const cameras = [];

  // finding nearest camera image to the location
  locations.forEach((location) => {
    let nearestLocation = cameraData[0];

    for (let index = 1; index < cameraData.length; index++) {
      const currentLatDiff = Math.abs(nearestLocation.location.latitude - location.label_location.latitude);
      const currentLongDiff = Math.abs(nearestLocation.location.longitude - location.label_location.longitude);
      const currentTotalDiff = currentLatDiff + currentLongDiff;

      const newLatDiff = Math.abs(cameraData[index].location.latitude - location.label_location.latitude);
      const newLongDiff = Math.abs(cameraData[index].location.longitude - location.label_location.longitude);
      const newTotalDiff = newLatDiff + newLongDiff;

      if (newTotalDiff < currentTotalDiff) {
        nearestLocation = cameraData[index];
      }
    }

    cameras.push(nearestLocation);
  });

  // combine location, camera shot and whether
  const foreCastList: ForeCastItem[] = [];
  for (let index = 0; index < locations.length; index++) {
    foreCastList.push({
      locationName: locations[index].name,
      screenShotUrl: cameras[index].image,
      whetherForecast: whetherData.items[0].forecasts[index].forecast,
    });
  }

  return foreCastList;
};
