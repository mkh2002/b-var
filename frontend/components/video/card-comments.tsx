import { useState } from "react";
import { Avatar, Pagination, Tooltip } from "@nextui-org/react";
import { CardIcon } from "../icons/card/card-icon";
import { formatNumber } from "@/lib/format";
import { CommentsProps } from "@/config/type";

interface Props {
  data: CommentsProps[];
}

export const CardComments = ({ data }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = data.slice(indexOfFirstComment, indexOfLastComment);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-semibold"></h2>
      {currentComments ? (
        currentComments.map((item, key) => (
          <div className="flex gap-2.5 w-full px-2.5 py-4" key={key}>
            <Avatar src={`/api/profile?imageUrl=${item.avatar}`} size="md" />
            <div className="flex max-w-[60%] flex-col gap-2">
              <p>{item.uname}</p>
              <div className="min-h-[3rem]">
                <Tooltip
                  content={item.content}
                  classNames={{
                    base: "px-6 py-4",
                    content: "max-w-[30rem] text-wrap px-6  line-clamp-2",
                  }}
                >
                  <p className=" line-clamp-2">{item.content}</p>
                </Tooltip>
              </div>
            </div>
            <div className="ml-auto flex text-sm gap-1.5 items-center">
              <CardIcon.Like className="w-5" />
              <span className="text-default-600">
                {formatNumber({ num: item.likes })} 赞
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>暂无评论</div>
      )}
      <div className="mx-auto my-3">
        <Pagination
          total={Math.ceil(data.length / commentsPerPage)}
          isCompact
          showControls
          showShadow
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
