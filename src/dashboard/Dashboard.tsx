import { Grid } from "@mui/material";
import { DataCard } from "./DataCard";
import { useNameMaps } from "../data/useNameMaps";

export const Dashboard = () => {
    const {
        getNeedName,
        getOrganizationName,
    } = useNameMaps();

    return (
        <Grid container p={0}>
            <Grid item xs={3}>
                <DataCard />
            </Grid>
        </Grid>
    );
}