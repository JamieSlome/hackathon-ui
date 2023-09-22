import { useCallback, useEffect } from "react";
import { useOrganizationList } from "./useOrganizationList";
import { useBeneficiaryList } from "./useBeneficiaryList";

export const useNameMaps = () => {
    const organizationNameMap = {};
    const beneficiaryNameMap = {};
    const needNameMap = {};

    const {
        data: organizations
    } = useOrganizationList();

    const {
        data: beneficiaries
    } = useBeneficiaryList();

    const {
        data: needs
    } = useOrganizationList();

    useEffect(() => {
        organizations?.forEach((organization) => {
            organizationNameMap[organization.id!] = organization.name;
        });
    }, [organizations]);

    useEffect(() => {
        needs?.forEach((need) => {
            needNameMap[need.id!] = need.name;
        });
    }, [organizations]);

    useEffect(() => {
        beneficiaries?.forEach((beneficiary) => {
            beneficiaryNameMap[beneficiary.id!] = `${beneficiary.lastName}, ${beneficiary.firstName}`;
        });
    }, [organizations]);

    const getOrganizationName = useCallback((id: string) => {
        return organizationNameMap[id];
    }, [organizationNameMap]);

    const getBeneficiaryName = useCallback((id: string) => {
        return beneficiaryNameMap[id];
    }, [beneficiaryNameMap]);

    const getNeedName = useCallback((id: string) => {
        return needNameMap[id];
    }, [needNameMap]);

    return {
        organizationNameMap,
        beneficiaryNameMap,
        needNameMap,
        getOrganizationName,
        getBeneficiaryName,
        getNeedName,
    }
}
