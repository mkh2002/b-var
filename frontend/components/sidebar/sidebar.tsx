import { usePathname } from "next/navigation";
import { useSidebarContext } from "../layout/layout-context";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Button, Link } from "@nextui-org/react";
import { LogoContainer } from "./logo-container";
import { SidebarMenu } from "./sidebar-menu";
import { SidebarItem } from "./sidebar-item";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { VideoIcon } from "../icons/sidebar/video-icon";
import { UserIcon } from "../icons/sidebar/user-icon";
import { FollowingIcon } from "../icons/sidebar/following-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { DarkModeSwitcher } from "./darkmode-switcher";
import { HistoryIcon } from "../icons/sidebar/history-icon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-20 sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <LogoContainer />
        </div>
        <div className="flex h-full justify-between flex-col">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              href="/"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                title="Video"
                icon={<VideoIcon />}
                href="/video"
                isActive={pathname.startsWith("/video")}
              />
              <SidebarItem
                title="User"
                icon={<UserIcon />}
                href="/user"
                isActive={pathname.startsWith("/user")}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                title="Following"
                icon={<FollowingIcon />}
                href="/following"
                isActive={pathname.startsWith("/following")}
              />
              <SidebarItem
                title="About"
                icon={<HistoryIcon />}
                href="/about"
                isActive={pathname.startsWith("/about")}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <DarkModeSwitcher />
            <Button as={Link} href="/settings" isIconOnly variant="light">
              <SettingsIcon />
            </Button>
            <Avatar src="/profile.jpg" size="sm" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarWrapper;
