import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Grid } from "@mui/material";

export const Layout = () => {
    return (
        <Grid container p={0}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <Outlet />
            </Grid>
        </Grid>
    );
}