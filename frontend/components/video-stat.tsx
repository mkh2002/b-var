import { VideoProps } from "@/config/type";
import { CardIcon } from "./icons/card/card-icon";
import { formatNumber } from "@/lib/format";

export const VideoStat = ({ stat }: { stat: VideoProps["stat"] }) => {
  return (
    <div className="flex gap-1.5 text-default-600">
      <div className="flex items-center gap-2">
        <div className="flex  items-center gap-1">
          <CardIcon.Coin className="text-yellow-400" />
          <span className="text-xs">{formatNumber({ num: stat.coin })}</span>
        </div>
        <span className="text-xs">硬币</span>
      </div>

      <div className="flex  items-center gap-2">
        <div className="flex items-center gap-1">
          <CardIcon.Like className="text-red-400" />
          <span className="text-xs">
            {formatNumber({ num: stat.like, toThousand: false })}
          </span>
        </div>
        <span className="text-xs">点赞</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <CardIcon.View className=" text-cyan-400" />
          <span className="text-xs">
            {formatNumber({ num: stat.view, toThousand: false })}
          </span>

          <span className="text-xs">观看</span>
        </div>
      </div>
    </div>
  );
};
