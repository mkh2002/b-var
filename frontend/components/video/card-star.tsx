import { useEffect, useState } from "react";
import {
  addFollow,
  checkFollow,
  getStar,
  getUser,
  unFollow,
} from "@/lib/fetch-data";
import { Avatar, Button, Link, Spinner } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { CardIcon } from "../icons/card/card-icon";
import { formatNumber } from "@/lib/format";
import useFollow from "@/hooks/useFollow";

type Star = {
  mid: number;
  title: string;
  view: number;
  coin: number;
  bvid: number;
  like: number;
  owner: string;
  tname: string;
  date: number;
};

type User = {
  face: string;
  level: number;
  follower: number;
  name: string;
  sign: string;
};

export const CardStar = () => {
  const [data, setData] = useState<Star | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { isFollowing, handleFollow } = useFollow(data?.mid ?? 0);
  const [isLoading, setIsLoading] = useState(true); // 添加 loading 状态

  useEffect(() => {
    const fetchStarAndUser = async () => {
      try {
        const starData = await getStar();
        setData(starData);

        if (starData) {
          const userData = await getUser(starData.mid);
          setUser(userData);
        }

        setIsLoading(false); // 数据加载完成后设置 loading 为 false
      } catch (error) {
        console.error("Error fetching star and user data:", error);
        setIsLoading(false); // 发生错误时也要设置 loading 为 false
      }
    };
    fetchStarAndUser();
  }, []);

  if (isLoading || !data || !user) {
    return (
      <div className="w-full flex px-4 py-6 justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 pt-6">
      <div className="flex w-full gap-2 items-center px-4">
        <Link href={"/user/" + data.mid}>
          <Avatar
            isBordered
            color="primary"
            src={`/api/profile?imageUrl=${user.face}`}
            size="lg"
          />
        </Link>
        <div className="flex flex-col justify-center gap-1.5">
          <span>
            {user.name}{" "}
            <sup className="p-0.5 rounded text-tiny">Level {user.level}</sup>
          </span>
          <span className="text-tiny text-default-500">
            {user.sign === "" ? "这个家伙还没有个性签名" : user.sign}
          </span>
        </div>
        <div className="ml-auto">
          <Button
            size="md"
            color={isFollowing ? "default" : "primary"}
            onClick={handleFollow} // Pass handleFollow as onClick handler
          >
            {isFollowing ? "取消关注" : "关注"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col h-full w-full bg-default-100 gap-2 rounded-xl px-4 py-5">
        <Link href={"/video/" + data.bvid} color="foreground">
          <div className="">{data.title}</div>
        </Link>
        <span className="text-xs">
          {new Date(data.date)
            .toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\//g, "-")}
        </span>
        <div>
          <span className="px-2 py-1 bg-primary-400/50 text-primary-600 rounded text-tiny font-medium">
            {data.tname}
          </span>
        </div>
        <div className="flex gap-4 mt-auto">
          <div className="flex gap-1">
            <CardIcon.Like className=" text-secondary-500" />
            {formatNumber({ num: data.like, toThousand: false })}
          </div>
          <div className="flex gap-1">
            <CardIcon.View className=" text-success-500" />
            {formatNumber({ num: data.view, toThousand: false })}
          </div>
          <div className="flex gap-1">
            <CardIcon.Coin className=" text-yellow-500" />
            {formatNumber({ num: data.coin, toThousand: false })}
          </div>
        </div>
      </div>
    </div>
  );
};
