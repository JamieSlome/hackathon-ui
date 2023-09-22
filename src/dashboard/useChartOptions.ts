import { useMemo } from "react";
import { useDashboardData } from "../data";
import {
  BarSeries,
  PieSeries,
  getAgeGroupIndex,
  getDemographicsConfig,
  getNegativeBarConfig,
} from "./utils";
import { ageRanges, getAge } from "../pages/beneficiaries/Table";

export const useChartOptions = () => {
  const { needs, organizations, beneficiaries } = useDashboardData();

  const needsComparisonOptions = useMemo(() => {
    const positiveSeries: BarSeries = {
      name: "Organizations",
      data: [],
    };
    const negativeSeries: BarSeries = {
      name: "Beneficiaries",
      data: [],
    };
    const categories: string[] = [];

    needs?.forEach((need) => {
      categories.push(need.name!);
      positiveSeries.data.push(
        (organizations || []).filter((organization) =>
          organization.needs?.includes(need.id)
        ).length
      );
      negativeSeries.data.push(
        (beneficiaries || []).filter((beneficiary) =>
          beneficiary.needs?.includes(need.id)
        ).length * -1
      );
    });

    return getNegativeBarConfig({
      title: "Required Needs to Provided",
      categories,
      positiveSeries,
      negativeSeries,
    });
  }, [needs, beneficiaries, organizations]);

  const demographicsOptions = useMemo(() => {
    const series: PieSeries = {
      name: "Beneficiaries",
      data: ageRanges.map((range) => ({ name: range.label, y: 0 })),
      innerSize: "75%",
    };
    const categories: string[] = ageRanges.map((range) => range.label);

    beneficiaries?.forEach((b) => {
      const ageIndex = getAgeGroupIndex(getAge(b.dateOfBirth!));
      series.data[ageIndex].y++;
    });

    series.data = series.data.filter((data) => data.y > 0);

    return getDemographicsConfig({
      title: "Beneficiary Age Group Count",
      categories,
      series,
    });
  }, [beneficiaries]);

  return {
    needsComparisonOptions,
    demographicsOptions,
  };
};
