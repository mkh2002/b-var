import { getUserVideo, getVideo } from "@/lib/fetch-data";
import { useEffect, useState } from "react";

export const useUserVideoRank = (mid: number | null) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mid !== null) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const responseData = await getUserVideo(mid);
          const videoList = responseData.list.vlist;
          const processedData = await Promise.all(
            videoList.slice(0, 6).map(async (item: any) => {
              const bvid = item.bvid;
              const videoData = await getVideo(bvid);
              return videoData;
            })
          );
          setData(processedData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [mid]);

  return { data, loading };
};
