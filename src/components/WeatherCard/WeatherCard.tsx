import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { ForeCastItem } from "../../types/ForeCastItem.type";

export type Props = {
    forecastItem: ForeCastItem
};

export default function WeatherCard({ forecastItem }: Props) {
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'));

    return <Grid container direction={'row'} marginLeft={isMobileView ? 0 : 10} marginTop={'70px'}>
        <Grid item>
            <h3> Weather in {forecastItem.locationName}</h3>
            <p> {forecastItem.whetherForecast} </p>
        </Grid>
    </Grid>
}