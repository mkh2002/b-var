import { getFollowing } from "@/lib/fetch-data";
import { CardFollowing } from "./card-following";

const getData = async () => {
  const data = await getFollowing();
  return data;
};

export const Content = async () => {
  const data = await getData();
  return (
    <div className="grow h-full lg:px-6">
      <div className="flex xl:gap-6 pt-3 px-4 lg:px-0 sm:pt-10 max-w-[90rem] justify-center max-auto w-full h-full ">
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-xl font-semibold">关注列表</h1>
          <div className="grid  px-6 py-4  w-full lg:grid-cols-2 xl:grid-cols-3 gap-6 overflow-auto">
            {data.map((item: any) => {
              return <CardFollowing data={item} key={item.mid} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
