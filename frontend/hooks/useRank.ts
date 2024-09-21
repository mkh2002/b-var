import { useEffect, useState } from "react";
import { getRank } from "@/lib/fetch-data";

export interface RankProps {
  bvid: string;
  coin: number;
  face: string;
  like: number;
  mid: number;
  owner: string;
  pic: string;
  title: string;
  tname: string;
  view: number;
}

export const useRank = () => {
  const [rank, setRank] = useState<RankProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRank();
      setRank(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { rank, isLoading };
};
