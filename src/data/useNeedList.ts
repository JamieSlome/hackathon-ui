import { useState } from "react";
import { useQuery } from "react-query";
import { Need, NeedApi } from "../client/src";

const needs = [
  { name: "Housing", id: 1 },
  { name: "Opiate Addiction", id: 2 },
  { name: "Job Training", id: 1 },
] as Need[];

export const useNeedList = () => {
  const [client] = useState(new NeedApi());

  const { data, isLoading } = useQuery(["needs"], async () => {
    return needs;
    // return client.listNeeds();
  });

  return { data, isLoading };
};
