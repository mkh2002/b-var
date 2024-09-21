"use client";
import Charts, { Props } from "react-apexcharts";
import { Spinner } from "@nextui-org/react";

interface StreamProps {
  isLoading: boolean;
  data: any;
}

export const Stream = ({ data, isLoading }: StreamProps) => {
  const allLike = Object.values(data).flatMap((item: any) => item.stat.coin);
  const allFavorite = Object.values(data).flatMap(
    (item: any) => item.stat.favorite
  );
  const rankData = [
    {
      name: "点赞",
      data: allLike,
    },
    {
      name: "喜欢",
      data: allFavorite,
    },
  ];
  const state: Props["series"] = rankData;

  const options: Props["options"] = {
    chart: {
      type: "area",

      animations: {
        easing: "linear",
        speed: 300,
      },
      sparkline: {
        enabled: false,
      },
      brush: {
        enabled: false,
      },
      id: "basic-bar",
      foreColor: "hsl(var(--nextui-default-800))",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "hsl(var(--nextui-default-200))",
      padding: {
        top: 0,
        right: 15,
        bottom: 0,
        left: 20,
      },
    },

    legend: {
      position: "bottom",
      floating: false,
      horizontalAlign: "center",
      offsetY: 0,
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
      },
    },

    xaxis: {
      categories: `1 2 3 4 5 6`.split(" "),
      floating: false,
      labels: {
        style: {
          colors: "hsl(var(--nextui-default-800))",
        },
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: "hsl(var(--nextui-default-800))",
        },
        formatter: function (val) {
          const value = val / 1000 + "w";
          return value;
        },
      },
    },
    tooltip: {
      shared: true,
      followCursor: true,
    },
    markers: {
      strokeWidth: 0,
    },
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-full items-center justify-center flex relative">
        <span className="font-semibold text-xl">请先关注一位up主吧</span>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div>
          <Charts options={options} series={state} type="area" height={425} />
        </div>
      </div>
    </>
  );
};
