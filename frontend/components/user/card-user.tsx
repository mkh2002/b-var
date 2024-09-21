"use client";
import { UserStatProps, VideoProps } from "@/config/type";
import useFollow from "@/hooks/useFollow";
import { formatNumber } from "@/lib/format";
import { Avatar, Button, Link } from "@nextui-org/react";
import {
  Users,
  Youtube,
  GalleryHorizontalEnd,
  Heart,
  ListVideo,
  UserRoundCheck,
  ThumbsUp,
  Eye,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import { CardIcon } from "../icons/card/card-icon";
interface Props {
  data: {
    name: string;
    mid: number;
    face: string;
    follower: number;
    following: number;
    sign: string;
  };
  stat: UserStatProps;
  overview: {
    video: number;
    album: number;
  };
  master: VideoProps[];
}

export const CardUser = ({ data, stat, overview, master }: Props) => {
  const { isFollowing, handleFollow } = useFollow(data.mid);

  return (
    <div className="flex flex-col gap-2.5 px-6 py-4 bg-default-50 h-full rounded-xl shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2.5 w-full">
          <div>
            <Avatar
              src={`/api/profile?imageUrl=${data.face}`}
              size="lg"
              isBordered
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <p className=" font-semibold text-md">{data.name}</p>
            <p className="text-xs text-default-600">
              {data.sign ? data.sign : "这个人还没有个性签名"}
            </p>
          </div>
          <div className="ml-auto self-center">
            <Button
              color={isFollowing ? "default" : "primary"}
              onClick={handleFollow}
            >
              {isFollowing ? "取消关注" : "关注"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-center justify-center gap-6 xl:px-14">
          <div className="px-6 py-6 bg-default-100 rounded-xl flex flex-col gap-4">
            <div className="flex gap-1.5 text-md">
              <Users />
              <span>{data.follower} 位粉丝</span>
            </div>
            <div className="flex gap-1.5 text-md">
              <UserRoundCheck />
              <span> {data.following} 正在关注</span>
            </div>
          </div>
          <div className="px-6 py-6 bg-default-100 rounded-xl flex flex-col gap-4">
            <div className="flex gap-1.5 text-md">
              <Heart />
              <span>
                {formatNumber({ num: stat.likes, toThousand: false })} 总点赞
              </span>
            </div>
            <div className="flex gap-1.5 text-md">
              <Youtube />
              <span>
                {formatNumber({ num: stat.archive.view, toThousand: false })}{" "}
                总播放
              </span>
            </div>
          </div>
          <div className="px-6 py-6 bg-default-100 rounded-xl flex flex-col gap-2.5">
            <div className="flex gap-1.5 text-md">
              <ListVideo />
              <span>{overview.video} 个视频</span>
            </div>
            <div className="flex gap-1.5 text-md">
              <GalleryHorizontalEnd />
              <span>{overview.album} 个专辑</span>
            </div>
          </div>
        </div>
        <h1 className="text-lg font-semibold ">代表作</h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 bg-default-100 w-full py-4 rounded-xl px-6 gap-6  ">
          {master.length === 0 ? (
            <div className=" h-40">
              <h1>暂无代表作</h1>
            </div>
          ) : (
            master.slice(0, 2).map((item) => (
              <div key={item.bvid} className="flex flex-col gap-1.5 w-full">
                <Link
                  href={`/video/${item.bvid}`}
                  color="foreground"
                  className="font-medium text-lg"
                >
                  {item.title}
                </Link>
                <span className="line-clamp-6 min-h-[9rem] h-full ">
                  {item.desc}
                </span>
                <div className="flex gap-4 mt-4">
                  <div className="flex gap-1.5 items-center">
                    <CardIcon.Like className="w-5 h-5" />
                    <span>
                      {formatNumber({ num: item.stat.like, toThousand: false })}
                    </span>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <CardIcon.Coin className="w-5 h-5" />
                    <span>
                      {formatNumber({ num: item.stat.coin, toThousand: false })}
                    </span>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <CardIcon.View className="w-5 h-5" />
                    <span>
                      {formatNumber({ num: item.stat.view, toThousand: false })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
