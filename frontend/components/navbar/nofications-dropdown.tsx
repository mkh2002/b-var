import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  NavbarItem,
} from "@nextui-org/react";
import { NotificationIcon } from "../icons/navbar/notification-icon";

export const NotificationsDropdown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <NavbarItem>
          <NotificationIcon />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection>
          <DropdownItem>
            <Link className="flex flex-col gap-1.5" href="/about">
              <h1 className="text font-medium">{"🎉🎉🎉"} 天大的好消息</h1>
              <span className="text-tiny text-default-600">
                Catch0.01终于release啦！
              </span>
            </Link>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
