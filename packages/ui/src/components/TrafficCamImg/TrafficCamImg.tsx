import { Grid } from "@mui/material";
import { ForeCastItem } from "../../types/ForeCastItem.type";

export type Props = {
    forecastItem: ForeCastItem
};

export default function TrafficCamImg({ forecastItem }: Props) {
    return <Grid container marginTop={5} direction={'column'}>
        <Grid item>
            <h3>Traffic Cam Screenshot</h3>
        </Grid>
        <Grid item>
            <img src={forecastItem.screenShotUrl} style={{ maxWidth: '100%' }} />
        </Grid>
    </Grid>
}