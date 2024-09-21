import { Avatar, Button, Card, CardBody, Skeleton } from "@nextui-org/react";
import { CardIcon } from "../icons/card/card-icon";
import { formatNumber } from "@/lib/format";
import Link from "next/link";
import React, { memo } from "react";

interface Stat {
  coin: number;
  like: number;
  view: number;
}

interface Owner {
  face: string;
}

interface DataItem {
  title: string;
  bvid: string;
  stat: Stat;
  owner: Owner;
}

interface Props {
  data: DataItem[];
  isLoading: boolean;
  isFollowing: boolean;
  handleFollow: () => void;
}

const LoadingSkeleton = () => (
  <Card className="bg-default-50 rounded-xl shadow-md px-3">
    <CardBody className="py-5 gap-4">
      <div className="flex gap-2.5 justify-center">
        <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
          <span className="text-default-900 text-xl font-semibold">
            最近视频
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, key) => (
          <div className="grid grid-cols-4 items-center w-full px-4" key={key}>
            <div className="w-full">
              <Skeleton>
                <Avatar isBordered color="secondary" src="" />
              </Skeleton>
            </div>

            <Skeleton className="col-span-3">
              <span className="text-default-900 text-nowrap truncate font-semibold">
                加载中...
              </span>
            </Skeleton>
          </div>
        ))}
        <Skeleton>
          <Button>加载中...</Button>
        </Skeleton>
      </div>
    </CardBody>
  </Card>
);

const NoDataCard = () => (
  <Card className="bg-default-50 rounded-xl shadow-md px-3">
    <CardBody className="py-5 gap-4">
      <div className="flex justify-center">
        <span className="font-semibold text-2xl">快去关注一个吧</span>
      </div>
    </CardBody>
  </Card>
);

const DataCard = ({ data, handleFollow, isFollowing }: Props) => (
  <Card className="bg-default-50 rounded-xl shadow-md px-3">
    <CardBody className="py-5 gap-4">
      <div className="flex gap-2.5 justify-center">
        <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
          <span className="text-default-900 text-xl font-semibold">
            最近视频
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {data.slice(0, 5).map((item, key) => (
          <Link href={`/video/${item.bvid}`} key={key}>
            <div
              className="grid grid-cols-4 items-center w-full px-4"
              key={key}
            >
              <div className="w-full">
                <Avatar
                  src={`/api/profile?imageUrl=${item.owner.face || ""}`}
                />
              </div>

              <span className="text-default-900 text-nowrap truncate font-semibold">
                {item.title || ""}
              </span>
              <div className="text-yellow-500 text-xs gap-0.5 flex items-center">
                <CardIcon.Coin />
                <span>
                  {formatNumber({
                    num: item.stat.coin || 0,
                    toThousand: false,
                  })}
                </span>
              </div>
              <div>
                <span className="flex items-center text-default-500 text-xs">
                  <CardIcon.View />
                  {formatNumber({ num: item.stat.view, toThousand: false })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <FollowButton isFollowing={isFollowing} handleFollow={handleFollow} />
    </CardBody>
  </Card>
);

interface FollowButtonProps {
  isFollowing: boolean;
  handleFollow: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  handleFollow,
}) => {
  return (
    <Button onClick={handleFollow} color={isFollowing ? "default" : "primary"}>
      {isFollowing ? "取消关注" : "关注"}
    </Button>
  );
};

FollowButton.displayName = "FollowButton";

export const CardTransactions = ({
  data,
  isLoading,
  isFollowing,
  handleFollow,
}: Props) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (data.length === 0) {
    return <NoDataCard />;
  }

  return (
    <DataCard
      data={data}
      isLoading={isLoading}
      isFollowing={isFollowing}
      handleFollow={handleFollow}
    ></DataCard>
  );
};
