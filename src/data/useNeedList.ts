import { useState } from "react";
import { Need, NeedApi } from "../client/src";
import { useQuery } from "react-query";

const needs: Need[] = [];

for (let i = 0; i < 10; i++) {
  const need: Need = {
    id: i + 1,
    name: `Need ${i + 1}`,
    description: `Description for Need ${i + 1}`,
    alternativeName: `Alternative Name for Need ${i + 1}`,
  };
  needs.push(need);
}

export const useNeedList = () => {
  const [client] = useState(new NeedApi());

  const { data, isLoading } = useQuery(["needs"], async () => {
    // return client.listNeeds();
    return needs;
  });

  return { data, isLoading };
};
