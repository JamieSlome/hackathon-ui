import { Grid } from "@mui/material";
import { DashboardCards } from "./DashboardCards";
import { DashboardCharts } from "./DashboardCharts";

export const Dashboard = () => {
  return (
    <Grid container p={2}>
      <DashboardCards />
      <DashboardCharts />
    </Grid>
  );
};
