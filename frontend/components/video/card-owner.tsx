"use client";
import { Avatar, Button, Link } from "@nextui-org/react";
import useFollow from "@/hooks/useFollow";

interface Props {
  data: {
    owner: {
      mid: number;
      name: string;
      face: string;
    };
  };
}

export const CardOwner = ({ data }: Props) => {
  const { isFollowing, isLoading, handleFollow } = useFollow(data.owner.mid);

  return (
    <div className="flex items-center gap-2.5 w-full">
      <Link href={`/user/${data.owner.mid}`} color="foreground">
        <Avatar src={`/api/profile?imageUrl=${data.owner.face}`} size="lg" />
      </Link>
      <div className="flex flex-col gap-1.5">
        <Link href={`/user/${data.owner.mid}`} color="foreground">
          <span>{data.owner.name}</span>
        </Link>
        <span className="text-xs text-default-500">{data.owner.mid}</span>
      </div>
      <div className="ml-auto self-center">
        <Button
          onClick={handleFollow}
          color={isFollowing ? "default" : "primary"}
          disabled={isLoading}
        >
          {isFollowing ? "取消关注" : "关注"}
        </Button>
      </div>
    </div>
  );
};
