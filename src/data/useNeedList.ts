import { useState } from "react";
import { useQuery } from "react-query";
import { Configuration, NeedApi } from "../client/src";

export const useNeedList = () => {
  const [client] = useState(
    new NeedApi(
      new Configuration({
        basePath: "https://pttmuyg4gp.us-east-1.awsapprunner.com",
      })
    )
  );

  const { data, isLoading } = useQuery(["needs"], async () => {
    try {
      const n = await client.listNeeds();
      return n;
    } catch (err) {
      return [];
    }
  });

  return { data, isLoading };
};
