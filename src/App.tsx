import { Container, Grid } from "@mui/material"
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { getForeCastData } from "./api/ForeCast.api";
import { ForeCastItem } from "./types/ForeCastItem.type";
import ForecastList from "./components/ForecastList/ForecastList";

function App() {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<Dayjs>(dayjs());
  const [forecastItem, setForecastItem] = useState<ForeCastItem[]>();
  const [selectedItem, setSelectedItem] = useState<ForeCastItem>();

  const loadForeCastData = useCallback(async () => {
    const forecastData = await getForeCastData(date, time);
    setForecastItem(forecastData);
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
          <Grid item lg={8} md={10}>
            <Grid container spacing={2}>
              <Grid item>
                <DatePicker
                  label="Controlled picker"
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
          <Grid item lg={4} md={10}>
          </Grid>
          <Grid item lg={8} md={10}>
            {forecastItem ? <ForecastList forecastItems={forecastItem} onClick={selectLocation} /> : null}
          </Grid>
          <Grid item lg={4} md={10}>
            {selectedItem?.whetherForecast}
          </Grid>
          <Grid item lg={8} md={10}>
            <img src={selectedItem?.screenShotUrl} style={{ maxWidth: '100%' }} />
          </Grid>
          <Grid item lg={4} md={10}>
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  )
}

export default App
