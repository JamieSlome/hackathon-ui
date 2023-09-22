import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useActivityList, useNeedList } from ".";
import {
  Activity,
  Beneficiary,
  BeneficiaryApi,
  Configuration,
} from "../client/src";
import { useOrganizationList } from "./useOrganizationList";

export type EditableBeneficiary = Omit<Beneficiary, "dateOfBirth"> & {
  dateOfBirth: Dayjs | null;
};

export const useBeneficiaryData = (userId?: string) => {
  const [loading, setLoading] = useState(!!userId);
  const [formData, setFormData] = useState<EditableBeneficiary>({
    id: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    identity: "",
    phoneNumber: "",
    cabinNumber: 1,
    needs: [],
    comments: "",
  });

  const { data: needsList } = useNeedList();
  const { data: activitiesList } = useActivityList({ beneficiaryId: userId });
  const { data: orgList } = useOrganizationList();

  const needsMap = new Map(needsList?.map((n) => [n.id?.toString(), n]));
  const orgMap = new Map(orgList?.map((org) => [org.id?.toString(), org]));
  const [activities, setActivities] = useState<Activity[]>([]);
  const [hasOutcome, setHasOutcome] = useState(false);

  useEffect(() => {
    if (activitiesList) {
      setActivities(activitiesList);
    }
  }, [activitiesList]);

  useEffect(() => {
    if (userId) {
      const beneficiaryApi = new BeneficiaryApi(
        new Configuration({
          basePath: "https://pttmuyg4gp.us-east-1.awsapprunner.com",
        })
      );
      beneficiaryApi.findBeneficiary({ id: userId }).then((b) => {
        setFormData({
          ...b,
          dateOfBirth: dayjs(b.dateOfBirth),
        });
        setLoading(false);
        setHasOutcome(!!b.outcome);
      });
    }
  }, [userId]);

  return {
    fullName: `${formData.firstName} ${formData.lastName}`,
    loading,
    setLoading,
    formData,
    setFormData,
    setActivities,
    activitiesList,
    needsList,
    orgList,
    activities,
    hasOutcome,
    needsMap,
    orgMap,
  };
};
