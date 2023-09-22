import { useActivityList, useBeneficiaryList, useNeedList } from ".";
import { useOrganizationList } from "./useOrganizationList";

export const useDashboardData = () => {
  const { data: organizations } = useOrganizationList();

  const { data: beneficiaries } = useBeneficiaryList();

  const { data: needs } = useNeedList();

  const { data: activities } = useActivityList();

  return {
    activities,
    organizations,
    beneficiaries,
    needs,
  };
};
