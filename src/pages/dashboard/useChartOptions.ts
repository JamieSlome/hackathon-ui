import { useMemo } from "react";
import { useDashboardData } from "../../data";
import {
  BarSeries,
  PieSeries,
  getAgeGroupIndex,
  getDemographicsConfig,
  getNegativeBarConfig,
  getOutcomesConfig,
} from "./utils";
import { ageRanges, getAge } from "../beneficiaries/Table";
import { OutcomeEvent } from "../../client/src";

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

  const outcomesOptions = useMemo(() => {
    const outcomes = Object.values(OutcomeEvent).map((outcome) => ({
      name: outcome,
      count: 0,
    }));
    const filteredBeneficiaries = beneficiaries?.filter((b) => !!b.outcome);
    filteredBeneficiaries?.forEach((b) => {
      const outcomeIndex = outcomes.findIndex(
        (outcome) => outcome.name === b.outcome
      );
      outcomes[outcomeIndex].count++;
    });

    const finalOutcomes = outcomes
      .filter((o) => o.count > 0)
      .map((outcome) => ({
        ...outcome,
        data: [
          Math.floor(
            (outcome.count / (filteredBeneficiaries?.length || 1)) * 100
          ),
        ],
      }));

    return getOutcomesConfig(finalOutcomes);
  }, [beneficiaries]);

  return {
    needsComparisonOptions,
    demographicsOptions,
    outcomesOptions,
  };
};
