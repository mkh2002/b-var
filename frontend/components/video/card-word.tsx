import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Props {
  cid: number;
  common_words?: {
    word: string;
    count: number;
  }[];
}

export const CardWord = ({ cid }: Props) => {
  const [assData, setAssData] = useState<Props | null>(null);
  const colors = [
    "text-primary-500/80",
    "text-warning-500/80",
    "text-danger-500/80",
    "text-success-500/80",
    "text-default-500/80",
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const fetchAssData = async () => {
      const res = await fetch(`http://localhost:80/api/backend/danmaku/${cid}`);
      const assData = await res.json();
      setAssData(assData);
    };
    fetchAssData();
  }, [cid]);

  if (!assData) {
    return <Spinner />;
  }

  const common_words = assData.common_words;
  return (
    <div className="flex flex-wrap gap-4 max-h-[80%]">
      {common_words?.map((item, index) => (
        <div
          key={index}
          className={`${getRandomColor()} rounded-full px-4 py-2`}
        >
          <p className="font-bold">{item.word}</p>
        </div>
      ))}
    </div>
  );
};
