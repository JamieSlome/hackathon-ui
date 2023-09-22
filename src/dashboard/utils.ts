import Highcharts, { FormatterCallbackFunction } from "highcharts";
import { Beneficiary, Organization } from "../client/src";
import { ageRanges } from "../pages/beneficiaries/Table";

// Custom template helper
Highcharts.Templating.helpers.abs = (value) => Math.abs(value);

export const getAgeGroupIndex = (age: number): number => {
  return ageRanges.findIndex((group) => {
    return age >= group.min && age <= group.max;
  });
};

export interface BarSeries {
  name: string;
  data: number[];
  innerSize?: string;
}

export interface PieSeries {
  name: string;
  data: { name: string; y: number }[];
  innerSize?: string;
}

export interface ComparisonChartProps {
  categories: string[];
  positiveSeries: BarSeries;
  negativeSeries: BarSeries;
  title: string;
}

export interface DemographicChartProps {
  categories: string[];
  series: PieSeries;
  title: string;
}

export const getNeedCount = (
  needId: string,
  beneficiaries: Beneficiary[],
  organizations: Organization[]
) => {
  const organizationCount = organizations.filter((organization) =>
    organization.needs?.includes(needId)
  ).length;
  const beneficiaryCount = beneficiaries.filter((beneficiary) =>
    beneficiary.needs?.includes(needId)
  ).length;
  return {
    organizationCount,
    beneficiaryCount,
  };
};

export const getNegativeBarConfig = ({
  title,
  categories,
  positiveSeries,
  negativeSeries,
}: ComparisonChartProps) => {
  return {
    chart: {
      type: "bar",
    },
    title: {
      text: title,
    },
    xAxis: [
      {
        categories: categories,
        reversed: false,
        labels: {
          step: 1,
        },
      },
      {
        // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
          step: 1,
        },
      },
    ],
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        format: "{abs value}",
      },
    },

    plotOptions: {
      series: {
        stacking: "normal",
        borderRadius: "50%",
      },
    },
    tooltip: {
      format: "<b>{series.name}, {point.category}</b><br/>" + "{(abs point.y)}",
    },
    credits: {
      enabled: false,
    },
    series: [negativeSeries, positiveSeries],
  };
};

export const getDemographicsConfig = ({
  title,
  categories,
  series,
}: DemographicChartProps) => ({
  chart: {
    type: "pie",
  },
  title: {
    text: title,
  },
  xAxis: {
    categories,
  },
  yAxis: {
    title: {
      text: "Population",
    },
  },
  plotOptions: {
    pie: {
      size: 200,
      dataLabels: {
        formatter: function () {
          return (
            `<b>Age: ${this.point.name}</b>` +
            ": " +
            Highcharts.numberFormat(this.point.percentage, 1) +
            " %"
          );
        } as FormatterCallbackFunction<Highcharts.Point>,
      },
    },
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    format: "<b>{point.name}</b>: " + "{(abs point.y)}",
  },
  series: [series],
});
