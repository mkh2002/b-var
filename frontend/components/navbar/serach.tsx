import { Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/search-icon";

interface Props {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Search = ({ onKeyDown }: Props) => {
  return (
    <Input
      startContent={<SearchIcon />}
      isClearable
      className="w-4/5 "
      classNames={{
        input: "w-full",
        mainWrapper: "w-full",
      }}
      placeholder="Search..."
      onKeyDown={onKeyDown}
    />
  );
};
