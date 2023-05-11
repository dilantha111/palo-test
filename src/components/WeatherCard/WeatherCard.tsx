import { Grid } from "@mui/material";
import { ForeCastItem } from "../../types/ForeCastItem.type";

export type Props = {
    forecastItem: ForeCastItem
};

export default function WeatherCard({ forecastItem }: Props) {
    return <Grid container direction={'row'} marginLeft={10}>
        <Grid item>
            <h3> Weather in {forecastItem.locationName} </h3>
            <p> {forecastItem.whetherForecast} </p>
        </Grid>
    </Grid>
}