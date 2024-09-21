import { Card, CardBody, Link } from "@nextui-org/react";
import { TagIcon } from "../icons/tag-icon";
import { CardIcon } from "../icons/card/card-icon";
import { formatNumber } from "@/lib/format";

interface Props {
  title: string;
  owner: string;
  tname: string;
  className?: string;
  coin: number;
  like: number;
  mid: number;
  view: number;
  bvid: string;
  linkColor?: string; // 新增属性
}
export const CardRank = ({
  title,
  owner,
  className,
  tname,
  coin,
  like,
  mid,
  linkColor,
  bvid,
  view,
}: Props) => {
  return (
    <Card
      className={`xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full ${className}`}
    >
      <CardBody className=" overflow-hidden py-5">
        <div className="flex gap-2.5">
          <CardIcon.Header className=" text-foreground" />
          <div className="flex flex-col w-4/5">
            <Link href={`video/${bvid}`} className={`${linkColor ?? ""}`}>
              <span className=" truncate">{title}</span>
            </Link>
            <Link href={`video/${bvid}`} className={` ${linkColor ?? ""}`}>
              <span className="text-xs">{owner}</span>
            </Link>
          </div>
        </div>

        <div className="flex gap-1 text-xl font-semibold py-2 items-center">
          <TagIcon className="w-4 h-4 " />
          <span> {tname}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <CardIcon.Coin className="text-yellow-400" />
              <span className="text-xs">
                {formatNumber({ num: coin, toThousand: false })}
              </span>
            </div>
            <span className="text-xs">硬币</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <CardIcon.Like className="text-red-400" />
              <span className="text-xs">
                {formatNumber({ num: like, toThousand: false })}
              </span>
            </div>
            <span className="text-xs">点赞</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <CardIcon.View className=" text-cyan-400" />
              <span className="text-xs">
                {formatNumber({ num: view, toThousand: false })}
              </span>
            </div>
            <span className="text-xs">观看</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
