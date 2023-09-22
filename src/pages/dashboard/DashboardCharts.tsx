import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useChartOptions } from "./useChartOptions";
import { Grid, Paper } from "@mui/material";
import { OutcomeTable } from "./OutcomeTable";

export const DashboardCharts = () => {
  const { needsComparisonOptions, demographicsOptions, outcomesOptions } =
    useChartOptions();

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
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 1 }}>
          <HighchartsReact highcharts={Highcharts} options={outcomesOptions} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 1 }}>
          <OutcomeTable outcomes={outcomesOptions.series} />
        </Paper>
      </Grid>
    </Grid>
  );
};
