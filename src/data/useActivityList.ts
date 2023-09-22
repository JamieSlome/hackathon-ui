import { useState } from "react";
import { useQuery } from "react-query";
import {
  ActivityApi,
  Configuration,
  ListActivitiesRequest,
} from "../client/src";

export const useActivityList = (req?: ListActivitiesRequest) => {
  const [client] = useState(
    new ActivityApi(
      new Configuration({
        basePath: "https://pttmuyg4gp.us-east-1.awsapprunner.com",
      })
    )
  );

  const { data, isLoading } = useQuery(["activities", req], async () => {
    return client.listActivities(req);
  });

  return { data, isLoading };
};
