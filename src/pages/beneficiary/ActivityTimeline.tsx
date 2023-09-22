import { TimelineOppositeContent } from "@mui/lab";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Box, Chip, LinearProgress, Paper, Typography } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { useBeneficiaryData } from "../../data/useBeneficiaryData";

export const ActivityTimeline = ({
  hideFinished = false,
  userId,
}: {
  hideFinished?: boolean;
  userId: number;
}) => {
  const { activities, fullName, orgMap, needsMap } = useBeneficiaryData(userId);
  const filteredActivities = React.useMemo(
    () =>
      activities?.filter(
        (activity) =>
          !hideFinished || (hideFinished && activity.status !== "COMPLETED")
      ),
    [activities, hideFinished]
  );

  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {!filteredActivities ? (
        <LinearProgress />
      ) : (
        filteredActivities.map((activity, i) => {
          const need = needsMap.get(activity.needId)?.name as string;
          const org = orgMap.get(activity.organizationId)?.name as string;
          return (
            <TimelineItem key={activity.id}>
              <TimelineOppositeContent
                sx={{ flex: ".1", minWidth: "75px" }}
                color="textSecondary"
              >
                {activity.startDate?.toLocaleDateString()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  variant={
                    activity.status === "IN_PROGRESS" ? "outlined" : "filled"
                  }
                />
                {i < filteredActivities.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper sx={{ p: "8px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 1,
                    }}
                  >
                    <Chip label={need} />
                    <Typography variant="body2">
                      {new Date(activity.startDate!).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1ch",
                      alignItems: "center",
                      padding: 1,
                    }}
                  >
                    {fullName} began work with{" "}
                    <Link to={`/providers/${activity.organizationId}`}>
                      {org}
                    </Link>{" "}
                    on {need.toLocaleLowerCase()}
                  </Box>

                  <Box my={2} p={1}>
                    <Typography variant="caption">
                      {activity.comments}
                    </Typography>
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          );
        })
      )}
    </Timeline>
  );
};
