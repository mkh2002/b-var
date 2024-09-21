import { VideoProps } from "@/config/type";
import Charts, { Props as ChartProps } from "react-apexcharts";
import clsx from "clsx";

interface Props {
  data: {
    view: number;
    duration: number;
  }[];
}

export const VideoViewsComparisonChart = ({ data }: Props) => {
  const durcationGroup = [
    {
      name: "1分内",
      min: 0,
      max: 60,
    },
    {
      name: "2分",
      min: 60,
      max: 120,
    },
    {
      name: "3分",
      min: 120,
      max: 180,
    },
    {
      name: "5分",
      min: 180,
      max: 300,
    },
    {
      name: "10分",
      min: 300,
      max: 600,
    },
    {
      name: "15分",
      min: 300,
      max: 900,
    },
    {
      name: "30分+",
      min: 900,
      max: Infinity,
    },
  ];

  const VCData = durcationGroup.map((item) => {
    const views = data
      .filter(
        (video) => video.duration > item.min && video.duration <= item.max
      )
      .reduce((acc, cur) => acc + cur.view, 0);
    return views;
  });

  const stat: ChartProps["series"] = [
    {
      name: "观看量",
      data: VCData,
    },
  ];

  const options: ChartProps["options"] = {
    chart: {
      offsetX: 0,
      animations: {
        speed: 300,
        easing: "linear",
      },

      brush: {
        enabled: false,
      },

      stacked: false,

      toolbar: {
        show: false,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },

    grid: {
      borderColor: "hsl(var(--nextui-default-50))",
      padding: {
        top: -30,
        right: 0,
        bottom: -8,
        left: 12,
      },
    },

    markers: {
      strokeColors: "hsl(var(--nextui-primary-400))",
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
    },
    colors: ["hsl(var(--nextui-primary-400))"],

    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            opacity: 0.2,
            color: "hsl(var(--nextui-default-500))",
          },
          {
            offset: 100,
            opacity: 0,
            color: "hsl(var(--nextui-primary-500))",
          },
        ],
      },
    },

    xaxis: {
      categories: durcationGroup.map((item) => item.name),
      labels: {
        show: true,
        style: {
          colors: "hsl(var(--nextui-default-900))",
        },
      },
      floating: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
      },
    },

    yaxis: {
      show: false,
      labels: {
        formatter: function (val, index) {
          const num = val / 10000 + "万";
          return num;
        },
      },
    },
  };

  return (
    <div className="w-full relative bg-default-50 rounded-xl px-6 py-4 shadow-md">
      <div className={clsx(`w-full relative h-full`)}>
        <h2 className="text-2xl font-medium">播放量分析</h2>
        <p className=" text-sm tracking-widest">时长播放量对比</p>
        <div
          className={clsx(
            "w-3.5 h-3.5 bg-primary-500 absolute rounded-full z-50 top-5 right-2.5 after:w-3.5 after:h-3.5 after:bg-primary-500/50 after:rounded-full after:absolute after:animate-ping after:-z-1 after:border-primary-500"
          )}
        />
        <div id="card" />
        <Charts series={stat} options={options} type="area" height={280} />
      </div>
    </div>
  );
};
