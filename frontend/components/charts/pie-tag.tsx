"use client";
import Charts, { Props as ChartProps } from "react-apexcharts";

interface Props {
  name: string[];
  count: number[];
}

export const PieTag = ({ name, count }: Props) => {
  const series: ChartProps["series"] = count;
  const options: ChartProps["options"] = {
    chart: {},
    grid: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 18,
      },
    },
    labels: name,
    stroke: {
      width: 0,
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "rgb(78,140,239)",
        shadeTo: "light",
        shadeIntensity: 0.75,
      },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
    },
    legend: {
      show: true,
      position: "bottom",
      offsetY: 0,
      floating: true,
      labels: {
        useSeriesColors: false,
        colors: "hsl(var(--next-default-500))",
      },
    },
    dataLabels: {
      enabled: false,
      textAnchor: "start",
      style: {
        fontSize: "10px",
        fontFamily: "Helvetica, Arial, sans-serif",
      },
      dropShadow: {
        enabled: false,
      },
    },
  };
  return (
    <div className="flex items-center justify-center">
      <Charts options={options} series={series} type="pie" width={400} />
    </div>
  );
};
