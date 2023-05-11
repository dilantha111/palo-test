import { Grid } from "@mui/material";
import './NotAvailable.css';

export default function NotAvailable() {
    return <Grid container>
        <Grid item>
            <p> No Weather forecast or Traffic cam is available. Please select a different date and time. </p>
        </Grid>
    </Grid>
}