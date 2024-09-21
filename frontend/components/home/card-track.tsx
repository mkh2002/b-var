import { Avatar, AvatarGroup, Card, CardBody } from "@nextui-org/react";

interface CardTrackProps {
  activeMid: number | null;
  track: {
    mid: number;
    face: string;
  }[];
  handleActiveClick: (mid: number) => void;
}

const CardTrack = ({ track, activeMid, handleActiveClick }: CardTrackProps) => {
  return (
    <Card className="bg-default-50 rounded-xl shadow-md px-4 py-6 w-full">
      <CardBody className="py-5 gap-6">
        <div className="flex justify-center gap-2.5">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {"⭐ 热门视频up主"}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <span className="text-xs">点击头像选择你需要追踪的up主</span>
          {track.length !== 0 ? (
            <AvatarGroup isBordered max={5}>
              {track.map((item) => (
                <Avatar
                  key={item.mid}
                  fallback
                  color={item.mid === activeMid ? "primary" : "default"}
                  classNames={{
                    base: item.mid === activeMid ? "scale-110" : "",
                  }}
                  onClick={() => handleActiveClick(item.mid)}
                  src={`/api/profile?imageUrl=${item.face}`}
                  isBordered
                />
              ))}
            </AvatarGroup>
          ) : (
            <span className="text-xs">oops! you have not followed anyone</span>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default CardTrack;
