import { useCallback, useEffect } from "react";
import { useOrganizationList } from "./useOrganizationList";
import { useBeneficiaryList } from "./useBeneficiaryList";

export const useNameMaps = () => {
  const organizationNameMap: Record<number, string> = {};
  const beneficiaryNameMap: Record<number, string> = {};
  const needNameMap: Record<number, string> = {};

  const { data: organizations } = useOrganizationList();

  const { data: beneficiaries } = useBeneficiaryList();

  const { data: needs } = useOrganizationList();

  useEffect(() => {
    organizations?.forEach((organization) => {
      organizationNameMap[organization.id!] = organization.name as string;
    });
  }, [organizations]);

  useEffect(() => {
    needs?.forEach((need) => {
      needNameMap[need.id!] = need.name as string;
    });
  }, [organizations]);

  useEffect(() => {
    beneficiaries?.forEach((beneficiary) => {
      beneficiaryNameMap[
        beneficiary.id!
      ] = `${beneficiary.lastName}, ${beneficiary.firstName}`;
    });
  }, [organizations]);

  const getOrganizationName = useCallback(
    (id: number) => {
      return organizationNameMap[id];
    },
    [organizationNameMap]
  );

  const getBeneficiaryName = useCallback(
    (id: number) => {
      return beneficiaryNameMap[id];
    },
    [beneficiaryNameMap]
  );

  const getNeedName = useCallback(
    (id: number) => {
      return needNameMap[id];
    },
    [needNameMap]
  );

  return {
    organizationNameMap,
    beneficiaryNameMap,
    needNameMap,
    getOrganizationName,
    getBeneficiaryName,
    getNeedName,
  };
};
