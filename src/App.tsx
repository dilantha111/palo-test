import { Container, Grid } from "@mui/material"
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";


// fetchTrafficData(date: Date) {

// }

async function fetchWhetherData(date, time) {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');
  const formattedTime = dayjs(time).format('HH:mm:ss');
  const timeStr = `${formattedDate}T${formattedTime}`;

  console.log(`${formattedDate}T${formattedTime}`);
  return fetch('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?' + new URLSearchParams({
    date_time: timeStr
  }));
}

function App() {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<Dayjs>(dayjs());
  const [locations, setLocations] = useState<string[]>();

  const onDateChange = async (newDate: Dayjs | null) => {
    if (!newDate) return;
    setDate(newDate);
    fetchWhetherData(newDate, time);
  };

  const onTimeChange = async (newTime: Dayjs | null) => {
    if (!newTime) return;
    setTime(newTime);
    const data = await (await fetchWhetherData(date, newTime)).json();
    console.log(await data);
    setLocations(data.items[0].forecasts.map(i => i.area));
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
            {locations?.map(i => <p key={i}>{i}</p>)}
          </Grid>
          <Grid item lg={4} md={10}>
            weather
          </Grid>
          <Grid item lg={8} md={10}>
            screenshot
          </Grid>
          <Grid item lg={4} md={10}>
            place holder
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  )
}

export default App
