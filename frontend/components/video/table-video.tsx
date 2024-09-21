import { VideoProps } from "@/config/type";
import {
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";

interface Props {
  data: {
    title: string;
    bvid: string;
    owner: string;
    tname: string;
    mid: number;
    view: number;
  }[];
}

export const TableVideo = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const rowPerPage = 5;
  const pages = Math.ceil(data.length / rowPerPage);

  const items = useMemo(() => {
    const stat = (page - 1) * rowPerPage;
    const end = stat + rowPerPage;

    return data.slice(stat, end);
  }, [page, data]);

  return (
    <Table
      aria-label="123"
      className="overflow-auto"
      shadow="none"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn key="title" className="w-96">
          标题
        </TableColumn>
        <TableColumn key="owner">up主</TableColumn>
        <TableColumn key="tname">tag</TableColumn>
        <TableColumn key="view">观看量</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.owner}>
            <TableCell className="w-96 max-w-96 overflow-hidden">
              <Link color="foreground" href={`/video/${item.bvid}`}>
                <div className="w-80 truncate">{item.title}</div>
              </Link>
            </TableCell>
            <TableCell className="w-44 max-w-44">
              <div className="truncate">
                <Link color="foreground" href={`/user/${item.mid}`}>
                  <div className="w-80 truncate">{item.owner}</div>
                </Link>
              </div>
            </TableCell>
            <TableCell className="text-nowrap w-40 max-w-40">
              {item.tname}
            </TableCell>
            <TableCell className="text-nowrap">
              {formatNumber(item.view)}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

function formatNumber(num: number): string {
  if (num < 10000) return num.toString();
  return (num / 10000).toFixed(1) + "万";
}
