import { Grid } from "@mui/material";
import './NotAvailable.css';

export type Props = {
    errorMsg?: string
};

const defaultErrorMsg = 'No Weather forecast or Traffic cam is available. Please select a different date and time.';

export default function NotAvailable({ errorMsg = defaultErrorMsg }: Props) {
    return <Grid container>
        <Grid item>
            <p> {errorMsg} </p>
        </Grid>
    </Grid>
}