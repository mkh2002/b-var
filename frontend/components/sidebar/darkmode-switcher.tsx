import { Button } from "@nextui-org/react";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const MoonIcon = dynamic(() =>
  import("../icons/sidebar/moon-icon").then((mod) => mod.MoonIcon)
);
const SunIcon = dynamic(() =>
  import("../icons/sidebar/sun-icon").then((mod) => mod.SunIcon)
);

export const DarkModeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button isIconOnly onClick={toggleTheme} variant="light">
      {resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
