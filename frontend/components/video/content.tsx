"use client";
import { VideoProps } from "@/config/type";
import { useEffect, useState } from "react";
import { getRank } from "@/lib/fetch-data";
import dynamic from "next/dynamic";
import { TableVideo } from "./table-video";
import { Spinner } from "@nextui-org/react";

const Chart = dynamic(
  () =>
    import("../charts/video-views-comparison").then(
      (mod) => mod.VideoViewsComparisonChart
    ),
  {
    ssr: false,
  }
);

const PieTag = dynamic(
  () => import("../charts/pie-tag").then((mod) => mod.PieTag),
  {
    ssr: false,
  }
);

const CardStar = dynamic(
  () => import("./card-star").then((mod) => mod.CardStar),
  {
    ssr: false,
  }
);
interface Props {
  aid: number;
  bvid: string;
  tname: string;
  view: number;
  duration: number;
  mid: number;
  title: string;
  owner: string;
}

export const Content = () => {
  const [data, setData] = useState<Props[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRank();
      setData(data);
      setLoading(false); // Update loading state when data is loaded
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grow h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const tagCount = data.reduce((acc: Record<string, number>, cur) => {
    if (!acc[cur.tname]) {
      acc[cur.tname] = 0;
    }
    acc[cur.tname] += 1;
    return acc;
  }, {});

  const sortedTagCount = Object.entries(tagCount).sort(
    (a: any, b: any) => b[1] - a[1]
  );

  const result = sortedTagCount.slice(0, 5);

  return (
    <div className="h-full grow lg:px-6">
      <div className="flex justify-center gap-4 xl:gap-6  px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full ">
        <div className="gap-6 flex flex-col w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">热门视频列表</h1>
            <div className=" shadow-md rounded-xl">
              <TableVideo data={data} />
            </div>
          </div>

          {/* VVC */}
          <div className="gap-2.5 flex flex-col w-full">
            <h1 className="text-xl font-semibold">热门视频数据分析</h1>

            <div>
              <Chart data={data} />
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-full flex flex-col  gap-2 xl:max-w-md">
          {/* tag pie */}

          <h1 className="text-xl font-semibold">标签分布</h1>

          <div className="flex flex-col gap-6">
            <div className="px-6 py-4 bg-default-50  rounded-xl shadow-md">
              <PieTag
                name={result.map((item) => item[0])}
                count={result.map((item) => item[1])}
              />
            </div>

            {/* Star*/}
            <div className="w-full px-6 py-6 bg-default-50 rounded-xl shadow-md flex flex-col items-center h-full">
              <span className="text-xl font-semibold px-4 py-2.5 border border-dashed border-divider rounded-xl">
                {"🏆 最佳视频得主"}
              </span>
              <CardStar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
