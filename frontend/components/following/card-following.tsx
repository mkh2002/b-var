"use client";

import { useMemo, useState, useEffect } from "react";
import useFollow from "@/hooks/useFollow";
import { formatNumber } from "@/lib/format";
import {
  Card,
  CardHeader,
  Avatar,
  CardBody,
  CardFooter,
  Button,
  Link,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { UsersRound, UserCheck } from "lucide-react";

interface Props {
  data: any;
}

export const CardFollowing = ({ data }: Props) => {
  const { isFollowing, handleFollow } = useFollow(data.mid);

  const [followed, setFollowed] = useState(isFollowing);
  const { onClose, onOpen, isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setFollowed(isFollowing);
  }, [isFollowing]);

  const cardContent = useMemo(() => {
    if (!followed) return null;

    return (
      <Card key={data.mid} shadow="sm">
        <CardHeader className="gap-2 items-start justify-start">
          <div>
            <Link href={"/user/" + data.mid}>
              <Avatar
                size="md"
                src={"/api/profile?imageUrl=" + data.face}
                isBordered
              />
            </Link>
          </div>
          <div className="flex gap-2 flex-col justify-center">
            <h1>{data.name}</h1>
            <span className="text-xs h-[2rem] text-default-600 line-clamp-2">
              {data.sign ? data.sign : "这个人很懒暂时没有签名"}
            </span>
          </div>
        </CardHeader>
        <CardBody>
          <div className="bg-default-50 p-6 rounded-xl flex flex-col gap-6">
            <div className="flex gap-2 text-medium">
              <UsersRound />
              <span>
                {formatNumber({
                  num: data.follower,
                  toThousand: false,
                })}{" "}
                位粉丝
              </span>
            </div>
            <div className="flex gap-2 text-medium">
              <UserCheck />
              <span>{data.following} 位关注</span>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            color="warning"
            variant="flat"
            className="capitalize w-full"
            onClick={onOpen}
          >
            取消关注
          </Button>
          <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="w-[24rem]">
              <div className="w-full py-10 flex gap-10 flex-col px-14 items-center justify-center">
                <h1 className="text-xl font-medium">确定要取消关注吗？</h1>
                <div className="flex gap-4">
                  <Button onClick={onClose}>取消</Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      handleFollow();
                      setFollowed(false);
                    }}
                  >
                    确定
                  </Button>
                </div>
              </div>
            </ModalContent>
          </Modal>
        </CardFooter>
      </Card>
    );
  }, [data, followed, handleFollow, onOpen, onClose, isOpen, onOpenChange]);

  return cardContent;
};
