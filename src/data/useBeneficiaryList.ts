import { useState } from "react";
import { useQuery } from "react-query";
import { BeneficiaryApi, Configuration } from "../client/src";

export const useBeneficiaryList = () => {
  const [client] = useState(
    new BeneficiaryApi(
      new Configuration({
        basePath: import.meta.env.VITE_API_BASE_URL,
      })
    )
  );

  const { data, isLoading } = useQuery(["beneficiaries"], async () => {
    return client.listBeneficiaries();
  });

  return { data, isLoading };
};
