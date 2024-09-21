"use client";
import Charts, { Props as ApexProps } from "react-apexcharts";

export const TopChart = ({
  count1,
  count2,
}: {
  count1: number[];
  count2: number[];
}) => {
  const stat: ApexProps["series"] = [
    {
      name: "播放量",
      type: "column",

      data: count1,
    },
    {
      name: "获赞数",
      type: "line",
      data: count2,
    },
  ];

  const options: ApexProps["options"] = {
    chart: {
      type: "line",

      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [4, 4],
    },
    grid: {
      show: false,
      borderColor: "hsl(var(--nextui-default-200))",
      padding: {
        top: 0,
        right: 15,
        bottom: 0,
        left: 20,
      },
    },

    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    xaxis: {
      type: "category",
      labels: {
        show: false,
        style: {
          colors: "hsl(var(--nextui-default-800))",
        },
      },
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    tooltip: {
      followCursor: true,
      marker: {
        show: false,
      },
    },
    yaxis: [
      {
        show: false,
      },
      {
        show: false,
        opposite: true,
      },
    ],
  };
  return (
    <>
      <Charts series={stat} options={options} height={270} />
    </>
  );
};
