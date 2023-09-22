import { FormControlLabel, Grid, Switch } from "@mui/material";
import { Activity } from "../client/src";
import {ActivityTimeline} from "../components";
import { useState } from "react";

const activities: Activity[] = [
    {
      id: 1,
      organizationId: 1,
      beneficiaryId: 1,
      needId: 1,
      startDate: new Date("2022-01-01"),
      endDate: new Date("2022-01-07"),
      status: 'IN_PROGRESS',
      comments: "This is a comment",
    },
    {
      id: 2,
      organizationId: 2,
      beneficiaryId: 2,
      needId: 2,
      startDate: new Date("2022-02-01"),
      endDate: new Date("2022-02-07"),
      status: 'IN_PROGRESS',
      comments: "This is another comment",
    },
    {
      id: 3,
      organizationId: 3,
      beneficiaryId: 3,
      needId: 3,
      startDate: new Date("2022-03-01"),
      endDate: new Date("2022-03-07"),
      status: 'COMPLETED',
      comments: "This is a third comment",
    },
  ];

export const TimelineTab = () => {

    const [hideFinished, setHideFinished] = useState(false);

    return (
    <Grid container>
        <Grid item xs={12}>
        <FormControlLabel onChange={(_e, v) => setHideFinished(v)} control={<Switch />} label="Hide Complete" />
            <ActivityTimeline activities={activities} hideFinished={hideFinished}/>
        </Grid>
    </Grid>)

}