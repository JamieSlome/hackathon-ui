import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useActivityList, useNeedList } from ".";
import { Activity, Beneficiary } from "../client/src";
import { users } from "../constants";
import { useOrganizationList } from "./useOrganizationList";

export type EditableBeneficiary = Omit<Beneficiary, "dateOfBirth"> & {
  dateOfBirth: Dayjs | null;
};

export const useBeneficiaryData = (userId?: number) => {
  const [loading, setLoading] = useState(!!userId);
  const [formData, setFormData] = useState<EditableBeneficiary>({
    id: 0,
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

  const needsMap = new Map(needsList?.map((n) => [n.id, n]));
  const orgMap = new Map(orgList?.map((org) => [org.id, org]));
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (activitiesList) {
      setActivities(activitiesList);
    }
  }, [activitiesList]);

  useEffect(() => {
    if (userId) {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setFormData({
          ...user,
          dateOfBirth: dayjs(user.dateOfBirth),
        });
        setLoading(false);
      }
    }
  }, [userId]);

  return {
    fullName: `${formData.firstName} ${formData.lastName}`,
    loading,
    setLoading,
    formData,
    setFormData,
    setActivities,
    needsList,
    orgList,
    activities,
    needsMap,
    orgMap,
  };
};
