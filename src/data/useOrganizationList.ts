import { useState } from "react";
import { useQuery } from "react-query";
import { Configuration, OrganizationApi } from "../client/src";

export const useOrganizationList = (needId?: string) => {
  const [client] = useState(
    new OrganizationApi(
      new Configuration({
        basePath: import.meta.env.VITE_API_BASE_URL,
      })
    )
  );

  const { data, isLoading } = useQuery(["organizations", needId], async () => {
    const req = needId ? { needId } : {};
    return client.listOrganizations(req);
  });

  return { data, isLoading };
};
