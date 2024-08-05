import React, { useContext } from "react";
import { Switch } from "@nextui-org/react";
import { ThemeContext } from "../ThemeProvider"; // Update with your file path
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <Switch
      defaultSelected={theme !== "dark"}
      size="lg"
      color="primary"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={toggleTheme}
    ></Switch>
  );
}
