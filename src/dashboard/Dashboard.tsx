import { Grid } from "@mui/material";
import { DataCard } from "./DataCard";
import { useNameMaps } from "../data";
import { DashboardCards } from "./DashboardCards";

export const Dashboard = () => {
    // const {
    //     getNeedName,
    //     getOrganizationName,
    // } = useNameMaps();

    return (
        <Grid container p={2}>
            <DashboardCards />
        </Grid>
    );
}