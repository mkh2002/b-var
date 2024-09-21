import { RankProps } from "../../hooks/useRank";
import { CardRank } from "./card-rank";

interface CardRankGroupProps {
  data: RankProps[];
}

export const CardRankGroup = ({ data }: CardRankGroupProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 justify-center w-full">
      {data.length > 0 &&
        data
          .slice(0, 3)
          .map((item, index) => (
            <CardRank
              {...item}
              key={item.mid}
              className="first:bg-primary first:text-white last:bg-success last:text-white"
              linkColor={index === 1 ? "text-foreground" : "text-white"}
            />
          ))}
    </div>
  );
};
