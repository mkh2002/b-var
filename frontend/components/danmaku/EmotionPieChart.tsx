"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/react";

const PieTag = dynamic(
  () => import("@/components/charts/pie-tag").then((mod) => mod.PieTag),
  {
    ssr: false,
  }
);

type AssData = { emotions: { title: string; count: number }[] };

export const EmotionPieChart = ({ cid }: { cid: number }) => {
  const [assData, setAssData] = useState<AssData | null>(null);

  useEffect(() => {
    const fetchAssData = async () => {
      const res = await fetch(`http://localhost:80/api/backend/danmaku/${cid}`);
      const assData = await res.json();
      setAssData(assData);
    };
    fetchAssData();
  }, [cid]);

  if (!assData) {
    return <Spinner />;
  }

  const titles = assData.emotions.map((emotion: any) => emotion.title);
  const counts = assData.emotions.map((emotion: any) => emotion.count);

  return <PieTag name={titles as string[]} count={counts as number[]} />;
};

export default EmotionPieChart;
