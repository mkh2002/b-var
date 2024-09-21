"use client";
import { Skeleton, Spinner, Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { CardRankGroup } from "./card-rank-group";
import { useRank } from "../../hooks/useRank";
import { useUserVideoRank } from "../../hooks/useUserVideoRank";
import useFollow from "@/hooks/useFollow";
import CardTrack from "./card-track";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Stream),
  {
    ssr: false,
  }
);

const CardTransactions = dynamic(
  () => import("./card-transactions").then((mod) => mod.CardTransactions),
  {
    ssr: false,
  }
);

export const Content = () => {
  const { rank, isLoading: isRankLoading } = useRank();
  const [activeMid, setActiveMid] = useState<number | null>(null);
  const { data, loading: isUserVideoRankLoading } = useUserVideoRank(activeMid);

  const {
    isFollowing,
    isLoading: isFollowingLoading,
    handleFollow,
  } = useFollow(activeMid ?? 0);

  useEffect(() => {
    if (!isRankLoading && rank.length > 0) {
      setActiveMid(rank[0].mid);
    }
  }, [isRankLoading, rank]);

  const handleActiveClick = (mid: number) => {
    setActiveMid(mid);
  };

  if (isRankLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full grow lg:px-6">
      <div className="flex justify-center xl:gap-6 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full h-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl">热门视频TOP3</h3>
            <div>
              <CardRankGroup data={rank} />
            </div>
          </div>

          {/* 数据对比 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">数据对比</h1>
            <div className="w-full h-[30rem] bg-default-50 shadow-lg rounded-2xl p-6">
              <Chart data={data} isLoading={isUserVideoRankLoading} />
            </div>
          </div>
        </div>

        {/* 关注追踪 */}
        <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
          <h3 className="font-semibold text-xl">数据追踪</h3>
          <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
            <CardTrack
              track={rank}
              activeMid={activeMid}
              handleActiveClick={handleActiveClick}
            />
            {activeMid !== null && (
              <>
                <CardTransactions
                  data={data}
                  isLoading={isUserVideoRankLoading}
                  isFollowing={isFollowing}
                  handleFollow={handleFollow}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
