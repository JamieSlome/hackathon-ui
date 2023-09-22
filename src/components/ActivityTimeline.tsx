import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, Paper, Typography } from '@mui/material';
import { Activity } from '../client/src';
import { TimelineOppositeContent } from '@mui/lab';

export const ActivityTimeline = ({
  activities,
  hideFinished = false,
}: { activities: Activity[], hideFinished?: boolean }) => {

  const filteredActivities = React.useMemo(() => (activities.filter(activity => (!hideFinished || hideFinished && activity.status !== 'COMPLETED'))), [activities, hideFinished]);

  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}>
      {filteredActivities.map((activity, i) => (
        <TimelineItem key={activity.id}>
          <TimelineOppositeContent sx={{flex: '.1', minWidth: '75px'}} color="textSecondary">
          {activity.startDate?.toLocaleDateString()}
        </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant={activity.status === 'IN_PROGRESS' ? 'outlined' : 'filled'} />
            {i < filteredActivities.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper sx={{p: '8px'}}>
              <Box sx={{display: 'flex', gap: 1}}>
                <Typography>{activity.needId}</Typography>
                <Typography>provided by:</Typography>
                <Typography>{activity.organizationId}</Typography>
              </Box>
              <Box my={2}>
                <Typography>{activity.comments}</Typography>
              </Box>
            </Paper>
          </TimelineContent>
        </TimelineItem>))}
    </Timeline>
  );
}