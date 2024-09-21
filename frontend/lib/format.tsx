export const formatNumber = ({
  num,
  toThousand = true,
}: {
  num: number;
  toThousand?: boolean;
}) => {
  if (num < 1000) return num;
  else if (toThousand) return (num / 1000).toFixed(1) + "k";
  return (num / 10000).toFixed(1) + "w";
};

export const formatTime = (num: number) => {
  const h = Math.floor(num / 3600);
  const m = Math.floor((num % 3600) / 60);
  const s = num % 60;
  return `${h ? h + ":" : ""}${m}:${s < 10 ? "0" + s : s}`;
};

export const formatDate = (date: number, showTime: boolean = false) => {
  const d = new Date(date * 1000);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  if (showTime) {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return `${year}-${month}-${day}`;
};
