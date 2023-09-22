import { useState } from "react";
import { Beneficiary, BeneficiaryApi } from "../client/src";
import { useQuery } from "react-query";

function generateBeneficiaries(): Beneficiary[] {
  const beneficiaries: Beneficiary[] = [];

  for (let i = 0; i < 20; i++) {
    const needs = new Set<number>();
    while (needs.size < 3) {
      needs.add(Math.floor(Math.random() * 10) + 1);
    }
    beneficiaries.push({
      id: i + 1,
      firstName: `First${i + 1}`,
      lastName: `Last${i + 1}`,
      dateOfBirth: new Date(1990 + i, 0, 1),
      identity: `ID${i + 1}`,
      phoneNumber: `555-555-${i + 1}`,
      cabinNumber: i + 1,
      needs: Array.from(needs),
      comments: `Comments for beneficiary ${i + 1}`,
    });
  }

  return beneficiaries;
}

const mockBeneficiaries = generateBeneficiaries();

export const useBeneficiaryList = () => {
  const [client] = useState(new BeneficiaryApi());

  const { data, isLoading } = useQuery(["beneficiaries"], async () => {
    // return client.listBeneficiaries();
    return mockBeneficiaries;
  });

  return { data, isLoading };
};
