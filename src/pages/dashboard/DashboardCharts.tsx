import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useChartOptions } from "./useChartOptions";
import { Grid, Paper } from "@mui/material";

export const DashboardCharts = () => {
  const { needsComparisonOptions, demographicsOptions } = useChartOptions();
  return (
    <Grid container spacing={3} mt={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 1 }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={needsComparisonOptions}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 1 }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={demographicsOptions}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};
