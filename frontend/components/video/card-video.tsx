"use client";
import { useEffect, useState } from "react";
import { VideoProps } from "@/config/type";
import Charts, { Props } from "react-apexcharts";

interface CardVideoProps {
  data: VideoProps[];
}

interface TnameCount {
  name: string;
  value: number;
}

export const CardVideo = ({ data }: CardVideoProps) => {
  const [tnameCounts, setTnameCounts] = useState<TnameCount[]>([]);

  useEffect(() => {
    const tnameCountMap = data.reduce(
      (acc: { [key: string]: number }, item: VideoProps) => {
        acc[item.tname] = (acc[item.tname] || 0) + 1;
        return acc;
      },
      {}
    );

    const tnameCountArray = Object.entries(tnameCountMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    setTnameCounts(
      tnameCountArray.sort((a, b) => b.value - a.value).slice(0, 4)
    );
  }, [data]);

  const state: Props["series"] = tnameCounts.map((item) => item.value);

  const options: Props["options"] = {
    colors: [
      "hsl(var(--nextui-primary-500))",
      "hsl(var(--nextui-primary-400))",
      "hsl(var(--nextui-primary-300))",
      "hsl(var(--nextui-primary-200))",
    ],
    labels: tnameCounts.map((item) => item.name),
    chart: {
      type: "pie",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],

    stroke: {
      show: false,
    },
  };

  return (
    <div>
      <div>
        <Charts type="pie" series={state} options={options} height={300} />
      </div>
    </div>
  );
};
