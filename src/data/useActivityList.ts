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
        basePath: import.meta.env.VITE_API_BASE_URL,
      })
    )
  );

  const { data, isLoading } = useQuery(["activities", req], async () => {
    return client.listActivities(req);
  });

  return { data, isLoading };
};
