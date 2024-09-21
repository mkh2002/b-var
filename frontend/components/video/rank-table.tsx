import { VideoProps } from "@/config/type";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import Link from "next/link";

interface RankTableProps {
  data: VideoProps[];
}

export const RankTable = ({ data }: RankTableProps) => {
  const [page, setPage] = useState(1);
  const rowPerPage = 10;
  const pages = Math.ceil(data.length / rowPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowPerPage;
    const end = start + rowPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return (
    <Table
      aria-label="data"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn key="title">视频</TableColumn>
        <TableColumn key="tname" className="w-44">
          标签
        </TableColumn>
        <TableColumn key="owner" className="w-44">
          所有者
        </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.title}>
            {(columnKey) => (
              <TableCell className="truncate max-w-96 first:w-96">
                {columnKey === "title" ? (
                  <Link href={`/video/${item.bvid}`} passHref>
                    <a className="text-blue-500 hover:underline">
                      {item.title}
                    </a>
                  </Link>
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
