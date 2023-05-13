import { Container, Grid } from "@mui/material"
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { getForeCastData } from "./api/ForeCast.api";
import { ForeCastItem } from "./types/ForeCastItem.type";
import ForecastList from "./components/ForecastList";
import WeatherCard from "./components/WeatherCard";
import TrafficCamImg from "./components/TrafficCamImg/TrafficCamImg";
import NotAvailable from "./components/NotAvailable/NotAvailable";

function App() {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<Dayjs>(dayjs());
  const [forecastItems, setForecastItems] = useState<ForeCastItem[]>();
  const [selectedItem, setSelectedItem] = useState<ForeCastItem>();

  const loadForeCastData = useCallback(async () => {
    const forecastData = await getForeCastData(date, time);
    setSelectedItem(undefined);
    setForecastItems(forecastData);
  }, [date, time]);

  useEffect(() => {
    loadForeCastData();
  }, [loadForeCastData]);

  const onDateChange = async (newDate: Dayjs | null) => {
    if (!newDate) return;
    setDate(newDate);
  };

  const onTimeChange = async (newTime: Dayjs | null) => {
    if (!newTime) return;
    setTime(newTime);
  };

  const selectLocation = (selectedItem: ForeCastItem) => {
    setSelectedItem(selectedItem);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" style={{ marginTop: '50px' }}>
        <Grid container>

          <Grid item lg={8} md={12}>
            <Grid container>
              <Grid item>
                <h2> Pick your date and Time </h2>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <DatePicker
                  value={date}
                  onChange={onDateChange}
                />
              </Grid>
              <Grid item>
                <MobileTimePicker
                  value={time}
                  views={['hours', 'minutes', 'seconds']}
                  onChange={onTimeChange}
                  format="hh:mm:ss:a" />
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={4} md={12}>
          </Grid>

          <Grid item lg={8} md={12}>
            {forecastItems && forecastItems.length ?
              <Grid container direction={'column'} marginTop={'50px'}>
                <Grid item>
                  <h2> Pick a location to see weather forecast and traffic </h2>
                </Grid>
                <Grid item>
                  <ForecastList forecastItems={forecastItems} onClick={selectLocation} />
                </Grid>
              </Grid>
              : <NotAvailable />}
          </Grid>

          <Grid item lg={4} md={12}>
            <Grid container>
              <Grid item>
                {selectedItem ? <WeatherCard forecastItem={selectedItem} /> : null}
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={8} md={12}>
            {selectedItem ? <TrafficCamImg forecastItem={selectedItem} /> : null}
          </Grid>

          <Grid item lg={4} md={12}>
          </Grid>

        </Grid>

      </Container>
    </LocalizationProvider>
  )
}

export default App
