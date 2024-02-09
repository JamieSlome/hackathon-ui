import { useState } from "react";
import { useQuery } from "react-query";
import { Configuration, NeedApi } from "../client/src";

export const useNeedList = () => {
  const [client] = useState(
    new NeedApi(
      new Configuration({
        basePath: import.meta.env.VITE_API_BASE_URL,
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
