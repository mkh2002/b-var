import { Avatar, Input, Navbar, NavbarContent } from "@nextui-org/react";
import { BurguerButton } from "./burguer-button";
import { SearchIcon } from "../icons/search-icon";
import { NotificationsDropdown } from "./nofications-dropdown";
import { useRouter } from "next/navigation";
import React from "react";
import { Search } from "./serach";
interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const router = useRouter();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value;
      if (/^\d+$/.test(value)) {
        // 如果值全为数字，则认为是视频ID
        router.push(`/user/${value}`);
      } else {
        // 否则认为是用户ID
        router.push(`/video/${value}`);
      }
    }
  };
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full py-1"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Search onKeyDown={onKeyDown} />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <NotificationsDropdown />
          <NavbarContent>
            <Avatar src="/profile.jpg" />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
