import { useState } from "react";
import { useQuery } from "react-query";
import { BeneficiaryApi, Configuration } from "../client/src";

export const useBeneficiaryList = () => {
  const [client] = useState(
    new BeneficiaryApi(
      new Configuration({
        basePath: "https://pttmuyg4gp.us-east-1.awsapprunner.com",
      })
    )
  );

  const { data, isLoading } = useQuery(["beneficiaries"], async () => {
    return client.listBeneficiaries();
  });

  return { data, isLoading };
};
